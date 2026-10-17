import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Coins,
  Ruler,
  Languages,
  FileText,
  ArrowRightLeft,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { cyrillicToLatin, latinToCyrillic } from "@/utils/scriptText";

// Fiksni i okvirni kursevi prema BAM (KM)
const CURRENCY_RATES_TO_BAM: Record<string, number> = {
  BAM: 1.0,
  EUR: 1.95583,
  USD: 1.82,
  CHF: 2.05,
  GBP: 2.29,
  TRY: 0.054,
  RSD: 0.0167,
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  BAM: "KM",
  EUR: "€",
  USD: "$",
  CHF: "CHF",
  GBP: "£",
  TRY: "₺",
  RSD: "din",
};

// Jedinice mjere
type UnitCategory = "length" | "weight" | "area" | "temp";

const UNIT_CONVERSIONS: Record<
  UnitCategory,
  { label: string; units: Record<string, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }> }
> = {
  length: {
    label: "Dužina",
    units: {
      m: { label: "Metri (m)", toBase: (v) => v, fromBase: (v) => v },
      km: { label: "Kilometri (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      cm: { label: "Centimetri (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      ft: { label: "Stope (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      in: { label: "Inči (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      mi: { label: "Milje (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    },
  },
  weight: {
    label: "Masa",
    units: {
      kg: { label: "Kilogrami (kg)", toBase: (v) => v, fromBase: (v) => v },
      g: { label: "Grami (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      lb: { label: "Funte (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      oz: { label: "Unce (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      t: { label: "Tone (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    },
  },
  area: {
    label: "Površina",
    units: {
      m2: { label: "Kvadratni metri (m²)", toBase: (v) => v, fromBase: (v) => v },
      dulum: { label: "Dulumi (1000 m²)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      ha: { label: "Hektari (ha)", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      km2: { label: "Kvadratni kilometri (km²)", toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      sqft: { label: "Kvadratne stope (ft²)", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    },
  },
  temp: {
    label: "Temperatura",
    units: {
      c: { label: "Celzijus (°C)", toBase: (v) => v, fromBase: (v) => v },
      f: { label: "Fahrenheit (°F)", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      k: { label: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  },
};

export const CompactHeroConverter = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"currency" | "units" | "text" | "files">("currency");
  const [copied, setCopied] = useState(false);

  // 1. Currency state
  const [currencyAmount, setCurrencyAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("BAM");

  // Currency calculation
  const currencyResult = useMemo(() => {
    const fromRate = CURRENCY_RATES_TO_BAM[fromCurrency] ?? 1;
    const toRate = CURRENCY_RATES_TO_BAM[toCurrency] ?? 1;
    const inBam = currencyAmount * fromRate;
    return inBam / toRate;
  }, [currencyAmount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // 2. Units state
  const [unitCategory, setUnitCategory] = useState<UnitCategory>("length");
  const [unitValue, setUnitValue] = useState<number>(10);
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");

  const unitResult = useMemo(() => {
    const cat = UNIT_CONVERSIONS[unitCategory];
    if (!cat.units[fromUnit] || !cat.units[toUnit]) return 0;
    const baseValue = cat.units[fromUnit].toBase(unitValue);
    return cat.units[toUnit].fromBase(baseValue);
  }, [unitCategory, unitValue, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCategoryChange = (cat: UnitCategory) => {
    setUnitCategory(cat);
    const keys = Object.keys(UNIT_CONVERSIONS[cat].units);
    setFromUnit(keys[0]);
    setToUnit(keys[1] ?? keys[0]);
  };

  // 3. Text state
  const [textInput, setTextInput] = useState("Dobro došli u BH Konver – brzi online alati.");
  const [textMode, setTextMode] = useState<"cyrl" | "latin" | "upper" | "lower">("cyrl");

  const textResult = useMemo(() => {
    if (!textInput) return "";
    switch (textMode) {
      case "cyrl":
        return latinToCyrillic(textInput);
      case "latin":
        return cyrillicToLatin(textInput);
      case "upper":
        return textInput.toLocaleUpperCase("bs");
      case "lower":
        return textInput.toLocaleLowerCase("bs");
      default:
        return textInput;
    }
  }, [textInput, textMode]);

  // Copy helper
  const copyToClipboard = (val: string, label = "Rezultat") => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    toast.success(`${label} je uspješno kopiran!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel w-full rounded-2xl shadow-xl transition-all duration-300">
      {/* Top Tab Bar */}
      <div className="flex border-b border-border/70 p-2 sm:p-2.5">
        <div className="grid w-full grid-cols-4 gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("currency")}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === "currency"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            <Coins className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{t("converter.tabs.currency", "Valute")}</span>
            <span className="sm:hidden">KM/€</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("units")}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === "units"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            <Ruler className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{t("converter.tabs.units", "Jedinice")}</span>
            <span className="sm:hidden">Mjere</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("text")}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === "text"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            <Languages className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{t("converter.tabs.script", "Tekst & Pismo")}</span>
            <span className="sm:hidden">Tekst</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("files")}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === "files"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{t("converter.tabs.files", "PDF & Fajlovi")}</span>
            <span className="sm:hidden">Fajlovi</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Valute */}
      {activeTab === "currency" && (
        <div className="p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-12 sm:items-center">
            {/* Amount input */}
            <div className="sm:col-span-4">
              <label className="text-xs font-medium text-muted-foreground">{t("converter.amount", "Iznos")}</label>
              <div className="mt-1 flex rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 input-glow focus-within:ring-2 focus-within:ring-cyan-500/50 shadow-sm">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={currencyAmount || ""}
                  onChange={(e) => setCurrencyAmount(parseFloat(e.target.value) || 0)}
                  placeholder="100"
                  className="w-full bg-transparent text-lg font-bold text-foreground outline-none"
                />
                <span className="self-center text-xs font-semibold text-muted-foreground">
                  {CURRENCY_SYMBOLS[fromCurrency] ?? fromCurrency}
                </span>
              </div>
            </div>

            {/* From & To Selects with Swap */}
            <div className="flex items-center gap-2 sm:col-span-5">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground">{t("converter.from", "Iz")}</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5 text-sm font-semibold text-foreground shadow-sm input-glow"
                >
                  {Object.keys(CURRENCY_RATES_TO_BAM).map((c) => (
                    <option key={c} value={c} className="bg-slate-900 text-white">
                      {c} ({CURRENCY_SYMBOLS[c]})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={swapCurrencies}
                aria-label={t("converter.swap", "Zamijeni smjer valuta")}
                className="mt-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-foreground transition-all hover:bg-slate-800 hover:rotate-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </button>

              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground">{t("converter.to", "U")}</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5 text-sm font-semibold text-foreground shadow-sm input-glow"
                >
                  {Object.keys(CURRENCY_RATES_TO_BAM).map((c) => (
                    <option key={c} value={c} className="bg-slate-900 text-white">
                      {c} ({CURRENCY_SYMBOLS[c]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Output Card */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 sm:col-span-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                {t("converter.result", "Preračunato")}
              </span>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="truncate text-xl font-extrabold text-foreground sm:text-2xl">
                  {currencyResult.toLocaleString("bs", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-sm font-bold text-primary">
                  {CURRENCY_SYMBOLS[toCurrency] ?? toCurrency}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    `${currencyResult.toFixed(2)} ${CURRENCY_SYMBOLS[toCurrency] ?? toCurrency}`,
                    t("converter.amount", "Iznos")
                  )
                }
                className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-border bg-background py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t("converter.copied", "Kopirano!") : t("converter.copy", "Kopiraj iznos")}
              </button>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span>Brzi iznosi:</span>
              {[20, 50, 100, 200, 500].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCurrencyAmount(preset)}
                  className="rounded-md border border-border px-2 py-0.5 hover:bg-muted font-medium text-foreground transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
            <Link
              to="/category/konvertori?tab=currency"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Otvorite napredni kurs kalkulator <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: Jedinice */}
      {activeTab === "units" && (
        <div className="p-4 sm:p-6">
          {/* Category pills */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {(Object.keys(UNIT_CONVERSIONS) as UnitCategory[]).map((catKey) => {
              const label =
                catKey === "length"
                  ? t("converter.unitLength", "Dužina")
                  : catKey === "weight"
                  ? t("converter.unitWeight", "Masa")
                  : catKey === "area"
                  ? t("converter.unitArea", "Površina")
                  : t("converter.unitTemp", "Temperatura");
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => handleCategoryChange(catKey)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    unitCategory === catKey
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-12 sm:items-center">
            <div className="sm:col-span-4">
              <label className="text-xs font-medium text-muted-foreground">{t("converter.amount", "Vrijednost")}</label>
              <input
                type="number"
                step="any"
                value={unitValue || ""}
                onChange={(e) => setUnitValue(parseFloat(e.target.value) || 0)}
                placeholder="10"
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5 text-lg font-bold text-foreground shadow-sm input-glow"
              />
            </div>

            <div className="flex items-center gap-2 sm:col-span-5">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground">{t("converter.from", "Iz")}</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5 text-xs font-semibold text-foreground shadow-sm input-glow sm:text-sm"
                >
                  {Object.entries(UNIT_CONVERSIONS[unitCategory].units).map(([key, val]) => (
                    <option key={key} value={key} className="bg-slate-900 text-white">
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={swapUnits}
                aria-label={t("converter.swap", "Zamijeni jedinice")}
                className="mt-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-foreground transition-all hover:bg-slate-800 hover:rotate-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </button>

              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground">{t("converter.to", "U")}</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5 text-xs font-semibold text-foreground shadow-sm input-glow sm:text-sm"
                >
                  {Object.entries(UNIT_CONVERSIONS[unitCategory].units).map(([key, val]) => (
                    <option key={key} value={key} className="bg-slate-900 text-white">
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 sm:col-span-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                {t("converter.result", "Rezultat")}
              </span>
              <div className="mt-1 flex items-baseline justify-between gap-1">
                <span className="truncate text-xl font-extrabold text-foreground sm:text-2xl">
                  {unitResult < 0.0001 && unitResult > 0
                    ? unitResult.toExponential(4)
                    : Number(unitResult.toFixed(4)).toString()}
                </span>
                <span className="text-xs font-bold text-primary">{toUnit}</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(unitResult.toString(), t("converter.result", "Rezultat"))}
                className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-border bg-background py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t("converter.copied", "Kopirano!") : t("converter.copy", "Kopiraj")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Tekst & Pismo */}
      {activeTab === "text" && (
        <div className="p-4 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-muted-foreground">{t("converter.category", "Način obrade:")}</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setTextMode("cyrl")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  textMode === "cyrl"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                {t("converter.toCyrillic", "U Ćirilicu")}
              </button>
              <button
                type="button"
                onClick={() => setTextMode("latin")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  textMode === "latin"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                {t("converter.toLatin", "U Latinicu")}
              </button>
              <button
                type="button"
                onClick={() => setTextMode("upper")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  textMode === "upper"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                VELIKA
              </button>
              <button
                type="button"
                onClick={() => setTextMode("lower")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  textMode === "lower"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                mala
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">{t("converter.inputText", "Unesite ili zalijepite tekst")}</label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2.5 text-sm text-foreground shadow-sm input-glow"
                placeholder={t("converter.inputText", "Upišite tekst...")}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">{t("converter.result", "Pretvoreni tekst")}</label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(textResult, t("converter.result", "Tekst"))}
                  className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <Copy className="h-3 w-3" /> {t("converter.copy", "Kopiraj")}
                </button>
              </div>
              <div className="mt-1 min-h-[5.5rem] rounded-xl border border-border bg-muted/30 p-2.5 text-sm text-foreground overflow-y-auto max-h-24 font-mono">
                {textResult || <span className="text-muted-foreground">{t("converter.outputText", "Rezultat će se prikazati ovdje...")}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: PDF & Fajlovi */}
      {activeTab === "files" && (
        <div className="p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              to="/slika-pdf"
              className="glass-card-hover group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground">Slika u PDF</h2>
                  <p className="text-[11px] text-muted-foreground">JPG, PNG, WebP u čist PDF</p>
                </div>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                {t("converter.openTool", "Otvori alat")} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            <Link
              to="/alati/pdf-to-word"
              className="glass-card-hover group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground">PDF u Word</h2>
                  <p className="text-[11px] text-muted-foreground">Brza DOCX konverzija</p>
                </div>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                {t("converter.openTool", "Otvori alat")} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            <Link
              to="/alati"
              className="glass-card-hover group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground">Svi PDF Alati</h2>
                  <p className="text-[11px] text-muted-foreground">Spajanje, rotacija, kompresija</p>
                </div>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                {t("converter.openTool", "Pregledaj sve")} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
