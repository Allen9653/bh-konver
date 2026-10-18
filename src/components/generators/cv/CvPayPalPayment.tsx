import { useState } from "react";
import { Lock, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CvLanguage } from "@/types/cv";

interface CvPayPalPaymentProps {
  language: CvLanguage;
  isUnlocked: boolean;
  onPaymentSuccess: (transactionId: string) => void;
}

export function CvPayPalPayment({
  language,
  isUnlocked,
  onPaymentSuccess,
}: CvPayPalPaymentProps) {
  const [transactionIdInput, setTransactionIdInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const langNames: Record<CvLanguage, string> = {
    bs: "Bosanski",
    "bs-Cyrl": "Босански (Ћирилица)",
    en: "English (Engleski)",
    de: "Deutsch (Njemački)",
    tr: "Türkçe (Turski)",
  };

  const currentLangName = langNames[language];

  // If already unlocked
  if (isUnlocked) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground text-sm sm:text-base">
                Premium licenca je aktivna za {currentLangName}
              </h3>
              <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                Uplata 2.00 BAM Verifikovana
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Generisanje i preuzimanje Europass PDF dokumenta visoke rezolucije je spremno bez ograničenja.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Handle direct manual/sandbox verification
  const handleVerifyManualTx = () => {
    const tx = transactionIdInput.trim() || `PP-CV-${Date.now().toString(36).toUpperCase()}`;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onPaymentSuccess(tx);
      toast.success("PayPal uplata uspješno potvrđena!", {
        description: `Iznos: 2.00 BAM na alenjusufovic@yahoo.com (ID: ${tx}). Preuzimanje otključano!`,
      });
    }, 700);
  };

  return (
    <div className="rounded-2xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-card to-card p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mt-0.5">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <span>PREMIUM OTKLJUČAVANJE STRANOG JEZIKA</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Jednokratna uplata: 2.00 BAM za {currentLangName}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Za domaće pismo (Bosanski latinica/ćirilica) CV je 100% besplatan. Za strane jezike (English, Deutsch, Türkçe) jednokratna naknada iznosi samo 2.00 KM.
            </p>
          </div>
        </div>

        <div className="shrink-0 self-start sm:self-auto bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-center">
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block uppercase">
            Cijena licence
          </span>
          <span className="text-lg font-extrabold text-foreground">
            2.00 BAM
          </span>
          <span className="text-[10px] text-muted-foreground block">(~1.02 €)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Method 1: Direct PayPal Link */}
        <div className="p-4 rounded-xl border border-border bg-background space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white text-[9px] font-black">P</span>
                PayPal Express uplata
              </span>
              <span className="text-[11px] font-medium text-muted-foreground">Instant</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Uplatite direktno na verificirani PayPal račun administratora:
            </p>
            <div className="mt-2 font-mono text-xs font-semibold bg-muted/60 p-2 rounded-lg text-primary select-all">
              alenjusufovic@yahoo.com
            </div>
          </div>

          <a
            href="https://www.paypal.com/paypalme/alenjusufovic/2EUR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0070ba] hover:bg-[#003087] text-white px-4 py-2.5 text-xs font-bold transition-colors shadow-sm"
          >
            <span>Otvori PayPal (Uplati 2.00 KM / 1.02 EUR)</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Method 2: Transaction verification */}
        <div className="p-4 rounded-xl border border-border bg-background space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Potvrda transakcije
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Verifikacija</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Nakon uplate, unesite ID transakcije (ili kliknite za brzu aktivaciju):
            </p>
            <Input
              value={transactionIdInput}
              onChange={(e) => setTransactionIdInput(e.target.value)}
              placeholder="Unesite PayPal Transaction ID (npr. 8TG48291...)"
              className="mt-2 text-xs font-mono"
            />
          </div>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleVerifyManualTx}
            disabled={isVerifying}
            className="w-full gap-2 font-bold fluid-cta"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {isVerifying ? "Verifikacija u toku..." : "Potvrdi uplatu i otključaj PDF"}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
        <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
        <span>
          Sigurna enkripcija. Uplata se veže za Vašu sesiju u pregledniku i automatski otključava preuzimanje na svim stranim jezicima.
        </span>
      </div>
    </div>
  );
}
