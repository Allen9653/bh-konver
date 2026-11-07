import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trophy, Clock, RefreshCw, ArrowRight, UserCheck, Sparkles, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  getLeaderboard,
  VALID_QUIZ_IDS,
  type ValidQuizId,
  type QuizScoreRow,
} from "@/services/leaderboardService";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLanguage } from "@/hooks/useLanguage";

const QUIZ_NAMES: Record<ValidQuizId, string> = {
  "math-logic": "Math & Logic",
  flags: "Flags of the World",
  lateral: "Lateral Riddles",
  fraud: "Spot the Fraud",
  pattern: "Pattern Gauntlet",
  script: "Script Typing",
  idioms: "Idioms Quiz",
};

export type LeaderboardQuizFilter = ValidQuizId | "all";

export function LiveLeaderboard({
  initialQuizId = "all",
  onScoreSubmittedSignal,
}: {
  initialQuizId?: LeaderboardQuizFilter;
  onScoreSubmittedSignal?: number;
}) {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const { user } = useAdminAuth();
  const [selectedQuiz, setSelectedQuiz] = useState<LeaderboardQuizFilter>(initialQuizId);
  const [scores, setScores] = useState<QuizScoreRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchScores = useCallback(async (quizFilter: LeaderboardQuizFilter, showSpin = false) => {
    if (showSpin) setIsRefreshing(true);
    const limit = quizFilter === "all" ? 10 : 5;
    const { data } = await getLeaderboard(quizFilter, limit);
    setScores(data);
    setLoading(false);
    setLastUpdated(new Date());
    if (showSpin) {
      setTimeout(() => setIsRefreshing(false), 350);
    }
  }, []);

  // Initial fetch and automatic real-time listener + polling interval
  useEffect(() => {
    fetchScores(selectedQuiz, true);

    // Supabase real-time channel subscription for instant live updates
    const channel = supabase
      .channel("quiz_scores_live_feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "quiz_scores" },
        () => {
          fetchScores(selectedQuiz, false);
        }
      )
      .subscribe();

    // Secondary auto-poll every 15 seconds to guarantee fresh data
    const interval = setInterval(() => {
      fetchScores(selectedQuiz, false);
    }, 15000);

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [selectedQuiz, fetchScores, onScoreSubmittedSignal]);

  const getQuizLabel = (qid: ValidQuizId) => {
    const translationKeyMap: Record<ValidQuizId, string> = {
      "math-logic": "mathLogic",
      flags: "flags",
      lateral: "lateral",
      fraud: "fraud",
      pattern: "pattern",
      script: "script",
      idioms: "idioms",
    };
    const key = translationKeyMap[qid];
    return t(`testovi.quizzes.${key}.title`, QUIZ_NAMES[qid]);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0A1628]/95 p-5 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] shadow-[0_0_15px_rgba(201,168,76,0.2)]">
            <Trophy className="h-6 w-6" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {t("testovi.topScorersTitle", "Top Scorers Rang Lista")}
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t("testovi.liveBadge", "Uživo ažuriranje")}</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("testovi.leaderboardSubtitle", "Ažurira se automatski u realnom vremenu uz svaki novi rezultat")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => fetchScores(selectedQuiz, true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800/90 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            title="Osvježi rang listu odmah"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-[#00C9A7]" : ""}`} />
            <span>{t("common.refresh", "Osvježi")}</span>
          </button>
        </div>
      </div>

      {/* Quiz Filter Tabs: "all" + 7 specific quizzes */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 scrollbar-thin">
        <button
          type="button"
          onClick={() => setSelectedQuiz("all")}
          className={`shrink-0 flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
            selectedQuiz === "all"
              ? "bg-gradient-to-r from-[#C9A84C] to-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(201,168,76,0.35)]"
              : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
          }`}
        >
          <Crown className="h-3.5 w-3.5" />
          <span>{t("testovi.allQuizzesTab", "Sveukupno (Top)")}</span>
        </button>

        {VALID_QUIZ_IDS.map((qid) => {
          const isSelected = selectedQuiz === qid;
          return (
            <button
              key={qid}
              type="button"
              onClick={() => setSelectedQuiz(qid)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                isSelected
                  ? "bg-[#00C9A7] text-slate-950 shadow-[0_0_15px_rgba(0,201,167,0.35)]"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {getQuizLabel(qid)}
            </button>
          );
        })}
      </div>

      {/* Table Content */}
      <div className="space-y-2.5">
        {loading ? (
          <div className="py-12 text-center text-xs text-muted-foreground animate-pulse">
            {t("testovi.loadingLeaderboard", "Učitavam zvaničnu rang listu...")}
          </div>
        ) : scores.length === 0 ? (
          <div className="py-10 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
            <Trophy className="h-9 w-9 text-slate-600 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-slate-300">
              {t("testovi.noScoresYet", "Još nema upisanih rezultata za ovaj test")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t("testovi.beFirst", "Budi prvi koji će osvojiti vodeću poziciju!")}
            </p>
          </div>
        ) : (
          scores.map((row, idx) => {
            const rank = idx + 1;
            const isTop1 = rank === 1;
            const isTop2 = rank === 2;
            const isTop3 = rank === 3;
            const quizTitle = QUIZ_NAMES[row.quiz_id as ValidQuizId] || row.quiz_id;

            return (
              <div
                key={`${row.quiz_id}-${row.nickname}-${idx}-${row.score}`}
                className={`flex items-center justify-between p-3 sm:p-4 rounded-2xl border transition-all duration-200 ${
                  isTop1
                    ? "bg-[#C9A84C]/10 border-[#C9A84C]/50 shadow-[0_4px_20px_rgba(201,168,76,0.12)] hover:border-[#C9A84C]"
                    : isTop2
                    ? "bg-slate-300/5 border-slate-400/30 hover:border-slate-400/60"
                    : isTop3
                    ? "bg-amber-700/10 border-amber-600/30 hover:border-amber-600/60"
                    : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-black text-xs ${
                      isTop1
                        ? "bg-[#C9A84C] text-slate-950 shadow-[0_0_12px_rgba(201,168,76,0.5)]"
                        : isTop2
                        ? "bg-slate-300 text-slate-950 shadow-sm"
                        : isTop3
                        ? "bg-amber-600 text-white shadow-sm"
                        : "bg-slate-800/90 text-slate-400"
                    }`}
                  >
                    {isTop1 ? <Crown className="h-4 w-4" /> : `#${rank}`}
                  </span>

                  <div className="min-w-0 truncate">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-white text-sm sm:text-base truncate block">
                        {row.nickname}
                      </span>
                      {selectedQuiz === "all" && (
                        <span className="shrink-0 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300">
                          {quizTitle}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <Clock className="h-3 w-3" />
                      <span>{row.duration_sec}s</span>
                      {row.created_at && (
                        <> · <span>{new Date(row.created_at).toLocaleDateString(language === "en" ? "en-US" : "bs-BA")}</span></>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="text-lg sm:text-xl font-black text-[#00C9A7]">
                    {row.score}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">pts</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Guest registration prompt */}
      {!user && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0A1628] to-slate-900 border border-slate-800">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <UserCheck className="h-4 w-4 text-[#00C9A7] shrink-0 hidden sm:block" />
            <p className="text-xs text-slate-300">
              {t("testovi.guestLeaderboardBanner", "Prijavite se besplatno kako bi se vaši rezultati automatski bilježili na rang listi.")}
            </p>
          </div>
          <Link
            to="/auth"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-slate-950 font-bold px-4 py-2 text-xs transition-colors"
          >
            {t("testovi.freeRegister", "Besplatna prijava")} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
