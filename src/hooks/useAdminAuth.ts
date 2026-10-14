import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Admin verification with resilient fallback
  const verifyAdminServerSide = useCallback(async (accessToken: string, currentUser?: User | null) => {
    // 1. Direct role verification via user_roles table or admin email
    if (currentUser) {
      const email = currentUser.email?.toLowerCase();
      if (email === 'alenjusufovic@yahoo.com' || email === 'alenj9653@gmail.com') {
        return true;
      }

      if (
        currentUser.app_metadata?.role === 'admin' ||
        currentUser.user_metadata?.role === 'admin'
      ) {
        return true;
      }

      if (currentUser.id) {
        try {
          const { data: roleRow, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentUser.id)
            .eq('role', 'admin')
            .maybeSingle();

          if (!roleError && roleRow?.role === 'admin') {
            return true;
          }
        } catch {
          // Continue to edge function
        }
      }
    }

    // 2. Fallback: try Edge function if deployed, ignoring connection failures silently
    if (accessToken) {
      try {
        const res = await supabase.functions.invoke('verify-admin', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.error && res.data?.isAdmin === true) {
          return true;
        }
      } catch {
        // Edge functions not deployed or network unreachable
      }
    }

    return false;
  }, []);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);
        
        // Admin verification
        if (currentSession?.access_token) {
          const adminStatus = await verifyAdminServerSide(currentSession.access_token, currentUser);
          setIsAdmin(adminStatus);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);
      
      if (currentSession?.access_token) {
        const adminStatus = await verifyAdminServerSide(currentSession.access_token, currentUser);
        setIsAdmin(adminStatus);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [verifyAdminServerSide]);

  const signOut = async () => {
    // Always clear local app state first so the UI never keeps showing a
    // signed-in interface, even if the network call fails.
    try {
      await supabase.auth.signOut({ scope: "global" });
    } catch (error) {
      console.error("Global sign out failed, falling back to local:", error);
      try {
        await supabase.auth.signOut({ scope: "local" });
      } catch (localError) {
        console.error("Local sign out failed:", localError);
      }
    } finally {
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      // Remove any lingering Supabase auth tokens from browser storage.
      try {
        Object.keys(localStorage)
          .filter((key) => key.startsWith("sb-") && key.includes("auth-token"))
          .forEach((key) => localStorage.removeItem(key));
      } catch (storageError) {
        console.error("Failed to clear auth storage:", storageError);
      }
    }
  };


  return {
    user,
    session,
    isAdmin,
    loading,
    signOut,
  };
};
