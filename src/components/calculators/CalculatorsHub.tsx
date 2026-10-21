import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calculator, Fuel, Receipt, Clock, Zap, Crown, Sparkles, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import GorivoKalkulator from "@/components/calculators/GorivoKalkulator";
import PdvKalkulator from "@/components/calculators/PdvKalkulator";
import StazKalkulator from "@/components/calculators/StazKalkulator";
import StrujaKalkulator from "@/components/calculators/StrujaKalkulator";
import { FreemiumPaywallModal } from "@/components/free-tools/FreemiumPaywallModal";
import { BackButton } from "@/components/common/BackButton";
import { AmbientCategoryBackdrop } from "@/components/layout/AmbientCategoryBackdrop";
import { ShimmerImage } from "@/components/ui/ShimmerImage";

const calculatorConfigs = [
  { id: "gorivo", icon: Fuel, Component: GorivoKalkulator },
  { id: "pdv", icon: Receipt, Component: PdvKalkulator },
  { id: "staz", icon: Clock, Component: StazKalkulator },
  { id: "struja", icon: Zap, Component: StrujaKalkulator },
];

export default function CalculatorsHub() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const requestedTab = searchParams.get("tab");
  const active = calculatorConfigs.find((c) => c.id === requestedTab) ?? calculatorConfigs[0];
  const ActiveCalculator = active.Component;

  const selectTab = (tab: string) => {
    setSearchParams(tab === "gorivo" ? {} : { tab }, { replace: true });
  };

  const calcLabels: Record<string, string> = {
    gorivo: t("calculators.fuel", "Gorivo & Putni troškovi"),
    pdv: t("calculators.pdv", "PDV Kalkulator (17%)"),
    staz: t("calculators.staz", "Radni staž"),
    struja: t("calculators.electricity", "Potrošnja struje"),
  };

  const pageTitle = t("calculators.seoTitle", "Online kalkulatori: gorivo, PDV, radni staž i struja | BH KONVER");
  const pageDescription = t(
    "calculators.seoDesc",
    "Besplatni online kalkulatori za proračun troškova goriva, PDV-a od 17%, radnog staža i električne energije."
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Moving Illuminated Category Background */}
      <AmbientCategoryBackdrop category="kalkulatori" />

      <SEO
        title={pageTitle}
        description={pageDescription}
        path="/category/kalkulatori"
        jsonLd={{
          "@type": "SoftwareApplication",
          name: pageTitle,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
        }}
      />
      <Navbar activeCategory="KALKULATORI" />
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <BackButton label={t("common.backToHome", "← Povratak na početnu")} fallbackTo="/" />
        </div>

        {/* Hero Section */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-9 shadow-2xl backdrop-blur-xl">
          {/* Ambient Background Watermark Logo */}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-80 sm:w-[480px] md:w-[600px] h-full pointer-events-none overflow-hidden select-none opacity-15 sm:opacity-20 flex items-center justify-end">
            <img
              src="/categories/kalkulatori.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto max-h-[140%] object-contain filter drop-shadow-[0_0_60px_rgba(245,158,11,0.5)] transform translate-x-10 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-3.5 py-1 text-xs font-bold text-amber-300 shadow-sm">
                <Calculator className="h-3.5 w-3.5 text-amber-400" />
                <span>{t("calculators.badge", "BH KONVER · BESPLATNI KALKULATORI")}</span>
              </div>
              <h1 className="mt-4 font-display text-2xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-3xl lg:text-4xl">
                {t("calculators.heroTitle", "Tražiš pouzdane i besplatne online kalkulatore koji će ti olakšati svakodnevno računanje?")}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-100 sm:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {t(
                  "calculators.heroDesc",
                  "BH Konver ti nudi širok spektar kalkulatora osmišljenih da ti pruže trenutne i tačne rezultate za različite potrebe. Bilo da se baviš brojevima, mjerenjima, finansijama ili svakodnevnim preračunavanjima, naši kalkulatori ti štede dragocjeno vrijeme i trud. Sve radi direktno u tvom pretraživaču – bez preuzimanja aplikacija i bez ikakve registracije!"
                )}
              </p>

              <div className="mt-6 rounded-2xl border border-amber-500/30 bg-slate-900/70 backdrop-blur-md p-4 sm:p-5 text-left shadow-md">
                <h2 className="text-sm font-bold text-amber-300">
                  {t("calculators.whyTitle", "Zašto koristiti naše kalkulatore?")}
                </h2>
                <div className="mt-2 flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    <strong className="text-white">
                      {t("calculators.benefitTitle", "Trenutni i tačni rezultati:")}
                    </strong>{" "}
                    {t(
                      "calculators.benefitDesc",
                      "Ostvari brze i precizne rezultate bez ikakvog čekanja uz lokalnu obradu u pregledniku."
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative shrink-0 self-center sm:self-auto flex items-center justify-center p-4 sm:p-6 rounded-3xl bg-slate-900/60 border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.35)] backdrop-blur-xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/25 via-orange-500/15 to-transparent rounded-3xl opacity-80 blur-xl pointer-events-none group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[1px] rounded-[23px] border border-white/10 pointer-events-none" />
              <ShimmerImage
                src="/categories/kalkulatori.png"
                alt="Kalkulatori BH KONVER"
                className="relative z-10 h-28 w-36 sm:h-36 sm:w-48 md:h-40 md:w-56 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-105"
                containerClassName="h-28 w-36 sm:h-36 sm:w-48 md:h-40 md:w-56"
                roundedClassName="rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Tab switcher */}
        <div
          className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-card/80 p-2 sm:grid-cols-4 backdrop-blur-md"
          role="tablist"
          aria-label={t("calculators.chooseCalculator", "Izaberite kalkulator")}
        >
          {calculatorConfigs.map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`calculator-tab-${id}`}
              aria-selected={active.id === id}
              aria-controls="calculator-panel"
              onClick={() => selectTab(id)}
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                active.id === id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{calcLabels[id] || id}</span>
            </button>
          ))}
        </div>

        {/* Active Calculator Panel */}
        <div
          id="calculator-panel"
          role="tabpanel"
          aria-labelledby={`calculator-tab-${active.id}`}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <ActiveCalculator />
        </div>

        {/* Premium Banner */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-card p-6 sm:p-8 shadow-sm">
          <div className="filter blur-[1.5px] select-none opacity-60 pointer-events-none">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">
                  {t("calculators.feature1Title", "Izvoz finansijske specifikacije u PDF/Excel")}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("calculators.feature1Desc", "Kompletan izvještaj za računovodstvo i troškove poslovanja s logotipom.")}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">
                  {t("calculators.feature2Title", "Spremanje historije izračuna u profil")}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("calculators.feature2Desc", "Sinhronizacija kroz sve uređaje i neograničeni proračuni bez ograničenja.")}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">
                  {t("calculators.feature3Title", "Zbirni obračun voznog parka i amortizacije")}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("calculators.feature3Desc", "Kalkulacije za preduzeća s više vozila i evidencijom relacija.")}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-[3px] p-4 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Crown className="h-3.5 w-3.5" /> {t("calculators.proTitle", "PRO NAPREDNE OPCIJE")}
            </span>
            <p className="mt-2 text-sm font-semibold text-foreground max-w-md">
              {t(
                "calculators.proDesc",
                "Osnovni kalkulatori su dostupni besplatno. Za napredne izvoze, arhivu i PDF specifikacije dostupan je Premium paket."
              )}
            </p>
            <button
              type="button"
              onClick={() => setPaywallOpen(true)}
              className="mt-3.5 inline-flex items-center gap-2 rounded-xl fluid-cta px-5 py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Sparkles className="h-4 w-4" /> {t("calculators.proCta", "Pogledaj Premium ponudu (PayPal & Banka)")}
            </button>
          </div>
        </div>
      </main>

      <Footer activeCategory="KALKULATORI" />
      <FreemiumPaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        title={t("calculators.paywallTitle", "Premium kalkulatori")}
        description={t(
          "calculators.paywallDesc",
          "Nadogradite račun na Premium da biste koristili neograničeni PDF izvoz i finansijske arhive."
        )}
        redirectPath="/category/kalkulatori"
      />
    </div>
  );
}
