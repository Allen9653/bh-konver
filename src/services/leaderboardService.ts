import { supabase } from "@/integrations/supabase/client";

export type ValidQuizId =
  | "math-logic"
  | "flags"
  | "lateral"
  | "fraud"
  | "pattern"
  | "script"
  | "idioms";

export interface QuizScoreRow {
  quiz_id: string;
  nickname: string;
  score: number;
  duration_sec: number;
  created_at: string;
}

export interface QuizHistoryRow {
  quiz_id: string;
  score: number;
  duration_sec: number;
  created_at: string;
}

export interface FlagProgressRow {
  total_correct: number;
  king_awarded_at: string | null;
}

export const VALID_QUIZ_IDS: ValidQuizId[] = [
  "math-logic",
  "flags",
  "lateral",
  "fraud",
  "pattern",
  "script",
  "idioms",
];

export const FLAG_KING_THRESHOLD = 50;
export const QUIZ_PROMO_CODE = ""; // Empty by default as required

/**
 * Public read of top scores for a specific quiz.
 * Strictly uses explicit column list: 'quiz_id, nickname, score, duration_sec, created_at'.
 * Never uses select('*') or user_id.
 */
export async function getLeaderboard(
  quizId: string,
  limit: number = 5
): Promise<{ data: QuizScoreRow[]; error: Error | null }> {
  try {
    const { data, error } = await (supabase
      .from("quiz_scores" as any)
      .select("quiz_id, nickname, score, duration_sec, created_at")
      .eq("quiz_id", quizId)
      .order("score", { ascending: false })
      .limit(limit) as any);

    if (error) {
      return { data: [], error: new Error(error.message) };
    }
    return { data: (data as QuizScoreRow[]) || [], error: null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err : new Error(String(err)) };
  }
}

/**
 * Computes user's rank on leaderboard:
 * Number of rows with a higher score for that quiz_id + 1.
 * Uses exact count query on score and quiz_id only.
 */
export async function getUserRank(
  quizId: string,
  userScore: number
): Promise<number | null> {
  try {
    const { count, error } = await (supabase
      .from("quiz_scores" as any)
      .select("score", { count: "exact", head: true })
      .eq("quiz_id", quizId)
      .gt("score", userScore) as any);

    if (error) {
      console.warn("Could not calculate user rank:", error.message);
      return null;
    }
    return (count ?? 0) + 1;
  } catch (err) {
    console.warn("User rank query exception:", err);
    return null;
  }
}

/**
 * Submits a quiz score to the leaderboard.
 * Calls RPC submit_quiz_score(p_quiz_id, p_nickname, p_score, p_duration).
 * Authenticated only.
 */
export async function submitQuizScore(
  quizId: string,
  nickname: string,
  score: number,
  durationSec: number
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const cleanNickname = nickname.trim().slice(0, 30);
    const { error } = await (supabase.rpc as any)("submit_quiz_score", {
      p_quiz_id: quizId,
      p_nickname: cleanNickname,
      p_score: Math.round(score),
      p_duration: Math.round(durationSec),
    });

    if (error) {
      return { success: false, error: new Error(error.message) };
    }
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

/**
 * Fetches current authenticated user's quiz history.
 * Calls RPC get_my_quiz_history(p_limit int).
 */
export async function getMyQuizHistory(
  limit: number = 10
): Promise<{ data: QuizHistoryRow[]; error: Error | null }> {
  try {
    const { data, error } = await (supabase.rpc as any)("get_my_quiz_history", {
      p_limit: limit,
    });

    if (error) {
      return { data: [], error: new Error(error.message) };
    }
    return { data: (data as QuizHistoryRow[]) || [], error: null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err : new Error(String(err)) };
  }
}

/**
 * Reads flag progress for the current user.
 * Explicitly reads only 'total_correct, king_awarded_at'.
 */
export async function getFlagProgress(): Promise<FlagProgressRow | null> {
  try {
    const { data, error } = await (supabase
      .from("flag_progress" as any)
      .select("total_correct, king_awarded_at")
      .maybeSingle() as any);

    if (error || !data) return null;
    return data as FlagProgressRow;
  } catch {
    return null;
  }
}

/**
 * Local storage helpers for guests and personal bests
 */
export function getLocalPersonalBest(quizId: string): number {
  try {
    const val = localStorage.getItem(`bh_pb_${quizId}`);
    return val ? Number(val) : 0;
  } catch {
    return 0;
  }
}

export function saveLocalPersonalBest(quizId: string, score: number): boolean {
  try {
    const currentPb = getLocalPersonalBest(quizId);
    if (score > currentPb) {
      localStorage.setItem(`bh_pb_${quizId}`, String(score));
      return true;
    }
  } catch {
    // Ignore storage errors
  }
  return false;
}

export function getLocalFlagTotalCorrect(): number {
  try {
    const val = localStorage.getItem("bh_flag_total_correct");
    return val ? Number(val) : 0;
  } catch {
    return 0;
  }
}

export function addLocalFlagCorrect(count: number): number {
  try {
    const current = getLocalFlagTotalCorrect();
    const updated = current + count;
    localStorage.setItem("bh_flag_total_correct", String(updated));
    return updated;
  } catch {
    return count;
  }
}

export function saveLocalGuestHistory(entry: QuizHistoryRow) {
  try {
    const raw = localStorage.getItem("bh_guest_quiz_history");
    const arr: QuizHistoryRow[] = raw ? JSON.parse(raw) : [];
    arr.unshift(entry);
    localStorage.setItem("bh_guest_quiz_history", JSON.stringify(arr.slice(0, 15)));
  } catch {
    // Ignore
  }
}

export function getLocalGuestHistory(): QuizHistoryRow[] {
  try {
    const raw = localStorage.getItem("bh_guest_quiz_history");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
