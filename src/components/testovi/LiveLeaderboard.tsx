import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trophy, Medal, Clock, RefreshCw, ArrowRight, UserCheck } from "lucide-react";
import {
  getLeaderboard,
  VALID_QUIZ_IDS,
  type ValidQuizId,
  type QuizScoreRow,
} from "@/services/leaderboardService";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const QUIZ_NAMES: Record<ValidQuizId, string> = {
  "math-logic": "Math & Logic",
  flags: "Flags of the World",
  lateral: "Lateral Riddles",
  fraud: "Spot the Fraud",
  pattern: "Pattern Gauntlet",
  script: "Script Typing",
  idioms: "Idioms Quiz",
};

export function LiveLeaderboard({
  initialQuizId = "math-logic",
  onScoreSubmittedSignal,
}: {
  initialQuizId?: ValidQuizId;
  onScoreSubmittedSignal?: number;
}) {
  const { t } = useTranslation();
  const { user } = useAdminAuth();
  const [selectedQuiz, setSelectedQuiz] = useState<ValidQuizId>(initialQuizId);
  const [scores, setScores] = useState<QuizScoreRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchScores = useCallback(async (quizId: ValidQuizId, showSpin = false) => {
    if (showSpin) setIsRefreshing(true);
    const { data } = await getLeaderboard(quizId, 5);
    setScores(data);
    setLoading(false);
    if (showSpin) {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  }, []);

  useEffect(() => {
    fetchScores(selectedQuiz, true);

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchScores(selectedQuiz, false);
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedQuiz, fetchScores, onScoreSubmittedSignal]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0A1628]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C]">
            <Trophy className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {t("testovi.leaderboardTitle", "Zvanična Rang Lista (Top 5)")}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t("testovi.leaderboardSubtitle", "Ažurira se automatski svakih 30 sekundi")}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchScores(selectedQuiz, true)}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          title="Osvježi rang listu"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-[#00C9A7]" : ""}`} />
          <span>{t("common.refresh", "Osvježi")}</span>
        </button>
      </div>

      {/* Quiz Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-thin">
        {VALID_QUIZ_IDS.map((qid) => {
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
          const label = t(`testovi.quizzes.${key}.title`, QUIZ_NAMES[qid]);

          return (
            <button
              key={qid}
              type="button"
              onClick={() => setSelectedQuiz(qid)}
              className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedQuiz === qid
                  ? "bg-[#00C9A7] text-slate-950 shadow-[0_0_15px_rgba(0,201,167,0.3)]"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Table Content */}
      <div className="space-y-2">
        {loading ? (
          <div className="py-8 text-center text-xs text-muted-foreground animate-pulse">
            {t("testovi.loadingLeaderboard", "Učitavam rang listu...")}
          </div>
        ) : scores.length === 0 ? (
          <div className="py-8 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
            <Trophy className="h-8 w-8 text-slate-600 mx-auto mb-2 opacity-50" />
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

            return (
              <div
                key={`${row.quiz_id}-${row.nickname}-${idx}`}
                className={`flex items-center justify-between p-3 sm:p-4 rounded-2xl border transition-colors ${
                  isTop1
                    ? "bg-[#C9A84C]/10 border-[#C9A84C]/40 shadow-sm"
                    : isTop2
                    ? "bg-slate-300/5 border-slate-400/20"
                    : isTop3
                    ? "bg-amber-700/10 border-amber-600/20"
                    : "bg-slate-900/50 border-slate-800/80"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-black text-xs ${
                      isTop1
                        ? "bg-[#C9A84C] text-slate-950 shadow-[0_0_12px_rgba(201,168,76,0.5)]"
                        : isTop2
                        ? "bg-slate-300 text-slate-950"
                        : isTop3
                        ? "bg-amber-600 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {rank}
                  </span>

                  <div className="min-w-0 truncate">
                    <span className="font-bold text-white text-sm sm:text-base truncate block">
                      {row.nickname}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {row.duration_sec}s
                      {row.created_at && (
                        <> · {new Date(row.created_at).toLocaleDateString("bs-BA")}</>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
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
