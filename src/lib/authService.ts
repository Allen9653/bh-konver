import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export const ADMIN_EMAILS = [
  "alenj9653@gmail.com",
  "alenjusufovic@yahoo.com",
];

const LOCAL_USER_KEY = "bh_konver_active_user";
const AUTH_EVENT = "bh-auth-change";

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  message?: string;
}

/**
 * Check if given email belongs to an administrator
 */
export function checkIsAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

/**
 * Retrieve local active user fallback if available
 */
export function getLocalUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

/**
 * Persist active user to local storage and broadcast event
 */
export function setLocalUser(user: User | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_USER_KEY);
    }
  } catch (err) {
    console.warn("Could not save user to storage:", err);
  }
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: user }));
}

/**
 * Build a structured Supabase-compatible User object
 */
export function createMockUser(email: string, fullName?: string, forceAdmin = false): User {
  const isAdmin = forceAdmin || checkIsAdminEmail(email);
  const cleanEmail = email.trim().toLowerCase();
  const name = fullName?.trim() || cleanEmail.split("@")[0];

  return {
    id: isAdmin ? "admin-" + btoa(cleanEmail).replace(/=/g, "") : "usr-" + Date.now().toString(36),
    email: cleanEmail,
    role: "authenticated",
    aud: "authenticated",
    created_at: new Date().toISOString(),
    app_metadata: {
      provider: "email",
      providers: ["email"],
      role: isAdmin ? "admin" : "user",
    },
    user_metadata: {
      name,
      full_name: name,
      role: isAdmin ? "admin" : "user",
    },
  } as unknown as User;
}

/**
 * Sign in with email and password with resilient fallback
 */
export async function signInWithCredentials(
  email: string,
  password: string
): Promise<AuthResponse> {
  const cleanEmail = email.trim().toLowerCase();

  if (!password || password.trim().length === 0) {
    return {
      success: false,
      error: "Molimo unesite lozinku.",
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("invalid login credentials") || msg.includes("invalid_grant")) {
        return {
          success: false,
          error: "Neispravan email ili lozinka.",
        };
      }
      if (msg.includes("email not confirmed")) {
        return {
          success: false,
          error: "Email adresa još nije potvrđena. Molimo provjerite vaš inbox.",
        };
      }
      return {
        success: false,
        error: error.message || "Neispravan email ili lozinka.",
      };
    }

    if (!data?.user) {
      return {
        success: false,
        error: "Korisnički podaci nisu pronađeni.",
      };
    }

    setLocalUser(data.user);
    return { success: true, user: data.user };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Greška pri povezivanju. Provjerite internet konekciju.",
    };
  }
}

/**
 * Sign up with email, password, and full name
 */
export async function signUpWithCredentials(
  email: string,
  password: string,
  fullName?: string
): Promise<AuthResponse> {
  const cleanEmail = email.trim().toLowerCase();

  if (!password || password.length < 6) {
    return {
      success: false,
      error: "Lozinka mora imati najmanje 6 znakova.",
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: fullName?.trim() || cleanEmail.split("@")[0],
          name: fullName?.trim() || cleanEmail.split("@")[0],
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message || "Greška pri kreiranju računa.",
      };
    }

    if (!data?.user) {
      return {
        success: false,
        error: "Kreiranje korisnika nije uspjelo.",
      };
    }

    setLocalUser(data.user);
    return {
      success: true,
      user: data.user,
      message: "Vaš račun je kreiran i aktiviran. Dobrodošli!",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Greška pri registraciji. Pokušajte ponovo.",
    };
  }
}

/**
 * Universal sign out
 */
export async function globalSignOut(): Promise<void> {
  try {
    await supabase.auth.signOut({ scope: "local" });
  } catch (e) {
    // Ignore sign out network failures
  }
  setLocalUser(null);
}
