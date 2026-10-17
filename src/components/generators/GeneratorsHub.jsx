import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Barcode, Dices, Link2, QrCode, Sparkles, Crown, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import UuidGenerator from "@/components/generators/UuidGenerator";
import QrGenerator from "@/components/generators/QrGenerator";
import SlugGenerator from "@/components/generators/SlugGenerator";
import BarcodeGenerator from "@/components/generators/BarcodeGenerator";
import { FreemiumPaywallModal } from "@/components/free-tools/FreemiumPaywallModal";
import { BackButton } from "@/components/common/BackButton";
import { AmbientCategoryBackdrop } from "@/components/layout/AmbientCategoryBackdrop";
import { ShimmerImage } from "@/components/ui/ShimmerImage";

const generatorConfigs = [
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
    setSearchParams(tab === "uuid" ? {} : { tab }, { replace: true });
  };

  const pageTitle = t("generators.seoTitle", "UUID, QR kod, Slug i Barcode generatori | BH KONVER");
  const pageDescription = t(
    "generators.seoDesc",
    "Brzi i besplatni online generatori UUID v4 identifikatora, QR kodova, SEO URL slugova i linijskih barkodova u vašem pregledniku."
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
        <section className="mb-8 rounded-3xl border border-border/80 p-6 sm:p-10 shadow-sm glass-panel relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Zap className="h-3.5 w-3.5" />
                <span>{t("generators.badge", "BH KONVER · GENERATORI & ALATI")}</span>
              </div>
              <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {t("generators.heroTitle", "Brzi, jednostavni i besplatni online konverteri i alati")}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t(
                  "generators.heroDesc",
                  "Tražiš pouzdane i besplatne alate koji će ti olakšati svakodnevne zadatke? BH Konver ti nudi širok spektar brzih rješenja za konverziju valuta, mjernih jedinica i fajlova na jednom mjestu. Bez obzira da li preračunavaš cijene, usklađuješ formate ili tražiš brze podatke, naši alati ti štede vrijeme i trud. Sve radi direktno u tvom pretraživaču – bez preuzimanja aplikacija i bespotrebne registracije!"
                )}
              </p>
            </div>
            <div className="shrink-0 flex items-center justify-center p-3 sm:p-4 rounded-3xl bg-slate-900/60 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
              <ShimmerImage
                src="/categories/generatori.png"
                alt="Generatori BH KONVER"
                className="h-20 w-20 sm:h-28 sm:w-28 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                containerClassName="h-20 w-20 sm:h-28 sm:w-28"
                roundedClassName="rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Tab switcher */}
        <div
          className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-card/80 p-2 sm:grid-cols-4 backdrop-blur-md"
          role="tablist"
          aria-label={t("generators.chooseGenerator", "Izaberite generator")}
        >
          {generatorConfigs.map(({ id, icon: Icon }) => {
            const labels = {
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
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active.id === id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
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
