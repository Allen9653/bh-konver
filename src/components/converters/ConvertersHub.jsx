import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowLeftRight,
  CalendarDays,
  CaseSensitive,
  Coins,
  Languages,
  MoveHorizontal,
  Ruler,
  Thermometer,
  WholeWord,
  Sparkles,
  Layers,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/common/BackButton";
import UnitConverter from "@/components/converters/UnitConverter";
import CurrencyConverter from "@/components/converters/CurrencyConverter";
import CyrillicLatinConverter from "@/components/converters/CyrillicLatinConverter";
import TextCaseConverter from "@/components/converters/TextCaseConverter";
import HijriDateConverter from "@/components/converters/HijriDateConverter";
import LengthConverter from "@/components/converters/LengthConverter";
import RomanNumeralDateConverter from "@/components/converters/RomanNumeralDateConverter";
import TemperatureConverter from "@/components/converters/TemperatureConverter";
import PremiumUniversalConverter from "@/components/converters/PremiumUniversalConverter";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useSubscription } from "@/hooks/useSubscription";

const basicConverters = [
  { id: "unit", label: "Jedinice", icon: Ruler, Component: UnitConverter },
  { id: "currency", label: "Valute", icon: Coins, Component: CurrencyConverter },
  { id: "script", label: "Ćirilica / latinica", icon: Languages, Component: CyrillicLatinConverter },
  { id: "case", label: "Text Case", icon: CaseSensitive, Component: TextCaseConverter },
  { id: "hijri", label: "Hidžretski datum", icon: CalendarDays, Component: HijriDateConverter },
  { id: "length", label: "Dužina", icon: MoveHorizontal, Component: LengthConverter },
  { id: "roman", label: "Rimski brojevi", icon: WholeWord, Component: RomanNumeralDateConverter },
  { id: "temperature", label: "Temperatura", icon: Thermometer, Component: TemperatureConverter },
];

const converterSeo = {
  unit: { title: "Besplatni konverter jedinica: dužina, masa i površina | BH KONVER", description: "Pretvorite dužinu, masu, zapreminu i površinu u nekoliko sekundi. Besplatni konverter jedinica radi direktno u pregledniku, bez prijave." },
  currency: { title: "Konverter valuta KM, EUR, USD, CHF i GBP | BH KONVER", description: "Preračunajte konvertibilnu marku, euro, dolar, franak i funtu prema ažurnim kursevima. Besplatna konverzija valuta bez registracije." },
  script: { title: "Konverter ćirilice i latinice za bosanski tekst | BH KONVER", description: "Preslovite tekst između ćirilice i latinice uz podršku za č, ć, đ, š, ž, lj, nj i dž. Besplatno, odmah i bez prijave." },
  case: { title: "Besplatni Text Case converter: velika i mala slova | BH KONVER", description: "Promijenite format teksta u velika ili mala slova, Capitalize ili Title Case. Pregled rezultata uživo, bez registracije." },
  hijri: { title: "Konverter hidžretskog i gregorijanskog datuma | BH KONVER", description: "Pretvorite datume između gregorijanskog i Umm al-Qura hidžretskog kalendara. Besplatan dvosmjerni konverter datuma." },
  length: { title: "Konverter dužine: metri, stope, inči i milje | BH KONVER", description: "Brzo pretvorite metre, stope, inče, kilometre i milje. Tačan besplatni konverter dužine dostupan direktno u pregledniku." },
  roman: { title: "Konverter rimskih brojeva i datuma | BH KONVER", description: "Pretvorite brojeve i datume u rimske oznake i nazad. Provjera standardnog zapisa i datuma, besplatno i bez prijave." },
  temperature: { title: "Konverter temperature: Celsius, Fahrenheit, Kelvin | BH KONVER", description: "Pretvorite temperaturu između stepeni Celzijusa, Fahrenheita i Kelvina, uz provjeru apsolutne nule. Besplatno i bez registracije." },
  premium: { title: "PRO & Premium Konvertori datoteka, dokumenata i videa | BH KONVER", description: "Kompletna paleta sa preko 50 profesionalnih konvertora za PDF, DOCX, XLS, AVI, MP4, MP3, ZIP arhive i kompresore." },
};

export default function ConvertersHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAdmin } = useAdminAuth();
  const { hasActiveSubscription } = useSubscription(user?.id);
  const isPremium = isAdmin || hasActiveSubscription;

  const mode = searchParams.get("view") || "premium"; // default to showing the requested rich premium suite
  const requestedTab = searchParams.get("tab");
  const activeBasic = basicConverters.find((converter) => converter.id === requestedTab) ?? basicConverters[0];
  const ActiveBasicConverter = activeBasic.Component;

  const metadata = mode === "premium" ? converterSeo.premium : (converterSeo[activeBasic.id] || converterSeo.unit);

  const selectMode = (newMode) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("view", newMode);
    setSearchParams(nextParams, { replace: true });
  };

  const selectBasicTab = (tab) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("view", "basic");
    if (tab === "unit") nextParams.delete("tab");
    else nextParams.set("tab", tab);
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SEO
        title={metadata.title}
        description={metadata.description}
        path="/category/konvertori"
        jsonLd={{
          "@type": "SoftwareApplication",
          name: metadata.title,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
        }}
      />
      <Navbar activeCategory="KONVERTORI" />

      <main className="relative z-10 mx-auto w-full max-w-[90rem] flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Navigation Breadcrumb / Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <BackButton label="← Povratak na početnu" fallbackTo="/" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
            BH KONVER · RUBRIKA KONVERTORI
          </span>
        </div>

        {/* Hero Page Stranice Rubrike KONVERTORI */}
        <section className="mb-8 rounded-3xl border border-white/10 p-6 sm:p-10 shadow-sm glass-panel relative overflow-hidden">
          <div className="max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-400">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span>BH KONVER · SVE KONVERZIJE NA JEDNOM MJESTU</span>
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Brzi, tačni i besplatni online konverteri i premium alati
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Tražiš pouzdane i jednostavne alate koji će ti olakšati svakodnevno preračunavanje i obradu podataka? BH Konver nudi širok spektar opcija: od osnovnih mjernih jedinica, valuta i pisma, do preko 50 naprednih PRO konvertora dokumenata (DOCX, XLS, HTML, XPS), PDF alata, videa, slika, audija, arhiva i kompresora. Sve funkcionira direktno u tvom pretraživaču – bez preuzimanja aplikacija i uz strogu zaštitu privatnosti.
            </p>
          </div>

          {/* Background cyber glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        </section>

        {/* Suite Switcher Toggle */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel rounded-2xl p-3 border border-white/10">
          <div className="flex w-full sm:w-auto items-center rounded-xl bg-slate-900/80 p-1 border border-white/10">
            <button
              type="button"
              onClick={() => selectMode("premium")}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                mode === "premium"
                  ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>PRO & Premium Konvertori (50+ formata)</span>
            </button>
            <button
              type="button"
              onClick={() => selectMode("basic")}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                mode === "basic"
                  ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Osnovni / Freemium alati (Valute, Mjere, Pismo)</span>
            </button>
          </div>

          <div className="text-xs text-slate-400">
            {mode === "premium" ? (
              <span className="font-mono text-cyan-400">Prikazano: 50+ naprednih alata</span>
            ) : (
              <span className="font-mono text-emerald-400">Prikazano: 8 brzih freemium alata</span>
            )}
          </div>
        </div>

        {/* Render either the rich Premium 50+ Suite or the Basic Tabbed Suite */}
        {mode === "premium" ? (
          <PremiumUniversalConverter isPremium={isPremium} />
        ) : (
          <div>
            <div
              className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-slate-900/60 p-2 sm:grid-cols-4 xl:grid-cols-8"
              role="tablist"
              aria-label="Izaberite konverter"
            >
              {basicConverters.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`converter-tab-${id}`}
                  aria-selected={activeBasic.id === id}
                  aria-controls="converter-panel"
                  onClick={() => selectBasicTab(id)}
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:text-sm ${
                    activeBasic.id === id
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div id="converter-panel" role="tabpanel" aria-labelledby={`converter-tab-${activeBasic.id}`}>
              <ActiveBasicConverter />
            </div>
          </div>
        )}
      </main>

      <Footer activeCategory="KONVERTORI" />
    </div>
  );
}
