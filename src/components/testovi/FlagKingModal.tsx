import { useState } from "react";
import { Download, Crown, Sparkles, X, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { generateFlagKingCertificate, downloadDataUrl } from "@/utils/quizCanvas";

export interface FlagKingModalProps {
  open: boolean;
  onClose: () => void;
  nickname: string;
  totalCorrect: number;
}

export function FlagKingModal({
  open,
  onClose,
  nickname,
  totalCorrect,
}: FlagKingModalProps) {
  const { t } = useTranslation();
  const [userName, setUserName] = useState(nickname || "Takmičar");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!open) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const dataUrl = await generateFlagKingCertificate({
        nickname: userName.trim() || "Takmičar",
        totalCorrect,
      });
      downloadDataUrl(dataUrl, `BH-KONVER-FLAG-KING-2027-${userName.trim() || "Champion"}.png`);
      setDownloaded(true);
    } catch (err) {
      console.error("Certificate generation error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl rounded-3xl border-2 border-[#C9A84C] bg-gradient-to-b from-[#0A1628] via-[#0d1d33] to-[#0A1628] p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(201,168,76,0.3)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Crown Icon with Glow */}
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#C9A84C]/15 border border-[#C9A84C]/50 text-[#C9A84C] shadow-[0_0_35px_rgba(201,168,76,0.4)]">
          <Crown className="h-10 w-10 animate-bounce" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="h-3.5 w-3.5" /> {t("testovi.trophyAchieved", "Specijalno Priznanje Osvojeno")}
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-[#C9A84C] tracking-tight">
          👑 FLAG KING 2027 👑
        </h2>

        <p className="mt-3 text-sm text-slate-200 leading-relaxed max-w-md mx-auto">
          {t(
            "testovi.flagKingCongratulations",
            "Čestitamo! Osvojili ste kumulativno preko 50 tačnih odgovora na testu svjetskih zastava i stekli titulu Flag King 2027."
          )}
        </p>

        {/* Total Stat Badge */}
        <div className="my-6 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-muted-foreground uppercase font-semibold">
            {t("testovi.totalAccumulated", "Ukupno pogođeno zastava")}:
          </span>
          <span className="text-lg font-black text-[#00C9A7]">
            {totalCorrect}
          </span>
        </div>

        {/* Nickname Input for Certificate */}
        <div className="max-w-xs mx-auto mb-6 text-left">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            {t("testovi.certNameLabel", "Ime / Nadimak na certifikatu:")}
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            maxLength={32}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-[#C9A84C] focus:outline-none"
          />
        </div>

        {/* Download Certificate Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-slate-950 font-black px-6 py-3 transition-transform active:scale-95 shadow-[0_0_25px_rgba(201,168,76,0.4)]"
          >
            {downloaded ? (
              <>
                <Check className="h-5 w-5" />
                <span>{t("testovi.certDownloaded", "Certifikat Preuzet!")}</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>{isDownloading ? t("testovi.generating", "Generišem...") : t("testovi.downloadCertBtn", "Preuzmi PNG Certifikat")}</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-300 hover:text-white"
          >
            {t("common.close", "Zatvori")}
          </button>
        </div>
      </div>
    </div>
  );
}
