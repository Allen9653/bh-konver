import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ShieldCheck, Cpu, Trash2, CheckCircle2 } from "lucide-react";

interface TrustSignalsBarProps {
  variant?: "full" | "compact" | "uploadNotice";
  className?: string;
  maxFileSize?: string;
  supportedFormats?: string;
}

export function TrustSignalsBar({
  variant = "full",
  className = "",
  maxFileSize = "50 MB",
  supportedFormats = "PDF, DOCX, JPG, PNG, WEBP, MP3, MP4",
}: TrustSignalsBarProps) {
  const { t } = useLanguage();

  if (variant === "uploadNotice") {
    return (
      <div className={`rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 text-xs text-foreground backdrop-blur-sm ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="font-semibold text-emerald-400">
              {t("trust.localProcessing", "100% lokalna obrada u pregledniku")}
            </span>
            <span className="text-muted-foreground hidden md:inline">
              {t("trust.localProcessingDesc", "— Vaše datoteke ne napuštaju vaš uređaj. Potpuna privatnost.")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
            <span>
              <strong className="text-foreground">{t("trust.formats", "Formati")}:</strong> {supportedFormats}
            </span>
            <span>·</span>
            <span>
              <strong className="text-foreground">{t("trust.limit", "Limit")}:</strong> max {maxFileSize}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-border/80 bg-card/60 p-4 shadow-sm backdrop-blur-md ${className}`}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Signal 1 */}
        <div className="flex items-start gap-3 p-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              {t("trust.browserProcessingTitle", "Obrada u vašem pregledniku")}
            </h4>
            <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
              {t("trust.browserProcessingDesc", "Klijentska enkripcija i trenutna lokalna egzekucija bez nepotrebnog uploada.")}
            </p>
          </div>
        </div>

        {/* Signal 2 */}
        <div className="flex items-start gap-3 p-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Trash2 className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              {t("trust.zeroRetentionTitle", "Dnevno brisanje dokumenata")}
            </h4>
            <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
              {t("trust.zeroRetentionDesc", "Privremene serverske konverzije se automatski trajno brišu u roku od 24h.")}
            </p>
          </div>
        </div>

        {/* Signal 3 */}
        <div className="flex items-start gap-3 p-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              {t("trust.privacyStandardsTitle", "Privatnost bez praćenja")}
            </h4>
            <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
              {t("trust.privacyStandardsDesc", "Nema prodaje podataka, praćenja konverzija niti skrivenih kolačića trećih strana.")}
            </p>
          </div>
        </div>

        {/* Signal 4 */}
        <div className="flex items-start gap-3 p-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              {t("trust.accuracyTitle", "Zvanični ISO & CB standardi")}
            </h4>
            <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
              {t("trust.accuracyDesc", "Zvanični kursevi valuta (Centralna Banka BiH) i sertifikovane metričke formule.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
