import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Trophy,
  RotateCcw,
  Share2,
  Download,
  Copy,
  Check,
  Crown,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  Zap,
  Lock,
  Medal,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useSubscription } from "@/hooks/useSubscription";
import {
  submitQuizScore,
  getUserRank,
  saveLocalPersonalBest,
  getLocalPersonalBest,
  getMyQuizHistory,
  saveLocalGuestHistory,
  getLocalGuestHistory,
  QUIZ_PROMO_CODE,
  type QuizHistoryRow,
} from "@/services/leaderboardService";
import {
  generateShareText,
  generateQuizInfographic,
  shareQuizResult,
  downloadDataUrl,
} from "@/utils/quizCanvas";

export interface QuizEndScreenProps {
  quizId: string;
  quizTitle: string;
  score: number;
  scoreDisplay: string;
  durationSec: number;
  accuracyOrMetric?: string;
  metrics?: {
    speed?: number; // 0-100
    accuracy?: number; // 0-100
    consistency?: number; // 0-100
    logic?: number; // 0-100
  };
  onRestart: () => void;
}

export function QuizEndScreen({
  quizId,
  quizTitle,
  score,
  scoreDisplay,
  durationSec,
  accuracyOrMetric,
  metrics,
  onRestart,
}: QuizEndScreenProps) {
  const { t } = useTranslation();
  const { user, isAdmin } = useAdminAuth();
  const { hasActiveSubscription } = useSubscription(user?.id);
  const isPremiumUser = Boolean(user && (isAdmin || hasActiveSubscription));

  const [personalBest, setPersonalBest] = useState<number>(() => getLocalPersonalBest(quizId));
  const [isNewPb, setIsNewPb] = useState<boolean>(false);
  const [userRank, setUserRank] = useState<number | null>(null);

  // Nickname & Leaderboard submission
  const [nickname, setNickname] = useState<string>(() => {
    return user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";
  });
  const [isSubmittingScore, setIsSubmittingScore] = useState<boolean>(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sharing states
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [isGeneratingPng, setIsGeneratingPng] = useState<boolean>(false);

  // History for Analytics Report
  const [historyList, setHistoryList] = useState<QuizHistoryRow[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check and save personal best
    const wasPb = saveLocalPersonalBest(quizId, score);
    if (wasPb) {
      setIsNewPb(true);
      setPersonalBest(score);
    } else {
      setPersonalBest(getLocalPersonalBest(quizId));
    }

    // Save locally for guest history
    const entry: QuizHistoryRow = {
      quiz_id: quizId,
      score,
      duration_sec: durationSec,
      created_at: new Date().toISOString(),
    };
    saveLocalGuestHistory(entry);

    // 2. Compute rank if possible
    getUserRank(quizId, score).then((r) => {
      if (r !== null) setUserRank(r);
    });

    // 3. Load user history for analytics
    if (user) {
      setLoadingHistory(true);
      getMyQuizHistory(6).then(({ data }) => {
        if (data && data.length > 0) {
          setHistoryList(data);
        } else {
          setHistoryList(getLocalGuestHistory());
        }
        setLoadingHistory(false);
      });
    } else {
      setHistoryList(getLocalGuestHistory());
    }
  }, [quizId, score, durationSec, user]);

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    setIsSubmittingScore(true);
    setSubmitError(null);

    const { success, error } = await submitQuizScore(quizId, nickname, score, durationSec);
    setIsSubmittingScore(false);

    if (success) {
      setHasSubmittedScore(true);
      // Re-fetch rank with newly submitted score
      const r = await getUserRank(quizId, score);
      if (r !== null) setUserRank(r);
    } else {
      setSubmitError(error?.message || "Greška pri upisu rezultata. Pokušajte ponovo.");
    }
  };

  const handleShareClick = async () => {
    const text = generateShareText(quizId, quizTitle, scoreDisplay);
    const res = await shareQuizResult(text, quizTitle, `https://www.bh-konver.com/testovi/${quizId}`);
    if (res === "copied" || res === "shared") {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const handleDownloadInfographic = async () => {
    setIsGeneratingPng(true);
    try {
      const dataUrl = await generateQuizInfographic({
        quizTitle,
        scoreText: scoreDisplay,
        accuracyOrWpm: accuracyOrMetric,
        nickname: nickname || undefined,
        rank: userRank,
      });
      downloadDataUrl(dataUrl, `bh-konver-${quizId}-score.png`);
    } catch (err) {
      console.error("Failed to generate infographic:", err);
    } finally {
      setIsGeneratingPng(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Hero Result Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-[#C9A84C]/40 bg-gradient-to-b from-[#0A1628] via-[#0d1d33] to-[#0A1628] p-6 sm:p-10 text-center shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#00C9A7]/15 via-transparent to-transparent pointer-events-none" />

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-bold uppercase tracking-wider mb-4">
          <Trophy className="h-3.5 w-3.5" />
          {t("testovi.completedBadge", "Test Završen")}
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {quizTitle}
        </h2>

        {/* Score Ring */}
        <div className="my-8 flex flex-col items-center justify-center">
          <div className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full border-4 border-[#00C9A7] bg-[#0A1628]/90 shadow-[0_0_40px_rgba(0,201,167,0.3)]">
            <div className="text-center px-2">
              <span className="block text-4xl sm:text-5xl font-black text-white tracking-tight">
                {scoreDisplay}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#00C9A7] font-semibold">
                {accuracyOrMetric || t("testovi.finalScore", "Rezultat")}
              </span>
            </div>
            {isNewPb && (
              <span className="absolute -top-3 rounded-full bg-[#C9A84C] px-3 py-0.5 text-[11px] font-black text-slate-950 uppercase shadow-md flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> NOVI PB!
              </span>
            )}
          </div>
        </div>

        {/* Key stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
          <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs text-muted-foreground block">{t("testovi.timeSpent", "Vrijeme")}</span>
            <span className="text-base sm:text-lg font-bold text-white">{durationSec}s</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs text-muted-foreground block">{t("testovi.personalBest", "Lični rekord")}</span>
            <span className="text-base sm:text-lg font-bold text-[#C9A84C]">{personalBest}</span>
          </div>
          <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs text-muted-foreground block">{t("testovi.rankEstimate", "Pozicija na tabeli")}</span>
            <span className="text-base sm:text-lg font-bold text-[#00C9A7] flex items-center gap-1">
              <Medal className="h-4 w-4" />
              {userRank ? `#${userRank}` : "—"}
            </span>
          </div>
        </div>

        {/* Action Buttons: Try Again & Hub */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#00C9A7] hover:bg-[#00C9A7]/90 text-slate-950 font-bold px-6 py-3 transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,201,167,0.3)]"
          >
            <RotateCcw className="h-4 w-4" /> {t("testovi.tryAgain", "Pokušaj ponovo")}
          </button>
          <Link
            to="/testovi"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold px-5 py-3 transition-colors"
          >
            {t("testovi.allTests", "Svi testovi")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Leaderboard Submission Card */}
      <div className="rounded-2xl border border-slate-800 bg-[#0A1628]/80 p-6 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
          <Medal className="h-5 w-5 text-[#C9A84C]" />
          {t("testovi.leaderboardSectionTitle", "Zapiši rezultat na rang listu")}
        </h3>

        {user ? (
          hasSubmittedScore ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
              <Check className="h-5 w-5 shrink-0 text-emerald-400" />
              <span>
                {t("testovi.submittedSuccess", "Rezultat je uspješno upisan na rang listu!")}
                {userRank && ` Vaš trenutni rang: #${userRank}`}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmitScore} className="space-y-3">
              <p className="text-xs text-muted-foreground">
                {t("testovi.submitDesc", "Unesite nadimak pod kojim želite da se vaš rezultat prikaže na javnoj tabeli.")}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Vaš nadimak..."
                  maxLength={30}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#00C9A7] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmittingScore || !nickname.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-slate-950 font-bold px-5 py-2.5 transition-colors disabled:opacity-50"
                >
                  {isSubmittingScore ? t("testovi.submitting", "Upisujem...") : t("testovi.submitBtn", "Upiši na tabelu")}
                </button>
              </div>
              {submitError && (
                <p className="text-xs text-rose-400">{submitError}</p>
              )}
            </form>
          )
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-white">
                {t("testovi.guestPromptTitle", "Prijavi se da upišeš rezultat")}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("testovi.guestPromptDesc", "Besplatna registracija omogućava čuvanje historije rezultata i borbu za vrh rang liste.")}
              </p>
            </div>
            <Link
              to="/auth"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#00C9A7] px-4 py-2 text-xs font-bold text-slate-950 hover:bg-[#00C9A7]/90 transition-colors"
            >
              {t("testovi.loginPromptBtn", "Prijavi se / Registruj")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Social Share Section */}
      <div className="rounded-2xl border border-slate-800 bg-[#0A1628]/80 p-6 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
          <Share2 className="h-5 w-5 text-[#00C9A7]" />
          {t("testovi.shareTitle", "Podijeli svoj rezultat")}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {t("testovi.shareDesc", "Izazovite prijatelje ili preuzmite personalizovani 1080×1080 PNG infografik za društvene mreže.")}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleShareClick}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-2.5 text-xs sm:text-sm transition-colors border border-slate-700"
          >
            {copySuccess ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">{t("testovi.copied", "Kopirano u međuspremnik!")}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{t("testovi.copyShareText", "Kopiraj tekst / Podijeli")}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadInfographic}
            disabled={isGeneratingPng}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C9A84C]/15 hover:bg-[#C9A84C]/25 text-[#C9A84C] font-semibold px-4 py-2.5 text-xs sm:text-sm transition-colors border border-[#C9A84C]/40"
          >
            <Download className="h-4 w-4" />
            <span>{isGeneratingPng ? t("testovi.generating", "Generišem...") : t("testovi.downloadInfographic", "Preuzmi 1080×1080 PNG")}</span>
          </button>
        </div>
      </div>

      {/* Performance Analytics Report Card (Soft Premium Gateway) */}
      <div className="relative overflow-hidden rounded-2xl border border-[#00C9A7]/30 bg-[#0A1628] p-6 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00C9A7]/15 text-[#00C9A7]">
              <Activity className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {t("testovi.analyticsTitle", "Performance Analytics Report")}
                {isPremiumUser && (
                  <span className="rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 px-2 py-0.5 text-[10px] font-bold text-[#C9A84C]">
                    PRO ACTIVE
                  </span>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t("testovi.analyticsSubtitle", "Kognitivni profil brzine, preciznosti i kontinuiteta")}
              </p>
            </div>
          </div>
          {!isPremiumUser && (
            <span className="rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> PRO
            </span>
          )}
        </div>

        {/* Analytics Body with blur overlay if non-premium */}
        <div className="relative">
          <div className={`space-y-6 ${!isPremiumUser ? "filter blur-sm select-none pointer-events-none opacity-50" : ""}`}>
            {/* 4 Dimension Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-amber-400" /> Brzina (Speed)
                </span>
                <span className="text-lg font-black text-white mt-1 block">
                  {metrics?.speed ?? Math.min(100, Math.round((60 / Math.max(1, durationSec)) * 90))}%
                </span>
                <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${metrics?.speed ?? 85}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> Preciznost (Accuracy)
                </span>
                <span className="text-lg font-black text-white mt-1 block">
                  {metrics?.accuracy ?? (score > 80 ? 94 : score > 50 ? 82 : 68)}%
                </span>
                <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${metrics?.accuracy ?? 88}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-cyan-400" /> Kontinuitet (Streak)
                </span>
                <span className="text-lg font-black text-white mt-1 block">
                  {metrics?.consistency ?? 84}%
                </span>
                <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${metrics?.consistency ?? 84}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-[#C9A84C]" /> Logika (Logic)
                </span>
                <span className="text-lg font-black text-white mt-1 block">
                  {metrics?.logic ?? 91}%
                </span>
                <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-[#C9A84C] rounded-full"
                    style={{ width: `${metrics?.logic ?? 91}%` }}
                  />
                </div>
              </div>
            </div>

            {/* History Table / Chart */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                {t("testovi.recentHistory", "Historija posljednjih rješavanja (RPC)")}
              </h4>
              {loadingHistory ? (
                <p className="text-xs text-muted-foreground">Učitavanje historije...</p>
              ) : historyList.length === 0 ? (
                <p className="text-xs text-muted-foreground">Nema prethodnih rezultata.</p>
              ) : (
                <div className="space-y-2">
                  {historyList.slice(0, 5).map((row, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-slate-900/50 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">#{idx + 1}</span>
                        <span className="font-semibold text-white uppercase">{row.quiz_id}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#00C9A7] font-bold">{row.score} pts</span>
                        <span className="text-muted-foreground">{row.duration_sec}s</span>
                        <span className="text-muted-foreground hidden sm:inline">
                          {new Date(row.created_at).toLocaleDateString("bs-BA")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Premium Callout Overlay for non-premium */}
          {!isPremiumUser && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0A1628]/60 backdrop-blur-[2px]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] mb-3 shadow-lg">
                <Crown className="h-6 w-6" />
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {t("testovi.unlockAnalyticsTitle", "Otključaj puni Performance Analytics izvještaj")}
              </h4>
              <p className="text-xs text-slate-300 max-w-md mt-1 mb-4">
                {t("testovi.unlockAnalyticsDesc", "Pratite detaljne metrike kognitivne brzine, tačnosti, historiju rješavanja i preuzmite zvanične certifikate uz Premium.")}
              </p>
              {QUIZ_PROMO_CODE && (
                <span className="text-[11px] text-[#00C9A7] font-mono mb-2">
                  Promo kod: {QUIZ_PROMO_CODE}
                </span>
              )}
              <Link
                to="/#pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00a88a] px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,201,167,0.3)]"
              >
                <Crown className="h-4 w-4" /> {t("testovi.upgradeToPro", "Aktiviraj Premium pristup")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
