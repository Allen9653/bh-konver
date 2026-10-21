import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Barcode, Dices, Link2, QrCode, Sparkles, Crown, Zap, FileText } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import ModernEuropassCvGenerator from "@/components/generators/ModernEuropassCvGenerator";
import UuidGenerator from "@/components/generators/UuidGenerator";
import QrGenerator from "@/components/generators/QrGenerator";
import SlugGenerator from "@/components/generators/SlugGenerator";
import BarcodeGenerator from "@/components/generators/BarcodeGenerator";
import { FreemiumPaywallModal } from "@/components/free-tools/FreemiumPaywallModal";
import { BackButton } from "@/components/common/BackButton";
import { AmbientCategoryBackdrop } from "@/components/layout/AmbientCategoryBackdrop";
import { ShimmerImage } from "@/components/ui/ShimmerImage";

const generatorConfigs = [
  { id: "cv", translationKey: "cv", icon: FileText, Component: ModernEuropassCvGenerator, badge: "NOVO · Europass" },
  { id: "uuid", translationKey: "uuid", icon: Dices, Component: UuidGenerator },
  { id: "qr", translationKey: "qr", icon: QrCode, Component: QrGenerator },
  { id: "slug", translationKey: "slug", icon: Link2, Component: SlugGenerator },
  { id: "barcode", translationKey: "barcode", icon: Barcode, Component: BarcodeGenerator },
];

export default function GeneratorsHub() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const requestedTab = searchParams.get("tab");
  const active = generatorConfigs.find((generator) => generator.id === requestedTab) ?? generatorConfigs[0];
  const ActiveGenerator = active.Component;

  const selectTab = (tab) => {
    setSearchParams(tab === "cv" ? {} : { tab }, { replace: true });
  };

  const pageTitle = t("generators.seoTitle", "Moderni Europass CV, UUID, QR kod, Slug i Barcode generatori | BH KONVER");
  const pageDescription = t(
    "generators.seoDesc",
    "Kreirajte profesionalan Europass CV u PDF formatu, generišite UUID v4, QR kodove, SEO slugove i barkodove besplatno na BH KONVER."
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Moving Illuminated Category Background */}
      <AmbientCategoryBackdrop category="generatori" />

      <SEO
        title={pageTitle}
        description={pageDescription}
        path="/category/generatori"
        jsonLd={{
          "@type": "SoftwareApplication",
          name: pageTitle,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
        }}
      />
      <Navbar activeCategory="GENERATORI" />
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <BackButton label={t("common.backToHome", "← Povratak na početnu")} fallbackTo="/" />
        </div>

        {/* Hero Section */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-9 shadow-2xl backdrop-blur-xl">
          {/* Ambient Background Watermark Logo */}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-80 sm:w-[480px] md:w-[600px] h-full pointer-events-none overflow-hidden select-none opacity-15 sm:opacity-20 flex items-center justify-end">
            <img
              src="/categories/generatori.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto max-h-[140%] object-contain filter drop-shadow-[0_0_60px_rgba(59,130,246,0.5)] transform translate-x-10 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/15 px-3.5 py-1 text-xs font-bold text-blue-300 shadow-sm">
                <Zap className="h-3.5 w-3.5 text-blue-400" />
                <span>{t("generators.badge", "BH KONVER · GENERATORI & ALATI")}</span>
              </div>
              <h1 className="mt-4 font-display text-2xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-3xl lg:text-4xl">
                {t("generators.heroTitle", "Brzi, jednostavni i besplatni online konverteri i alati")}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-100 sm:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {t(
                  "generators.heroDesc",
                  "Tražiš pouzdane i besplatne alate koji će ti olakšati svakodnevne zadatke? BH Konver ti nudi širok spektar brzih rješenja za konverziju valuta, mjernih jedinica i fajlova na jednom mjestu. Bez obzira da li preračunavaš cijene, usklađuješ formate ili tražiš brze podatke, naši alati ti štede vrijeme i trud. Sve radi direktno u tvom pretraživaču – bez preuzimanja aplikacija i bespotrebne registracije!"
                )}
              </p>
            </div>
            <div className="relative shrink-0 self-center sm:self-auto flex items-center justify-center p-4 sm:p-6 rounded-3xl bg-slate-900/60 border border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.35)] backdrop-blur-xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/25 via-cyan-500/15 to-transparent rounded-3xl opacity-80 blur-xl pointer-events-none group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[1px] rounded-[23px] border border-white/10 pointer-events-none" />
              <ShimmerImage
                src="/categories/generatori.png"
                alt="Generatori BH KONVER"
                className="relative z-10 h-28 w-36 sm:h-36 sm:w-48 md:h-40 md:w-56 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-105"
                containerClassName="h-28 w-36 sm:h-36 sm:w-48 md:h-40 md:w-56"
                roundedClassName="rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Tab switcher */}
        <div
          className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 rounded-2xl border border-border bg-card/80 p-2 backdrop-blur-md"
          role="tablist"
          aria-label={t("generators.chooseGenerator", "Izaberite generator")}
        >
          {generatorConfigs.map(({ id, icon: Icon, badge }) => {
            const labels = {
              cv: t("generators.cv", "Europass CV"),
              uuid: t("generators.uuid", "UUID Generator"),
              qr: t("generators.qr", "QR Code Generator"),
              slug: t("generators.slug", "Slug Generator"),
              barcode: t("generators.barcode", "Barcode Generator"),
            };
            const label = labels[id] || id.toUpperCase();

            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`generator-tab-${id}`}
                aria-selected={active.id === id}
                aria-controls="generator-panel"
                onClick={() => selectTab(id)}
                className={`relative inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active.id === id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
                {badge && (
                  <span
                    className={`hidden sm:inline-block text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                      active.id === id
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tool Panel */}
        <div
          id="generator-panel"
          role="tabpanel"
          aria-labelledby={`generator-tab-${active.id}`}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <ActiveGenerator />
        </div>

        {/* Premium Banner */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-card p-6 sm:p-8 shadow-sm">
          <div className="filter blur-[1.5px] select-none opacity-60 pointer-events-none">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">
                  {t("generators.feature1Title", "Batch izvoz 10.000 QR kodova u ZIP")}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("generators.feature1Desc", "Automatsko masovno generisanje s prilagođenim logotipom i SVG vektorom.")}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">
                  {t("generators.feature2Title", "API ključ za programmatic integraciju")}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("generators.feature2Desc", "Direktni REST endpointi za vaše web i mobilne aplikacije.")}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">
                  {t("generators.feature3Title", "Neograničeni format barcode etiketa")}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("generators.feature3Desc", "EAN-13 s termalnim dimenzijama za maloprodajne printere.")}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-[3px] p-4 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Crown className="h-3.5 w-3.5" /> {t("generators.proTitle", "PRO NAPREDNE OPCIJE")}
            </span>
            <p className="mt-2 text-sm font-semibold text-foreground max-w-md">
              {t(
                "generators.proDesc",
                "Osnovni generatori su 100% besplatni bez registracije. Za masovni izvoz i napredne postavke aktivirajte Premium paket."
              )}
            </p>
            <button
              type="button"
              onClick={() => setPaywallOpen(true)}
              className="mt-3.5 inline-flex items-center gap-2 rounded-xl fluid-cta px-5 py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Sparkles className="h-4 w-4" /> {t("generators.proCta", "Pogledaj Premium pogodnosti (PayPal & Banka)")}
            </button>
          </div>
        </div>
      </main>

      <Footer activeCategory="GENERATORI" />
      <FreemiumPaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        title={t("generators.paywallModalTitle", "Premium generatori i alati")}
        description={t(
          "generators.paywallModalDesc",
          "Otključajte neograničeni masovni izvoz, visoke rezolucije i API integraciju."
        )}
        redirectPath="/category/generatori"
      />
    </div>
  );
}
