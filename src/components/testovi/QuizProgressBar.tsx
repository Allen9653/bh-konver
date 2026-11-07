import React from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Sparkles, Target } from "lucide-react";

export interface QuizProgressBarProps {
  current: number;
  total: number | null;
  quizSlug?: string;
  className?: string;
}

export function QuizProgressBar({
  current,
  total,
  quizSlug,
  className = "",
}: QuizProgressBarProps) {
  const { t } = useTranslation();

  // If total is known (e.g. 5 or 10 questions)
  const isFinite = typeof total === "number" && total > 0;
  const clampedCurrent = isFinite ? Math.min(Math.max(0, current), total) : Math.max(0, current);
  const percentage = isFinite ? Math.round((clampedCurrent / total) * 100) : null;

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-[#0A1628]/90 p-4 sm:p-5 backdrop-blur-xl shadow-lg transition-all duration-300 ${className}`}
      role="progressbar"
      aria-valuenow={clampedCurrent}
      aria-valuemin={0}
      aria-valuemax={isFinite ? total : undefined}
      aria-label={t("testovi.progressAria", "Napredak kroz pitanja")}
    >
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00C9A7]/15 text-[#00C9A7]">
            {isFinite && clampedCurrent >= (total || 1) ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Target className="h-4 w-4" />
            )}
          </span>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#00C9A7] block leading-none">
              {t("testovi.progressLabel", "Napredak kviza")}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white mt-0.5 block">
              {isFinite ? (
                <>
                  {t("testovi.questionProgress", "Pitanje {{current}} od {{total}}", {
                    current: clampedCurrent,
                    total: total,
                  })}
                </>
              ) : (
                <>
                  {t("testovi.answeredCounter", "Odgovoreno: {{count}} pitanja", {
                    count: clampedCurrent,
                  })}
                </>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {percentage !== null ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-xs font-black text-[#00C9A7]">
              <Sparkles className="h-3 w-3" />
              <span>{percentage}%</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300">
              <span className="h-2 w-2 rounded-full bg-[#00C9A7] animate-pulse" />
              <span>{t("testovi.speedRun", "Speed Run")}</span>
            </span>
          )}
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-900/90 border border-slate-800">
        {percentage !== null ? (
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 via-[#00C9A7] to-cyan-400 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(0,201,167,0.6)]"
            style={{ width: `${Math.max(2, percentage)}%` }}
          />
        ) : (
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-[#C9A84C] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,201,167,0.5)]"
            style={{
              width: `${Math.min(100, Math.max(5, (clampedCurrent % 20) * 5))}%`,
            }}
          />
        )}
      </div>

      {/* Step Pills for Finite Quizzes (up to 10 questions) */}
      {isFinite && total <= 10 && (
        <div className="mt-3 flex items-center justify-between gap-1 sm:gap-1.5">
          {Array.from({ length: total }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum <= clampedCurrent;
            const isCurrent = stepNum === clampedCurrent;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1 group"
                title={`Pitanje ${stepNum}`}
              >
                <div
                  className={`h-1.5 w-full rounded-full transition-all duration-200 ${
                    isCompleted
                      ? "bg-[#00C9A7] shadow-[0_0_8px_rgba(0,201,167,0.5)]"
                      : isCurrent
                      ? "bg-[#C9A84C] animate-pulse"
                      : "bg-slate-800"
                  }`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
