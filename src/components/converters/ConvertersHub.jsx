import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { AmbientCategoryBackdrop } from "@/components/layout/AmbientCategoryBackdrop";
import { ShimmerImage } from "@/components/ui/ShimmerImage";
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

const basicConvertersList = [
  { id: "unit", icon: Ruler, Component: UnitConverter },
  { id: "currency", icon: Coins, Component: CurrencyConverter },
  { id: "script", icon: Languages, Component: CyrillicLatinConverter },
  { id: "case", icon: CaseSensitive, Component: TextCaseConverter },
  { id: "hijri", icon: CalendarDays, Component: HijriDateConverter },
  { id: "length", icon: MoveHorizontal, Component: LengthConverter },
  { id: "roman", icon: WholeWord, Component: RomanNumeralDateConverter },
  { id: "temperature", icon: Thermometer, Component: TemperatureConverter },
];

export default function ConvertersHub() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAdmin } = useAdminAuth();
  const { hasActiveSubscription } = useSubscription(user?.id);
  const isPremium = isAdmin || hasActiveSubscription;

  const mode = searchParams.get("view") || "premium";
  const requestedTab = searchParams.get("tab");
  const activeBasic = basicConvertersList.find((c) => c.id === requestedTab) ?? basicConvertersList[0];
  const ActiveBasicConverter = activeBasic.Component;

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

  const basicLabels = {
    unit: t("converters.units", "Jedinice"),
    currency: t("converters.currencies", "Valute"),
    script: t("converters.script", "Ćirilica / latinica"),
    case: t("converters.textCase", "Text Case"),
    hijri: t("converters.hijri", "Hidžretski datum"),
    length: t("converters.length", "Dužina"),
    roman: t("converters.roman", "Rimski brojevi"),
    temperature: t("converters.temperature", "Temperatura"),
  };

  const pageTitle = t("converters.seoTitle", "PRO i besplatni online konvertori | BH KONVER");
  const pageDescription = t(
    "converters.seoDesc",
    "Kompletan paket sa preko 50 profesionalnih konvertora za PDF, Word, slike, audio, video, valute i jedinice."
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Moving Illuminated Category Background */}
      <AmbientCategoryBackdrop category="konvertori" />

      <SEO
        title={pageTitle}
        description={pageDescription}
        path="/category/konvertori"
        jsonLd={{
          "@type": "SoftwareApplication",
          name: pageTitle,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
        }}
      />
      <Navbar activeCategory="KONVERTORI" />

      <main className="relative z-10 mx-auto w-full max-w-[90rem] flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Navigation Breadcrumb / Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <BackButton label={t("common.backToHome", "← Povratak na početnu")} fallbackTo="/" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
            {t("converters.rubricBadge", "BH KONVER · RUBRIKA KONVERTORI")}
          </span>
        </div>

        {/* Hero Section */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-9 shadow-2xl backdrop-blur-xl">
          {/* Ambient Background Watermark Logo */}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-80 sm:w-[480px] md:w-[600px] h-full pointer-events-none overflow-hidden select-none opacity-15 sm:opacity-20 flex items-center justify-end">
            <img
              src="/categories/konvertori.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto max-h-[140%] object-contain filter drop-shadow-[0_0_60px_rgba(6,182,212,0.5)] transform translate-x-10 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3.5 py-1 text-xs font-bold text-cyan-300 shadow-sm">
                <ArrowLeftRight className="h-3.5 w-3.5 text-cyan-400" />
                <span>{t("converters.heroBadge", "BH KONVER · SVE KONVERZIJE NA JEDNOM MJESTU")}</span>
              </div>
              <h1 className="mt-4 font-display text-2xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-3xl lg:text-4xl">
                {t("converters.heroTitle", "Brzi, tačni i besplatni online konverteri i premium alati")}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-100 sm:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {t(
                  "converters.heroDesc",
                  "Tražiš pouzdane i jednostavne alate koji će ti olakšati svakodnevno preračunavanje i obradu podataka? BH Konver nudi širok spektar opcija: od osnovnih mjernih jedinica, valuta i pisma, do preko 50 naprednih PRO konvertora dokumenata (DOCX, XLS, HTML, XPS), PDF alata, videa, slika, audija, arhiva i kompresora. Sve funkcionira direktno u tvom pretraživaču – bez preuzimanja aplikacija i uz strogu zaštitu privatnosti."
                )}
              </p>
            </div>
            <div className="relative shrink-0 self-center sm:self-auto flex items-center justify-center p-4 sm:p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.35)] backdrop-blur-xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-blue-500/15 to-transparent rounded-3xl opacity-80 blur-xl pointer-events-none group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[1px] rounded-[23px] border border-white/10 pointer-events-none" />
              <ShimmerImage
                src="/categories/konvertori.png"
                alt="Konvertori BH KONVER"
                className="relative z-10 h-28 w-36 sm:h-36 sm:w-48 md:h-40 md:w-56 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-105"
                containerClassName="h-28 w-36 sm:h-36 sm:w-48 md:h-40 md:w-56"
                roundedClassName="rounded-2xl"
              />
            </div>
          </div>

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
              <span>{t("converters.modePro", "PRO & Premium Konvertori (50+ formata)")}</span>
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
              <span>{t("converters.modeBasic", "Osnovni / Freemium alati (Valute, Mjere, Pismo)")}</span>
            </button>
          </div>

          <div className="text-xs text-slate-400">
            {mode === "premium" ? (
              <span className="font-mono text-cyan-400">{t("converters.countPro", "Prikazano: 50+ naprednih alata")}</span>
            ) : (
              <span className="font-mono text-emerald-400">{t("converters.countBasic", "Prikazano: 8 brzih freemium alata")}</span>
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
              aria-label={t("converters.chooseConverter", "Izaberite konverter")}
            >
              {basicConvertersList.map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`converter-tab-${id}`}
                  aria-selected={activeBasic.id === id}
                  aria-controls="converter-panel"
                  onClick={() => selectBasicTab(id)}
                  className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition-all ${
                    activeBasic.id === id
                      ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{basicLabels[id] || id}</span>
                </button>
              ))}
            </div>

            <div
              id="converter-panel"
              role="tabpanel"
              aria-labelledby={`converter-tab-${activeBasic.id}`}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 sm:p-6 backdrop-blur-md"
            >
              <ActiveBasicConverter />
            </div>
          </div>
        )}
      </main>

      <Footer activeCategory="KONVERTORI" />
    </div>
  );
}
