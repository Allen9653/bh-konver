import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  category: "converters" | "calculators" | "generators" | "tests" | "guides";
  categoryLabel: string;
  to: string;
  icon: LucideIcon;
  inputOutput: string; // e.g. "BAM ↔ EUR", "JPG → PDF", "Data → QR"
  badge?: string;
  isPopular?: boolean;
  isClientSide?: boolean;
}

interface ToolCardProps {
  tool: ToolItem;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { t } = useLanguage();
  const Icon = tool.icon;

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/75 p-5 shadow-sm transition-all hover:border-primary/50 hover:bg-card hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background">
      <div>
        {/* Top bar: Icon & Format badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-1.5">
            {/* Input/Output format pill */}
            <span
              className="inline-flex items-center rounded-md border border-border/80 bg-muted/70 px-2 py-0.5 font-mono text-[11px] font-bold text-foreground/90 tabular-nums shadow-xs"
              title={`${t("toolCard.format", "Ulaz / Izlaz format")}: ${tool.inputOutput}`}
            >
              {tool.inputOutput}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-4 font-display text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
          <Link
            to={tool.to}
            className="focus-visible:outline-none before:absolute before:inset-0"
          >
            {tool.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {tool.description}
        </p>
      </div>

      {/* Card Footer: Metadata and Prominent Action */}
      <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
        <span className="text-[11px] font-medium text-muted-foreground/80 uppercase tracking-wider">
          {tool.categoryLabel}
        </span>

        <span className="inline-flex min-h-[36px] items-center gap-1.5 font-bold text-primary group-hover:translate-x-1 transition-transform">
          <span>{t("toolCard.open", "Pokreni alat")}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
