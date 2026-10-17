import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

export interface BackButtonProps {
  label?: string;
  fallbackTo?: string;
  className?: string;
  variant?: "ghost" | "glass" | "outline";
}

export const BackButton: React.FC<BackButtonProps> = ({
  label,
  fallbackTo = "/",
  className = "",
  variant = "glass",
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const displayLabel = label ?? t("common.back", "Nazad");

  const handleBack = () => {
    // If there is prior browser history within this session, go back; otherwise use fallback
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallbackTo);
    }
  };

  const baseStyles =
    "group inline-flex items-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 cursor-pointer select-none";

  const variantStyles = {
    glass:
      "bg-slate-900/70 hover:bg-slate-800/90 text-slate-300 hover:text-cyan-400 border border-slate-700/60 hover:border-cyan-500/40 shadow-sm backdrop-blur-md px-3 py-1.5 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    ghost: "text-slate-400 hover:text-foreground hover:bg-slate-800/50 px-2 py-1",
    outline: "border border-border text-foreground hover:bg-muted px-3 py-1.5",
  }[variant];

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`${baseStyles} ${variantStyles} ${className}`}
      aria-label={displayLabel}
      title={displayLabel}
    >
      <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 text-cyan-400" />
      <span>{displayLabel}</span>
    </button>
  );
};

export default BackButton;
