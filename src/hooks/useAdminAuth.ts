import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import {
  checkIsAdminEmail,
  getLocalUser,
  setLocalUser,
  globalSignOut,
} from "@/lib/authService";

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(() => getLocalUser());
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const initialUser = getLocalUser();
    return (
      checkIsAdminEmail(initialUser?.email) ||
      initialUser?.app_metadata?.role === "admin" ||
      initialUser?.user_metadata?.role === "admin"
    );
  });
  const [loading, setLoading] = useState(true);

  // Admin verification with resilient fallback
  const verifyAdminServerSide = useCallback(
    async (accessToken: string, currentUser?: User | null) => {
      if (currentUser) {
        if (checkIsAdminEmail(currentUser.email)) {
          return true;
        }

        if (
          currentUser.app_metadata?.role === "admin" ||
          currentUser.user_metadata?.role === "admin"
        ) {
          return true;
        }

        if (currentUser.id) {
          try {
            const { data: roleRow, error: roleError } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", currentUser.id)
              .eq("role", "admin")
              .maybeSingle();

            if (!roleError && roleRow?.role === "admin") {
              return true;
            }
          } catch {
            // Continue fallback
          }
        }
      }

      if (accessToken) {
        try {
          const res = await supabase.functions.invoke("verify-admin", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!res.error && res.data?.isAdmin === true) {
            return true;
          }
        } catch {
          // Edge function unreachable
        }
      }

      return false;
    },
    []
  );

  const syncUserState = useCallback(
    async (currentUser: User | null, currentSession?: Session | null) => {
      const effectiveUser = currentUser || getLocalUser();

      setUser((prevUser) => {
        if (
          prevUser?.id === effectiveUser?.id &&
          prevUser?.email === effectiveUser?.email
        ) {
          return prevUser;
        }
        return effectiveUser;
      });

      setSession((prevSession) => {
        if (prevSession?.access_token === currentSession?.access_token) {
          return prevSession;
        }
        return currentSession ?? null;
      });

      if (effectiveUser) {
        const isEmailAdmin = checkIsAdminEmail(effectiveUser.email);
        const isRoleAdmin =
          effectiveUser.app_metadata?.role === "admin" ||
          effectiveUser.user_metadata?.role === "admin";

        if (isEmailAdmin || isRoleAdmin) {
          setIsAdmin((prev) => (prev === true ? prev : true));
        } else if (currentSession?.access_token) {
          const serverAdmin = await verifyAdminServerSide(
            currentSession.access_token,
            effectiveUser
          );
          setIsAdmin((prev) => (prev === serverAdmin ? prev : serverAdmin));
        } else {
          setIsAdmin((prev) => (prev === false ? prev : false));
        }
      } else {
        setIsAdmin((prev) => (prev === false ? prev : false));
      }
      setLoading(false);
    },
    [verifyAdminServerSide]
  );

  useEffect(() => {
    let isMounted = true;

    // 1. Check existing session
    supabase.auth
      .getSession()
      .then(async ({ data: { session: currentSession } }) => {
        if (!isMounted) return;
        const sessionUser = currentSession?.user ?? null;
        await syncUserState(sessionUser, currentSession);
      })
      .catch(() => {
        if (!isMounted) return;
        // If Supabase getSession fails, fall back to stored user
        const local = getLocalUser();
        syncUserState(local, null);
      });

    // 2. Supabase auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted) return;
      const sessionUser = currentSession?.user ?? null;
      if (sessionUser) {
        setLocalUser(sessionUser);
      }
      await syncUserState(sessionUser, currentSession);
    });

    // 3. Custom event listener for instant local sync
    const handleAuthEvent = (e: Event) => {
      if (!isMounted) return;
      const customEvent = e as CustomEvent<User | null>;
      const newUser = customEvent.detail ?? getLocalUser();
      syncUserState(newUser, null);
    };

    window.addEventListener("bh-auth-change", handleAuthEvent);

    return () => {
      isMounted = false;
      subscription.unsubscribe();
      window.removeEventListener("bh-auth-change", handleAuthEvent);
    };
  }, [syncUserState]);

  const signOut = async () => {
    setLoading(true);
    await globalSignOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setLoading(false);
  };

  return {
    user,
    session,
    isAdmin,
    loading,
    signOut,
  };
};
