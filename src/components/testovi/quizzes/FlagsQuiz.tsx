import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Flag, Clock, Check, Crown, Sparkles } from "lucide-react";
import "flag-icons/css/flag-icons.min.css";
import { useQuizTimer } from "@/hooks/useQuizTimer";
import { QuizEndScreen } from "@/components/testovi/QuizEndScreen";
import { FlagKingModal } from "@/components/testovi/FlagKingModal";
import {
  COUNTRIES,
  getCountryName,
  type CountryData,
} from "@/data/countries";
import {
  FLAG_KING_THRESHOLD,
  getFlagProgress,
  getLocalFlagTotalCorrect,
  addLocalFlagCorrect,
} from "@/services/leaderboardService";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface FlagRound {
  target: CountryData;
  options: CountryData[];
}

function getRandomSubset(array: CountryData[], count: number, excludeCode?: string): CountryData[] {
  const filtered = excludeCode ? array.filter((c) => c.code !== excludeCode) : [...array];
  // Fisher-Yates shuffle
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  return filtered.slice(0, count);
}

function generateNewRound(usedCodes: Set<string>): FlagRound | null {
  const available = COUNTRIES.filter((c) => !usedCodes.has(c.code));
  if (available.length === 0) return null;

  const target = available[Math.floor(Math.random() * available.length)];
  const distractors = getRandomSubset(COUNTRIES, 3, target.code);
  const options = [target, ...distractors].sort(() => Math.random() - 0.5);

  return { target, options };
}

export function FlagsQuiz() {
  const { t, i18n } = useTranslation();
  const { user } = useAdminAuth();
  const activeLang = i18n.language || "bs";

  const [usedCodes, setUsedCodes] = useState<Set<string>>(() => new Set());
  const [currentRound, setCurrentRound] = useState<FlagRound | null>(() => {
    const initialUsed = new Set<string>();
    return generateNewRound(initialUsed);
  });

  const [correctCount, setCorrectCount] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [selectedOptionCode, setSelectedOptionCode] = useState<string | null>(null);
  const [isAnswerChecking, setIsAnswerChecking] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Flag King 2027 cumulative tracking
  const [cumulativeCorrect, setCumulativeCorrect] = useState<number>(() => getLocalFlagTotalCorrect());
  const [showKingModal, setShowKingModal] = useState<boolean>(false);
  const [kingTriggeredThisRound, setKingTriggeredThisRound] = useState<boolean>(false);

  useEffect(() => {
    // If logged in, read server flag_progress row
    if (user) {
      getFlagProgress().then((prog) => {
        if (prog && typeof prog.total_correct === "number") {
          setCumulativeCorrect(prog.total_correct);
        }
      });
    }
  }, [user]);

  const handleTimeUp = useCallback(() => {
    setIsFinished(true);
  }, []);

  const { secondsLeft, formattedTime, reset: resetTimer } = useQuizTimer({
    initialSeconds: 60,
    onTimeUp: handleTimeUp,
    autoStart: true,
  });

  // Check cumulative total on finish
  useEffect(() => {
    if (isFinished && correctCount > 0) {
      const updatedTotal = addLocalFlagCorrect(correctCount);
      setCumulativeCorrect(updatedTotal);
      if (updatedTotal >= FLAG_KING_THRESHOLD && !kingTriggeredThisRound) {
        setShowKingModal(true);
        setKingTriggeredThisRound(true);
      }
    }
  }, [isFinished, correctCount, kingTriggeredThisRound]);

  const handleRestart = () => {
    const newUsed = new Set<string>();
    setUsedCodes(newUsed);
    setCurrentRound(generateNewRound(newUsed));
    setCorrectCount(0);
    setTotalAnswered(0);
    setSelectedOptionCode(null);
    setIsAnswerChecking(false);
    setIsFinished(false);
    resetTimer(60);
  };

  const handleOptionSelect = (option: CountryData) => {
    if (isAnswerChecking || !currentRound) return;
    setIsAnswerChecking(true);
    setSelectedOptionCode(option.code);
    setTotalAnswered((prev) => prev + 1);

    const isCorrect = option.code === currentRound.target.code;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      const nextUsed = new Set(usedCodes);
      nextUsed.add(currentRound.target.code);
      setUsedCodes(nextUsed);

      const nextRound = generateNewRound(nextUsed);
      if (!nextRound) {
        // Pool exhausted
        setIsFinished(true);
      } else {
        setCurrentRound(nextRound);
        setSelectedOptionCode(null);
        setIsAnswerChecking(false);
      }
    }, 450);
  };

  if (isFinished) {
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    return (
      <>
        <QuizEndScreen
          quizId="flags"
          quizTitle="Guess the Flag (Zastave Svijeta)"
          score={correctCount}
          scoreDisplay={`${correctCount}`}
          durationSec={60}
          accuracyOrMetric={`${accuracy}% tačnost (${correctCount}/${totalAnswered})`}
          metrics={{
            speed: Math.min(100, correctCount * 5),
            accuracy,
            consistency: Math.min(100, correctCount * 4),
            logic: 90,
          }}
          onRestart={handleRestart}
        />

        {cumulativeCorrect >= FLAG_KING_THRESHOLD && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowKingModal(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#C9A84C] to-amber-500 px-6 py-3 font-black text-slate-950 shadow-[0_0_30px_rgba(201,168,76,0.4)] hover:brightness-110 transition-all"
            >
              <Crown className="h-5 w-5" />
              <span>👑 Pregledaj & Preuzmi FLAG KING 2027 Certifikat</span>
            </button>
          </div>
        )}

        <FlagKingModal
          open={showKingModal}
          onClose={() => setShowKingModal(false)}
          nickname={user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Poznavalac Zastava"}
          totalCorrect={cumulativeCorrect}
        />
      </>
    );
  }

  if (!currentRound) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0A1628]/90 p-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Clock className={`h-5 w-5 ${secondsLeft <= 10 ? "text-rose-400 animate-pulse" : "text-[#00C9A7]"}`} />
          <span className={`text-xl font-black font-mono ${secondsLeft <= 10 ? "text-rose-400" : "text-white"}`}>
            {formattedTime}
          </span>
        </div>

        {/* Flag King Progress Tracker */}
        <div
          onClick={() => cumulativeCorrect >= FLAG_KING_THRESHOLD && setShowKingModal(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#C9A84C]/15 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-bold cursor-pointer hover:bg-[#C9A84C]/25 transition-colors"
          title={`Kumulativno tačno: ${cumulativeCorrect}/${FLAG_KING_THRESHOLD}`}
        >
          <Crown className="h-3.5 w-3.5" />
          <span>Flag King: {cumulativeCorrect}/{FLAG_KING_THRESHOLD}</span>
        </div>

        {/* Current Round Score */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-bold">
          <Check className="h-4 w-4" />
          <span>{correctCount} {t("testovi.correct", "tačnih")}</span>
        </div>
      </div>

      {/* Main Flag Display Card */}
      <div className="rounded-3xl border border-slate-800 bg-[#0A1628]/90 p-6 sm:p-10 text-center shadow-2xl backdrop-blur-xl">
        <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block mb-6">
          {t("testovi.whichCountryFlag", "Koja je ovo država?")}
        </span>

        {/* Flag Render (Local SVG from flag-icons) */}
        <div className="my-6 flex justify-center items-center">
          <div className="relative overflow-hidden rounded-2xl border-4 border-slate-700/80 bg-slate-900 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            <span
              className={`fi fi-${currentRound.target.code} fis block transition-transform hover:scale-105`}
              style={{
                width: "200px",
                height: "135px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label="National Flag"
            />
          </div>
        </div>

        {/* 4 Answer Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          {currentRound.options.map((option) => {
            const isSelected = selectedOptionCode === option.code;
            const isTarget = option.code === currentRound.target.code;

            let btnStyle = "border-slate-800 bg-slate-900/80 text-white hover:bg-slate-800 hover:border-slate-700";
            if (isAnswerChecking) {
              if (isTarget) {
                btnStyle = "border-emerald-500 bg-emerald-950/70 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
              } else if (isSelected) {
                btnStyle = "border-rose-500 bg-rose-950/70 text-rose-300";
              }
            }

            return (
              <button
                key={option.code}
                type="button"
                onClick={() => handleOptionSelect(option)}
                disabled={isAnswerChecking}
                className={`min-h-[58px] p-4 rounded-2xl border font-bold text-sm sm:text-base text-left transition-all duration-150 flex items-center justify-between gap-2 break-words ${btnStyle}`}
              >
                <span className="min-w-0 break-words">
                  {getCountryName(option, activeLang)}
                </span>
                {isAnswerChecking && isTarget && (
                  <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
