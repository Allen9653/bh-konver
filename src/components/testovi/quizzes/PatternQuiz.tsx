import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Cpu, Check, X, ArrowRight, Lightbulb } from "lucide-react";
import { PATTERN_QUESTIONS } from "@/data/patternQuestions";
import { QuizEndScreen } from "@/components/testovi/QuizEndScreen";

export interface PatternQuizProps {
  onProgress?: (current: number, total: number | null) => void;
}

export function PatternQuiz({ onProgress }: PatternQuizProps = {}) {
  const { t, i18n } = useTranslation();
  const activeLang = (i18n.language || "bs") as "bs" | "bs-Cyrl" | "en" | "de" | "tr";

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [startTime] = useState<number>(() => Date.now());
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  useEffect(() => {
    onProgress?.(currentIndex + (showExplanation ? 1 : 0), PATTERN_QUESTIONS.length);
  }, [currentIndex, showExplanation, onProgress]);

  useEffect(() => {
    if (isFinished) {
      onProgress?.(PATTERN_QUESTIONS.length, PATTERN_QUESTIONS.length);
    }
  }, [isFinished, onProgress]);

  const currentPuzzle = PATTERN_QUESTIONS[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (showExplanation) return;
    setSelectedOptionId(optId);
    setShowExplanation(true);

    if (optId === currentPuzzle.correctOptionId) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < PATTERN_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setShowExplanation(false);
    } else {
      const dur = Math.round((Date.now() - startTime) / 1000);
      setTotalDuration(dur);
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const total = PATTERN_QUESTIONS.length;
    const percentage = Math.round((correctCount / total) * 100);

    return (
      <QuizEndScreen
        quizId="pattern"
        quizTitle="Pattern Recognition Gauntlet"
        score={percentage}
        scoreDisplay={`${percentage}%`}
        durationSec={totalDuration}
        accuracyOrMetric={`${correctCount} od ${total} riješenih obrazaca`}
        metrics={{
          speed: 88,
          accuracy: percentage,
          consistency: 90,
          logic: Math.min(100, percentage + 5),
        }}
        onRestart={handleRestart}
      />
    );
  }

  const promptText = currentPuzzle.prompt[activeLang] || currentPuzzle.prompt.bs;
  const expText = currentPuzzle.explanation[activeLang] || currentPuzzle.explanation.bs;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner with Honest Framing */}
      <div className="rounded-2xl border border-slate-800 bg-[#0A1628]/90 p-4 sm:p-5 flex items-center justify-between gap-4 backdrop-blur-md">
        <div>
          <span className="text-[11px] font-bold text-[#00C9A7] uppercase tracking-wider block">
            {t("testovi.patternEyebrow", "ANALIZA OBRAZACA")}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-white">
            Slomi šifru: niz zagonetki sve težih obrazaca.
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
          <span>{currentIndex + 1} / {PATTERN_QUESTIONS.length}</span>
        </div>
      </div>

      {/* Main Puzzle Card */}
      <div className="rounded-3xl border border-slate-800 bg-[#0A1628]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-center">
        <p className="text-base sm:text-lg font-bold text-white mb-6">
          {promptText}
        </p>

        {/* Sequence Display Tokens */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-6">
          {currentPuzzle.sequenceDisplay.map((token, i) => (
            <div
              key={i}
              className={`flex min-w-[50px] sm:min-w-[65px] h-14 sm:h-16 items-center justify-center rounded-2xl border px-3 text-lg sm:text-xl font-black font-mono shadow-md ${
                token === "?"
                  ? "border-[#00C9A7] bg-[#00C9A7]/15 text-[#00C9A7] animate-pulse"
                  : "border-slate-800 bg-slate-900/90 text-white"
              }`}
            >
              {token}
            </div>
          ))}
        </div>

        {/* 4 Multiple Choice Options */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mt-8">
          {currentPuzzle.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.id === currentPuzzle.correctOptionId;

            let btnStyle = "border-slate-800 bg-slate-900/80 text-white hover:bg-slate-800 hover:border-slate-700";
            if (showExplanation) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-950/70 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
              } else if (isSelected) {
                btnStyle = "border-rose-500 bg-rose-950/70 text-rose-300";
              } else {
                btnStyle = "opacity-50 border-slate-800 bg-slate-900/40 text-slate-400";
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                disabled={showExplanation}
                className={`p-4 rounded-2xl border font-black text-lg sm:text-xl font-mono transition-all duration-150 flex items-center justify-center gap-2 ${btnStyle}`}
              >
                <span>{opt.label}</span>
                {showExplanation && isCorrect && <Check className="h-5 w-5 text-emerald-400" />}
                {showExplanation && isSelected && !isCorrect && <X className="h-5 w-5 text-rose-400" />}
              </button>
            );
          })}
        </div>

        {/* Explanation Revelation Box */}
        {showExplanation && (
          <div className="mt-8 p-5 rounded-2xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-left animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-2 text-[#C9A84C] font-bold text-sm">
              <Lightbulb className="h-4 w-4" />
              <span>{t("testovi.explanationTitle", "Pravilo i obrazac:")}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {expText}
            </p>

            <button
              type="button"
              onClick={handleNext}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#00C9A7] hover:bg-[#00C9A7]/90 text-slate-950 font-bold px-5 py-2.5 text-xs sm:text-sm transition-colors"
            >
              <span>{currentIndex + 1 === PATTERN_QUESTIONS.length ? t("testovi.finishBtn", "Završi obrazac") : t("common.next", "Sljedeći obrazac")}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
