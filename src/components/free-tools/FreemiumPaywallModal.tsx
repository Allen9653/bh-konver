import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Clock,
  CalendarDays,
  Crown,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Check,
  Loader2,
  Building2,
  CreditCard,
  Copy,
  CheckCheck,
  FileCheck2,
  Layers,
  Infinity as InfinityIcon,
  HardDrive,
  Headphones,
  Mail,
  Phone,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface FreemiumPaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  used?: number;
  limit?: number;
  title?: string;
  description?: string;
  redirectPath?: string;
  initialTab?: "overview" | "bank";
}

type PlanId = "24h" | "7d" | "monthly";

const TIERS: {
  id: PlanId;
  icon: typeof Clock;
  badgeKey: string | null;
  i18nKey: string;
}[] = [
  { id: "24h", icon: Clock, badgeKey: null, i18nKey: "tier24h" },
  { id: "7d", icon: CalendarDays, badgeKey: "paywall.popular", i18nKey: "tier7d" },
  { id: "monthly", icon: Crown, badgeKey: "paywall.bestValue", i18nKey: "tierMonthly" },
];

const TIER_PRICES: Record<PlanId, string> = {
  "24h": "2.00 BAM",
  "7d": "7.00 BAM",
  monthly: "20.00 BAM",
};

export function FreemiumPaywallModal({
  open,
  onOpenChange,
  used = 2,
  limit = 2,
  title,
  description,
  redirectPath = "/alati",
  initialTab = "overview",
}: FreemiumPaywallModalProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"overview" | "bank">(initialTab);
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
    }
  }, [open, initialTab]);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(t("common.copied", "Kopirano u međuspremnik!"));
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handlePurchase = async (plan: PlanId, durationLabel: string) => {
    setLoadingPlan(plan);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user?.email) {
        toast.info(t("paywall.loginNotice", "Molimo prijavite se prije kupovine paketa."));
        onOpenChange(false);
        navigate(`/auth?next=${encodeURIComponent(redirectPath)}`);
        return;
      }

      const { data, error } = await supabase.functions.invoke("process-paypal-payment", {
        body: { email: session.user.email, plan, duration: durationLabel },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const approvalUrl: string | undefined = data?.approvalUrl;
      if (!approvalUrl) throw new Error("PayPal approval URL nije primljen.");

      window.location.href = approvalUrl;
    } catch (e) {
      console.error("Paywall checkout error:", e);
      toast.error(t("paywall.checkoutError", "Greška pri pokretanju plaćanja. Pokušajte ponovo ili odaberite bankovnu uplatu."));
    } finally {
      setLoadingPlan(null);
    }
  };

  const premiumFeatures = [
    {
      icon: InfinityIcon,
      title: t("home.premiumModal.f1Title", "Neograničene konverzije"),
      desc: t("home.premiumModal.f1Desc", "Uklonjen dnevni limit od 2 datoteke. Pretvarajte neograničen broj dokumenata i tabela svakodnevno."),
      badge: "Bez limita",
    },
    {
      icon: FileCheck2,
      title: t("home.premiumModal.f2Title", "PDF izvoz bez limita"),
      desc: t("home.premiumModal.f2Desc", "Preuzmite čiste PDF dokumente visoke rezolucije bez vodenih žigova (watermark-free)."),
      badge: "Watermark-free",
    },
    {
      icon: Layers,
      title: t("home.premiumModal.f3Title", "Masovna (Batch) obrada"),
      desc: t("home.premiumModal.f3Desc", "Obradite do 50 datoteka u jednoj seriji uz paralelno procesiranje i automatski ZIP download."),
      badge: "Do 50 fajlova",
    },
    {
      icon: Sparkles,
      title: t("home.premiumModal.f4Title", "DOCX & Slika u PDF rekonstrukcija"),
      desc: t("home.premiumModal.f4Desc", "Potpuna vizuelna vjernost i editabilan Word format uz precizno formatiranje teksta i tabela."),
      badge: "Editabilan Word",
    },
    {
      icon: HardDrive,
      title: t("home.premiumModal.f5Title", "Velike datoteke do 100 MB"),
      desc: t("home.premiumModal.f5Desc", "Zaboravite na ograničenja veličine fajla; komotno procesirajte veće baze i PDF skenove."),
      badge: "Do 100 MB",
    },
    {
      icon: Zap,
      title: t("home.premiumModal.f6Title", "Prioritetni serverski red (0s čekanja)"),
      desc: t("home.premiumModal.f6Desc", "Trenutno izvršenje na namjenskim serverskim resursima bez čekanja u redovima."),
      badge: "0s čekanja",
    },
    {
      icon: Crown,
      title: t("home.premiumModal.f7Title", "Svi PRO kalkulatori i generatori"),
      desc: t("home.premiumModal.f7Desc", "Neograničen pristup svim kalkulatorima, PDF specifikacijama i naprednim generatorima."),
      badge: "Sve PRO opcije",
    },
    {
      icon: Headphones,
      title: t("home.premiumModal.f8Title", "Direktna korisnička podrška 24/7"),
      desc: t("home.premiumModal.f8Desc", "Prioritetna tehnička podrška i direktan kontakt s timom za specifične zahtjeve."),
      badge: "24/7 Podrška",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white px-6 py-6 text-center relative border-b border-primary/20 shrink-0">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-cyan-400 p-0.5 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
            <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center">
              <Crown className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <DialogHeader className="space-y-1.5">
            <DialogTitle className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white">
              {title ?? t("home.premiumModal.title", "Sve opcije koje ima Premium nalog")}
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              {description ?? t("home.premiumModal.subtitle", "Uvid u sve funkcionalnosti, kapacitete i pogodnosti za poslovne i privatne korisnike")}
            </DialogDescription>
          </DialogHeader>

          {/* Quick trust badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> {t("paywall.securePayment", "100% Sigurno plaćanje")}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs text-slate-200">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> {t("paywall.instantActivation", "Trenutna aktivacija")}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs text-slate-200">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" /> {t("home.premiumModal.tabBank", "Uplata na račun u BiH")}
            </span>
          </div>

          {/* Tab Selector */}
          <div className="mt-5 inline-flex rounded-xl bg-slate-950/60 p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                activeTab === "overview"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{t("home.premiumModal.tabFeatures", "Sve opcije i paketi")}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bank")}
              className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                activeTab === "bank"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t("home.premiumModal.tabBank", "Bankovna uplata u BiH")}</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 bg-background overflow-y-auto space-y-6 flex-1">
          {activeTab === "overview" ? (
            <>
              {/* 1. Sve opcije koje ima Premium nalog (Grid of 8 key options) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    {t("home.premiumModal.featuresTitle", "Šta sve dobijate sa Premium nalogom?")}
                  </h4>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    8 ključnih pogodnosti
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {premiumFeatures.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={i}
                        className="rounded-xl border border-border/80 bg-card/60 p-3.5 flex items-start gap-3 hover:border-primary/40 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-xs font-bold text-foreground truncate">{f.title}</h5>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                              {f.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                            {f.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Cjenovni paketi (Instant aktivacija putem PayPal-a / Kartice) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  {t("paywall.choosePlan", "Odaberite dužinu pristupa za instant aktivaciju")}
                </h4>

                <div className="grid sm:grid-cols-3 gap-4">
                  {TIERS.map((tier) => {
                    const Icon = tier.icon;
                    const name = t(`paywall.${tier.i18nKey}.name`);
                    const duration = t(`paywall.${tier.i18nKey}.duration`);
                    const features = [1, 2, 3].map((n) => t(`paywall.${tier.i18nKey}.f${n}`));
                    const price = TIER_PRICES[tier.id];
                    const featured = tier.id === "7d";
                    const isLoading = loadingPlan === tier.id;
                    return (
                      <div
                        key={tier.id}
                        className={`relative rounded-xl border p-4 flex flex-col bg-card transition-all ${
                          featured
                            ? "border-primary border-2 shadow-lg sm:scale-[1.02]"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        {tier.badgeKey && (
                          <Badge
                            className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] ${
                              featured
                                ? "bg-primary text-primary-foreground"
                                : "bg-accent text-accent-foreground"
                            }`}
                          >
                            {t(tier.badgeKey as string)}
                          </Badge>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                          <h5 className="font-bold text-sm text-foreground">{name}</h5>
                        </div>

                        <div className="mb-3">
                          <div className="text-2xl font-bold text-primary leading-none">{price}</div>
                          <div className="text-[11px] text-muted-foreground mt-1">
                            {t("paywall.for", { duration })}
                          </div>
                        </div>

                        <ul className="space-y-1.5 mb-4 flex-1">
                          {features.map((f, i) => (
                            <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          variant={featured ? "default" : "outline"}
                          className={`w-full text-xs font-bold py-2 ${
                            featured ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md" : ""
                          }`}
                          disabled={isLoading || loadingPlan !== null}
                          onClick={() => handlePurchase(tier.id, duration)}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                              {t("paywall.redirecting", "Preusmjeravanje...")}
                            </>
                          ) : (
                            <>
                              {t(`paywall.${tier.i18nKey}.cta`, "Aktiviraj")}
                              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                            </>
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* TAB: Direktna uplata na račun u BiH */
            <div className="space-y-5">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      Direktno plaćanje u banci, pošti ili putem mobilnog bankarstva (BiH)
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Uplata se vrši na domaći transakcijski račun u Bosni i Hercegovini. Nakon izvršene uplate, pošaljite potvrdu i vaš Premium nalog se aktivira odmah!
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank Details Card */}
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Podaci za nalog za uplatu (Uplatnica / m-banking):
                </h5>

                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-muted/60 border border-border/50">
                    <span className="text-muted-foreground block text-[11px]">Primalac / Korisnik:</span>
                    <strong className="text-foreground text-sm font-semibold">Alen Jusufović (BH ASSISTANT / BH KONVER)</strong>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/60 border border-border/50">
                    <span className="text-muted-foreground block text-[11px]">Banka:</span>
                    <strong className="text-foreground text-sm font-semibold">Raiffeisen Bank d.d. Bosna i Hercegovina</strong>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/60 border border-border/50 sm:col-span-2 flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Broj transakcijskog računa (BiH):</span>
                      <strong className="text-foreground text-base font-mono font-bold tracking-wider">
                        1613000084320072
                      </strong>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard("1613000084320072", "account")}
                      className="gap-1.5 text-xs shrink-0"
                    >
                      {copiedField === "account" ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> Kopirano
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Kopiraj račun
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/60 border border-border/50">
                    <span className="text-muted-foreground block text-[11px]">Svrha doznake:</span>
                    <strong className="text-foreground">BH KONVER Premium pristup (upišite vaš e-mail)</strong>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/60 border border-border/50">
                    <span className="text-muted-foreground block text-[11px]">Iznos po paketu:</span>
                    <strong className="text-foreground">24h = 2,00 KM · 7 dana = 7,00 KM · Mjesec = 20,00 KM</strong>
                  </div>
                </div>

                {/* Slanje potvrde za trenutnu aktivaciju */}
                <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 mt-2">
                  <h6 className="text-xs font-bold text-primary flex items-center gap-1.5 mb-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Kako aktivirati nalog odmah nakon uplate?
                  </h6>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    Pošaljite fotografiju uplatnice ili PDF potvrdu iz mobilnog bankarstva na jedan od kontakata, uz navođenje vašeg e-maila za prijavu:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="mailto:alen.jusufovic@proton.me?subject=Potvrda%20uplate%20za%20BH%20KONVER%20Premium"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-foreground hover:border-primary/60 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-primary" /> alen.jusufovic@proton.me
                    </a>
                    <a
                      href="mailto:podrska@bh-assistant.ba?subject=Potvrda%20uplate%20za%20BH%20KONVER%20Premium"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-foreground hover:border-primary/60 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-primary" /> podrska@bh-assistant.ba
                    </a>
                    <a
                      href="https://wa.me/38762580207?text=Pozdrav,%20saljem%20potvrdu%20uplate%20za%20BH%20KONVER%20Premium"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 border border-emerald-500/30 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600/20 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> Viber / WhatsApp: +387 62 580 207
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground pt-1 border-t border-border/50">
            {t("paywall.footnote", "Plaćanja se obrađuju u konvertibilnim markama (BAM). Sigurnost garantovana SSL enkripcijom.")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
