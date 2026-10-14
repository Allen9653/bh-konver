import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Barcode, Dices, Link2, QrCode, Sparkles, Crown, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import UuidGenerator from "@/components/generators/UuidGenerator";
import QrGenerator from "@/components/generators/QrGenerator";
import SlugGenerator from "@/components/generators/SlugGenerator";
import BarcodeGenerator from "@/components/generators/BarcodeGenerator";
import { FreemiumPaywallModal } from "@/components/free-tools/FreemiumPaywallModal";
import { BackButton } from "@/components/common/BackButton";

const generators = [
  { id: "uuid", label: "UUID Generator", icon: Dices, Component: UuidGenerator, title: "UUID v4 generator online | BH KONVER", description: "Generišite sigurne nasumične UUID v4 identifikatore. Kreirajte od 1 do 50 nizova i kopirajte ih jednim klikom." },
  { id: "qr", label: "QR Code Generator", icon: QrCode, Component: QrGenerator, title: "QR Code generator za tekst, URL, e-mail i WiFi | BH KONVER", description: "Napravite QR kod za tekst, web adresu, e-mail ili WiFi mrežu i preuzmite ga kao PNG sliku." },
  { id: "slug", label: "Slug Generator", icon: Link2, Component: SlugGenerator, title: "SEO URL slug generator za bosanski tekst | BH KONVER", description: "Pretvorite naslov u čist URL slug uz ispravnu konverziju č, ć, đ, š i ž znakova te kopirajte rezultat." },
  { id: "barcode", label: "Barcode Generator", icon: Barcode, Component: BarcodeGenerator, title: "Barcode generator CODE128 i EAN | BH KONVER", description: "Kreirajte linijske CODE128, EAN-13 i EAN-8 barkodove te preuzmite vektorsku SVG datoteku." },
];

export default function GeneratorsHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const requestedTab = searchParams.get("tab");
  const active = generators.find((generator) => generator.id === requestedTab) ?? generators[0];
  const ActiveGenerator = active.Component;

  const selectTab = (tab) => {
    setSearchParams(tab === "uuid" ? {} : { tab }, { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title={active.title}
        description={active.description}
        path="/category/generatori"
        jsonLd={{ "@type": "SoftwareApplication", name: active.title, applicationCategory: "UtilitiesApplication", operatingSystem: "Any" }}
      />
      <Navbar activeCategory="GENERATORI" />
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <BackButton label="← Povratak na početnu" fallbackTo="/" />
        </div>
        {/* Hero Page Stranice Rubrike GENERATORI */}
        <section className="mb-8 rounded-3xl border border-border/80 p-6 sm:p-10 shadow-sm glass-panel">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Zap className="h-3.5 w-3.5" />
              <span>BH KONVER · GENERATORI & ALATI</span>
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Brzi, jednostavni i besplatni online konverteri i alati
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Tražiš pouzdane i besplatne alate koji će ti olakšati svakodnevne zadatke? BH Konver ti nudi širok spektar brzih rješenja za konverziju valuta, mjernih jedinica i fajlova na jednom mjestu. Bez obzira da li preračunavaš cijene, usklađuješ formate ili tražiš brze podatke, naši alati ti štede vrijeme i trud. Sve radi direktno u tvom pretraživaču – bez preuzimanja aplikacija i bespotrebne registracije!
            </p>
          </div>
        </section>

        {/* Tab switcher */}
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-card/80 p-2 sm:grid-cols-4 backdrop-blur-md" role="tablist" aria-label="Izaberite generator">
          {generators.map(({ id, label, icon: Icon }) => (
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
          ))}
        </div>

        {/* Active Tool Panel */}
        <div id="generator-panel" role="tabpanel" aria-labelledby={`generator-tab-${active.id}`} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <ActiveGenerator />
        </div>

        {/* Zamagljena Premium opcija za Freemium korisnike + Fluidni CTA */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-card p-6 sm:p-8 shadow-sm">
          <div className="filter blur-[1.5px] select-none opacity-60 pointer-events-none">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">Batch izvoz 10.000 QR kodova u ZIP</span>
                <p className="mt-1 text-xs text-muted-foreground">Automatsko masovno generisanje s prilagođenim logotipom i SVG vektorom.</p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">API ključ za programmatic integraciju</span>
                <p className="mt-1 text-xs text-muted-foreground">Direktni REST endpointi za vaše web i mobilne aplikacije.</p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">Neograničeni format barcode etiketa</span>
                <p className="mt-1 text-xs text-muted-foreground">EAN-13 s termalnim dimenzijama za maloprodajne printere.</p>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-[3px] p-4 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Crown className="h-3.5 w-3.5" /> PRO NAPREDNE OPCIJE
            </span>
            <p className="mt-2 text-sm font-semibold text-foreground max-w-md">
              Osnovni generatori su 100% besplatni bez registracije. Za masovni izvoz i napredne postavke aktivirajte Premium paket.
            </p>
            <button
              type="button"
              onClick={() => setPaywallOpen(true)}
              className="mt-3.5 inline-flex items-center gap-2 rounded-xl fluid-cta px-5 py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Sparkles className="h-4 w-4" /> Pogledaj Premium pogodnosti (PayPal & Banka)
            </button>
          </div>
        </div>
      </main>

      <Footer activeCategory="GENERATORI" />
      <FreemiumPaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        title="Premium generatori i alati"
        description="Otključajte neograničeni masovni izvoz, visoke rezolucije i API integraciju."
        redirectPath="/category/generatori"
      />
    </div>
  );
}
