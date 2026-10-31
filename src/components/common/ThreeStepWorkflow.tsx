import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Upload, SlidersHorizontal, Download, Check, AlertCircle, RotateCcw } from "lucide-react";

export interface ThreeStepWorkflowProps {
  currentStep: 1 | 2 | 3;
  onStepChange?: (step: 1 | 2 | 3) => void;
  onReset?: () => void;
  step1Label?: string;
  step2Label?: string;
  step3Label?: string;
  error?: string | null;
  isValid?: boolean;
  className?: string;
}

export function ThreeStepWorkflow({
  currentStep,
  onStepChange,
  onReset,
  step1Label,
  step2Label,
  step3Label,
  error,
  isValid = true,
  className = "",
}: ThreeStepWorkflowProps) {
  const { t } = useLanguage();

  const labels = [
    step1Label || t("workflow.step1", "1. Unos ili Upload"),
    step2Label || t("workflow.step2", "2. Prilagodba / Konfiguracija"),
    step3Label || t("workflow.step3", "3. Preuzimanje ili Kopiranje"),
  ];

  const icons = [Upload, SlidersHorizontal, Download];

  return (
    <div className={`rounded-2xl border border-border/80 bg-card/60 p-4 shadow-sm backdrop-blur-md ${className}`}>
      {/* Steps Header Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-3 gap-2 flex-1">
          {labels.map((label, index) => {
            const stepNumber = (index + 1) as 1 | 2 | 3;
            const Icon = icons[index];
            const isCompleted = currentStep > stepNumber;
            const isActive = currentStep === stepNumber;
            const isClickable = Boolean(onStepChange);

            return (
              <button
                key={label}
                type="button"
                disabled={!isClickable}
                onClick={() => onStepChange?.(stepNumber)}
                className={`group flex items-center gap-2 rounded-xl p-2 sm:px-3 text-left transition-all ${
                  isActive
                    ? "bg-primary/15 border border-primary/40 shadow-sm text-primary"
                    : isCompleted
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-muted/40 border border-border/40 text-muted-foreground opacity-70"
                } ${isClickable ? "cursor-pointer hover:opacity-100" : "cursor-default"}`}
                aria-current={isActive ? "step" : undefined}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-transform group-hover:scale-105 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
                </div>

                <div className="min-w-0 flex-1 hidden md:block">
                  <p className="truncate text-xs font-bold leading-none">{label}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {stepNumber === 1
                      ? t("workflow.step1Sub", "Odabir ili upis")
                      : stepNumber === 2
                      ? t("workflow.step2Sub", "Parametri i opcije")
                      : t("workflow.step3Sub", "Instant rezultat")}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Reset / Clear Button */}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 self-end sm:self-center"
            title={t("workflow.reset", "Poništi i počni ispočetka")}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t("workflow.reset", "Poništi")}</span>
          </button>
        )}
      </div>

      {/* Error state alert banner */}
      {error && (
        <div
          role="alert"
          className="mt-3 flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive font-medium"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Progress indicator bar */}
      <div className="mt-3.5 h-1 w-full overflow-hidden rounded-full bg-muted/60">
        <div
          className={`h-full transition-all duration-300 ease-out ${
            !isValid
              ? "bg-destructive w-1/3"
              : currentStep === 1
              ? "bg-primary w-1/3"
              : currentStep === 2
              ? "bg-primary w-2/3"
              : "bg-emerald-500 w-full"
          }`}
        />
      </div>
    </div>
  );
}
