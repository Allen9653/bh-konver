import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HelpCircle, Check, X, ArrowRight, Lightbulb } from "lucide-react";
import { LATERAL_QUESTIONS } from "@/data/lateralQuestions";
import { QuizEndScreen } from "@/components/testovi/QuizEndScreen";

export function LateralQuiz() {
  const { t, i18n } = useTranslation();
  const activeLang = (i18n.language || "bs") as "bs" | "bs-Cyrl" | "en" | "de" | "tr";

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [scoreCount, setScoreCount] = useState<number>(0);
  const [startTime] = useState<number>(() => Date.now());
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const currentQ = LATERAL_QUESTIONS[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (showExplanation) return;
    setSelectedOptionId(optId);
    setShowExplanation(true);

    if (optId === currentQ.correctOptionId) {
      setScoreCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < LATERAL_QUESTIONS.length) {
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
    setScoreCount(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((scoreCount / LATERAL_QUESTIONS.length) * 100);
    return (
      <QuizEndScreen
        quizId="lateral"
        quizTitle="Lateral Thinking Challenge"
        score={percentage}
        scoreDisplay={`${percentage}%`}
        durationSec={totalDuration}
        accuracyOrMetric={`${scoreCount} od ${LATERAL_QUESTIONS.length} izbjegnutih zamki`}
        metrics={{
          speed: 85,
          accuracy: percentage,
          consistency: 90,
          logic: Math.min(100, percentage + 10),
        }}
        onRestart={handleRestart}
      />
    );
  }

  const qText = currentQ.question[activeLang] || currentQ.question.bs;
  const expText = currentQ.explanation[activeLang] || currentQ.explanation.bs;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner with Honest, Playful Copy */}
      <div className="rounded-2xl border border-slate-800 bg-[#0A1628]/90 p-4 sm:p-5 flex items-center justify-between gap-4 backdrop-blur-md">
        <div>
          <span className="text-[11px] font-bold text-[#00C9A7] uppercase tracking-wider block">
            {t("testovi.lateralEyebrow", "IZAZOV ZA UM")}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-white">
            5 zamki za logiku. Koliko ih možeš izbjeći?
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
          <span>{currentIndex + 1} / {LATERAL_QUESTIONS.length}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-slate-800 bg-[#0A1628]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start gap-3 mb-6">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00C9A7]/15 text-[#00C9A7]">
            <HelpCircle className="h-5 w-5" />
          </span>
          <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {qText}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mt-6">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.id === currentQ.correctOptionId;

            let btnStyle = "border-slate-800 bg-slate-900/70 text-slate-200 hover:bg-slate-800 hover:border-slate-700";
            if (showExplanation) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-950/70 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
              } else if (isSelected) {
                btnStyle = "border-rose-500 bg-rose-950/70 text-rose-300";
              } else {
                btnStyle = "opacity-50 border-slate-800 bg-slate-900/40 text-slate-400";
              }
            }

            const optText = opt.text[activeLang] || opt.text.bs;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                disabled={showExplanation}
                className={`w-full min-h-[52px] p-4 rounded-2xl border font-semibold text-sm sm:text-base text-left transition-all duration-150 flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <span className="min-w-0 break-words">{optText}</span>
                {showExplanation && isCorrect && (
                  <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                )}
                {showExplanation && isSelected && !isCorrect && (
                  <X className="h-5 w-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Revelation Box */}
        {showExplanation && (
          <div className="mt-6 p-5 rounded-2xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-left animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-2 text-[#C9A84C] font-bold text-sm">
              <Lightbulb className="h-4 w-4" />
              <span>{t("testovi.explanationTitle", "Objašnjenje zamke:")}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {expText}
            </p>

            <button
              type="button"
              onClick={handleNext}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#00C9A7] hover:bg-[#00C9A7]/90 text-slate-950 font-bold px-5 py-2.5 text-xs sm:text-sm transition-colors"
            >
              <span>{currentIndex + 1 === LATERAL_QUESTIONS.length ? t("testovi.finishBtn", "Završi izazov") : t("common.next", "Sljedeća zamka")}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
