import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Languages, Check, X, ArrowRight, Quote } from "lucide-react";
import { IDIOMS_DATA, type IdiomItem } from "@/data/idioms";
import { QuizEndScreen } from "@/components/testovi/QuizEndScreen";

export interface IdiomsQuizProps {
  onProgress?: (current: number, total: number | null) => void;
}

export function IdiomsQuiz({ onProgress }: IdiomsQuizProps = {}) {
  const { t, i18n } = useTranslation();
  const activeLang = (i18n.language || "bs") as "bs" | "bs-Cyrl" | "en" | "de" | "tr";

  // Pick 10 random idioms per session
  const sessionIdioms = useMemo(() => {
    return [...IDIOMS_DATA].sort(() => Math.random() - 0.5).slice(0, 10);
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [startTime] = useState<number>(() => Date.now());
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  useEffect(() => {
    onProgress?.(currentIndex + (showExplanation ? 1 : 0), sessionIdioms.length);
  }, [currentIndex, showExplanation, sessionIdioms.length, onProgress]);

  useEffect(() => {
    if (isFinished) {
      onProgress?.(sessionIdioms.length, sessionIdioms.length);
    }
  }, [isFinished, sessionIdioms.length, onProgress]);

  const currentIdiom = sessionIdioms[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (showExplanation) return;
    setSelectedOptionId(optId);
    setShowExplanation(true);

    if (optId === currentIdiom.correctOptionId) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < sessionIdioms.length) {
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
    const total = sessionIdioms.length;
    const percentage = Math.round((correctCount / total) * 100);

    return (
      <QuizEndScreen
        quizId="idioms"
        quizTitle="Lost in Translation (Kviz Idioma)"
        score={percentage}
        scoreDisplay={`${percentage}%`}
        durationSec={totalDuration}
        accuracyOrMetric={`${correctCount} od ${total} tačno protumačenih idioma`}
        metrics={{
          speed: 82,
          accuracy: percentage,
          consistency: 88,
          logic: Math.min(100, percentage + 5),
        }}
        onRestart={handleRestart}
      />
    );
  }

  const phraseText = currentIdiom.phrase[activeLang] || currentIdiom.phrase.bs;
  const correctMeaning = currentIdiom.correctMeaning[activeLang] || currentIdiom.correctMeaning.bs;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800 bg-[#0A1628]/90 p-4 sm:p-5 flex items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00C9A7]/15 text-[#00C9A7]">
            <Languages className="h-5 w-5" />
          </span>
          <div>
            <span className="text-[11px] font-bold text-[#00C9A7] uppercase tracking-wider block">
              {t("testovi.idiomsEyebrow", "LINGVISTIČKI KVIZ")}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white">
              Lost in Translation — Kviz Idioma
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
          <span>{currentIndex + 1} / {sessionIdioms.length}</span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl border border-slate-800 bg-[#0A1628]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-center">
        <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block mb-2">
          {t("testovi.whatDoesIdiomMean", "Šta zapravo znači ova izreka?")}
        </span>

        {/* Big Idiom Quote */}
        <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-inner">
          <Quote className="h-6 w-6 text-[#C9A84C] mx-auto mb-2 opacity-60" />
          <h3 className="text-xl sm:text-2xl font-black text-white italic tracking-wide">
            "{phraseText}"
          </h3>
          <p className="text-xs text-muted-foreground mt-2">
            Doslovno značenje: <span className="text-slate-300 italic">{currentIdiom.literalMeaning}</span>
          </p>
        </div>

        {/* 4 Answer Choice Buttons */}
        <div className="space-y-3 mt-6">
          {currentIdiom.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.id === currentIdiom.correctOptionId;

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
                className={`w-full min-h-[54px] p-4 rounded-2xl border font-semibold text-sm sm:text-base text-left transition-all duration-150 flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <span className="min-w-0 break-words">{optText}</span>
                {showExplanation && isCorrect && <Check className="h-5 w-5 text-emerald-400 shrink-0" />}
                {showExplanation && isSelected && !isCorrect && <X className="h-5 w-5 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Meaning Explanation Revelation */}
        {showExplanation && (
          <div className="mt-6 p-5 rounded-2xl border border-[#00C9A7]/40 bg-[#00C9A7]/10 text-left animate-in fade-in duration-300">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00C9A7] block mb-1">
              Tačno značenje i kulturni kontekst:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {correctMeaning}
            </p>

            <button
              type="button"
              onClick={handleNext}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#00C9A7] hover:bg-[#00C9A7]/90 text-slate-950 font-bold px-5 py-2.5 text-xs sm:text-sm transition-colors"
            >
              <span>{currentIndex + 1 === sessionIdioms.length ? t("testovi.finishBtn", "Završi kviz") : t("common.next", "Sljedeći idiom")}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
