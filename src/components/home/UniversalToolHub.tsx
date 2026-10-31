import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { ToolCard, ToolItem } from "./ToolCard";
import {
  Search,
  X,
  Coins,
  Ruler,
  Type,
  Calendar,
  FileImage,
  Repeat2,
  FileText,
  Fuel,
  Receipt,
  Clock,
  Zap,
  QrCode,
  Barcode,
  WandSparkles,
  ClipboardCheck,
  Calculator,
  Compass,
  Car,
  Brain,
  Smile,
  BookOpen,
  ArrowRight,
  Filter,
} from "lucide-react";

type CategoryFilter = "all" | "converters" | "calculators" | "generators" | "tests" | "guides";

export function UniversalToolHub() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const tools: ToolItem[] = useMemo(
    () => [
      // --- CONVERTERS ---
      {
        id: "currency",
        title: t("tools.currency.title", "Konvertor valuta (BAM / EUR / USD)"),
        description: t(
          "tools.currency.desc",
          "Zvanični kursevi konvertibilne marke (KM) prema EUR, USD, CHF, GBP, TRY i regionalnim valutama."
        ),
        category: "converters",
        categoryLabel: t("nav.converters", "Konvertori"),
        to: "/category/konvertori?tab=currency",
        icon: Coins,
        inputOutput: "BAM ↔ EUR/USD",
        isPopular: true,
      },
      {
        id: "units",
        title: t("tools.units.title", "Konvertor mjernih jedinica"),
        description: t(
          "tools.units.desc",
          "Pretvaranje dužine, težine/mase, površine, zapremine i metričkih u imperijalne jedinice."
        ),
        category: "converters",
        categoryLabel: t("nav.converters", "Konvertori"),
        to: "/category/konvertori?tab=unit",
        icon: Ruler,
        inputOutput: "Metrički ↔ Imperijalni",
      },
      {
        id: "image-pdf",
        title: t("tools.imagePdf.title", "Slika u PDF konverter"),
        description: t(
          "tools.imagePdf.desc",
          "Pretvorite JPG, PNG, WEBP i HEIC fotografije u čist, optimizovan PDF bez gubitka kvaliteta."
        ),
        category: "converters",
        categoryLabel: t("nav.converters", "Konvertori"),
        to: "/slika-pdf",
        icon: FileImage,
        inputOutput: "JPG/PNG → PDF",
        isPopular: true,
        isClientSide: true,
      },
      {
        id: "pdf-docx",
        title: t("tools.pdfDocx.title", "PDF i Word alati"),
        description: t(
          "tools.pdfDocx.desc",
          "Konverzija PDF u Word (DOCX), Word u PDF, te brzo spajanje i rotiranje dokumenata."
        ),
        category: "converters",
        categoryLabel: t("nav.converters", "Konvertori"),
        to: "/alati",
        icon: FileText,
        inputOutput: "PDF ↔ DOCX",
        isPopular: true,
      },
      {
        id: "script",
        title: t("tools.script.title", "Ćirilica ↔ Latinica preslovljavanje"),
        description: t(
          "tools.script.desc",
          "Dvosmjerna i precizna transliteracija teksta uz očuvanje složenih digrafa (Dž, Lj, Nj)."
        ),
        category: "converters",
        categoryLabel: t("nav.converters", "Konvertori"),
        to: "/category/konvertori?tab=script",
        icon: Type,
        inputOutput: "Latinica ↔ Ћирилица",
        isClientSide: true,
      },
      {
        id: "audio",
        title: t("tools.audio.title", "Audio konverter"),
        description: t(
          "tools.audio.desc",
          "Pretvaranje formata zvučnih zapisa: MP3, WAV, AAC, OGG, FLAC uz podešavanje bitrate-a."
        ),
        category: "converters",
        categoryLabel: t("nav.converters", "Konvertori"),
        to: "/modul/audio",
        icon: Repeat2,
        inputOutput: "Audio → MP3/WAV",
      },
      {
        id: "video",
        title: t("tools.video.title", "Video konverter (MP4, MKV, GIF)"),
        description: t(
          "tools.video.desc",
          "Promjena video kontejnera, izdvajanje audio zapisa i kreiranje laganih animiranih GIF-ova."
        ),
        category: "converters",
        categoryLabel: t("nav.converters", "Konvertori"),
        to: "/modul/video",
        icon: Repeat2,
        inputOutput: "Video → MP4/GIF",
      },
      {
        id: "hijri",
        title: t("tools.hijri.title", "Hidžretski kalendar konvertor"),
        description: t(
          "tools.hijri.desc",
          "Usklađivanje i preračun datuma između gregorijanskog i islamskog hidžretskog kalendara."
        ),
        category: "converters",
        categoryLabel: t("nav.converters", "Konvertori"),
        to: "/category/konvertori?tab=hijri",
        icon: Calendar,
        inputOutput: "Datum ↔ Hidžret",
      },

      // --- CALCULATORS ---
      {
        id: "fuel",
        title: t("tools.fuel.title", "Kalkulator goriva i putnih troškova"),
        description: t(
          "tools.fuel.desc",
          "Precizan proračun potrošnje litara, troška po putniku i ukupnih izdataka za putovanje."
        ),
        category: "calculators",
        categoryLabel: t("nav.calculators", "Kalkulatori"),
        to: "/kalkulatori/gorivo",
        icon: Fuel,
        inputOutput: "KM / Litra → BAM",
        isPopular: true,
      },
      {
        id: "pdv",
        title: t("tools.pdv.title", "PDV Kalkulator (17% BiH)"),
        description: t(
          "tools.pdv.desc",
          "Brzi proračun iznosa PDV-a, osnovice bez poreza i konačne cijene sa uračunatim PDV-om."
        ),
        category: "calculators",
        categoryLabel: t("nav.calculators", "Kalkulatori"),
        to: "/kalkulatori/pdv",
        icon: Receipt,
        inputOutput: "Netto ↔ Bruto (17%)",
        isPopular: true,
      },
      {
        id: "staz",
        title: t("tools.staz.title", "Kalkulator radnog staža"),
        description: t(
          "tools.staz.desc",
          "Sabiranje perioda zaposlenja u tačan broj godina, mjeseci i dana radnog iskustva."
        ),
        category: "calculators",
        categoryLabel: t("nav.calculators", "Kalkulatori"),
        to: "/kalkulatori/staz",
        icon: Clock,
        inputOutput: "Periodi → God/Mj/Dan",
      },
      {
        id: "electricity",
        title: t("tools.electricity.title", "Kalkulator potrošnje struje"),
        description: t(
          "tools.electricity.desc",
          "Procjena mjesečnih i godišnjih troškova rada kućanskih aparata po tarifama u BiH."
        ),
        category: "calculators",
        categoryLabel: t("nav.calculators", "Kalkulatori"),
        to: "/kalkulatori/struja",
        icon: Zap,
        inputOutput: "Watt/Sati → BAM",
      },

      // --- GENERATORS ---
      {
        id: "cv",
        title: t("tools.cv.title", "Moderni Europass CV Generator"),
        description: t(
          "tools.cv.desc",
          "Kreirajte profesionalan dvojezični životopis sa fotografijom u standardnom A4 PDF formatu."
        ),
        category: "generators",
        categoryLabel: t("nav.generators", "Generatori"),
        to: "/category/generatori?tab=cv",
        icon: FileText,
        inputOutput: "Podaci + Foto → PDF",
        isPopular: true,
      },
      {
        id: "qr",
        title: t("tools.qr.title", "QR Kod Generator"),
        description: t(
          "tools.qr.desc",
          "Kreiranje QR kodova visoke rezolucije za linkove, Wi-Fi pristup, kontakt kartice i tekst."
        ),
        category: "generators",
        categoryLabel: t("nav.generators", "Generatori"),
        to: "/category/generatori?tab=qr",
        icon: QrCode,
        inputOutput: "Tekst/URL → QR PNG",
        isPopular: true,
      },
      {
        id: "uuid",
        title: t("tools.uuid.title", "UUID v4 Generator"),
        description: t(
          "tools.uuid.desc",
          "Kriptografski sigurno generisanje jedinstvenih UUID identifikatora pojedinačno ili u seriji."
        ),
        category: "generators",
        categoryLabel: t("nav.generators", "Generatori"),
        to: "/category/generatori?tab=uuid",
        icon: WandSparkles,
        inputOutput: "Crypto → UUID v4",
      },
      {
        id: "barcode",
        title: t("tools.barcode.title", "Barcode Generator (CODE128 & EAN)"),
        description: t(
          "tools.barcode.desc",
          "Generisanje linijskih barkodova spremnih za štampu na etiketama i deklaracijama artikala."
        ),
        category: "generators",
        categoryLabel: t("nav.generators", "Generatori"),
        to: "/category/generatori?tab=barcode",
        icon: Barcode,
        inputOutput: "Tekst/Broj → Barkod",
      },
      {
        id: "slug",
        title: t("tools.slug.title", "SEO Slug Generator"),
        description: t(
          "tools.slug.desc",
          "Automatsko pretvaranje naslova u optimizovane web URL adrese sa podrškom za domaća slova."
        ),
        category: "generators",
        categoryLabel: t("nav.generators", "Generatori"),
        to: "/category/generatori?tab=slug",
        icon: WandSparkles,
        inputOutput: "Naslov → web-slug",
      },

      // --- TESTS ---
      {
        id: "test-math-logic",
        title: "Math & Logic Speed Test",
        description: "60 sekundi intenzivnog računanja i logičkih nizova.",
        category: "tests",
        categoryLabel: t("nav.tests", "Testovi"),
        to: "/testovi/math-logic",
        icon: Calculator,
        inputOutput: "60s → Score",
      },
      {
        id: "test-flags",
        title: "Guess the Flag (Zastave)",
        description: "Prepoznajte preko 160 svjetskih zastava i osvojite Flag King 2027.",
        category: "tests",
        categoryLabel: t("nav.tests", "Testovi"),
        to: "/testovi/flags",
        icon: Compass,
        inputOutput: "160+ Zastava → Certifikat",
      },
      {
        id: "test-lateral",
        title: "Lateral Thinking Challenge",
        description: "5 zamki za logiku. Koliko ih možeš izbjeći?",
        category: "tests",
        categoryLabel: t("nav.tests", "Testovi"),
        to: "/testovi/lateral",
        icon: Brain,
        inputOutput: "5 Zamki → Procenat",
      },
      {
        id: "test-fraud",
        title: "Spot the Fraud (Detektor Uljeza)",
        description: "Brze 10-sekundne vizuelne runde detekcije uljeza.",
        category: "tests",
        categoryLabel: t("nav.tests", "Testovi"),
        to: "/testovi/fraud",
        icon: Smile,
        inputOutput: "10s Runda → Vid",
      },
      {
        id: "test-pattern",
        title: "Pattern Recognition Gauntlet",
        description: "Slomi šifru: niz zagonetki sve težih obrazaca.",
        category: "tests",
        categoryLabel: t("nav.tests", "Testovi"),
        to: "/testovi/pattern",
        icon: Brain,
        inputOutput: "Obrasci → Šifra",
      },
      {
        id: "test-script",
        title: "Script-Switching / Speed-Typing",
        description: "Transliteracija i brzo kucanje: Latinica ↔ Ćirilica.",
        category: "tests",
        categoryLabel: t("nav.tests", "Testovi"),
        to: "/testovi/script",
        icon: Compass,
        inputOutput: "Tekst → WPM",
      },
      {
        id: "test-idioms",
        title: "Lost in Translation (Idiomi)",
        description: "Kviz narodnih izreka i idioma kroz 5 jezika.",
        category: "tests",
        categoryLabel: t("nav.tests", "Testovi"),
        to: "/testovi/idioms",
        icon: Brain,
        inputOutput: "Izreke → Značenje",
      },

      // --- GUIDES ---
      {
        id: "guide-mp4",
        title: t("tools.guideMp4.title", "Vodič: MP4 vs MKV video formati"),
        description: t(
          "tools.guideMp4.desc",
          "Kada odabrati MP4 zbog kompatibilnosti, a kada MKV zbog više audio traka i titlova."
        ),
        category: "guides",
        categoryLabel: t("nav.blog", "Vodiči"),
        to: "/blog/razlika-mp4-i-mkv",
        icon: BookOpen,
        inputOutput: "Video → Vodič",
      },
      {
        id: "guide-docx",
        title: t("tools.guideDocx.title", "Vodič: Kako otvoriti i sačuvati DOCX"),
        description: t(
          "tools.guideDocx.desc",
          "Savjeti za uređivanje i konverziju Word datoteka bez instaliranog Microsoft Office paketa."
        ),
        category: "guides",
        categoryLabel: t("nav.blog", "Vodiči"),
        to: "/blog/kako-otvoriti-docx-fajl",
        icon: BookOpen,
        inputOutput: "Word → Uputstvo",
      },
      {
        id: "guide-heic",
        title: t("tools.guideHeic.title", "Vodič: iPhone HEIC slike u JPG"),
        description: t(
          "tools.guideHeic.desc",
          "Kako lako pregledati i konvertovati visokokompresovane Apple fotografije na računaru."
        ),
        category: "guides",
        categoryLabel: t("nav.blog", "Vodiči"),
        to: "/blog/heic-u-jpg-konverzija",
        icon: BookOpen,
        inputOutput: "HEIC → Savjet",
      },
    ],
    [t]
  );

  // Filtered tools based on search and selected category
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "all" || tool.category === activeCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.inputOutput.toLowerCase().includes(q) ||
        tool.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [tools, activeCategory, searchQuery]);

  const categories: { key: CategoryFilter; label: string; count: number }[] = [
    { key: "all", label: t("hub.allCategories", "Svi alati"), count: tools.length },
    {
      key: "converters",
      label: t("nav.converters", "Konvertori"),
      count: tools.filter((t) => t.category === "converters").length,
    },
    {
      key: "calculators",
      label: t("nav.calculators", "Kalkulatori"),
      count: tools.filter((t) => t.category === "calculators").length,
    },
    {
      key: "generators",
      label: t("nav.generators", "Generatori"),
      count: tools.filter((t) => t.category === "generators").length,
    },
    {
      key: "tests",
      label: t("nav.tests", "Testovi"),
      count: tools.filter((t) => t.category === "tests").length,
    },
    {
      key: "guides",
      label: t("nav.blog", "Vodiči"),
      count: tools.filter((t) => t.category === "guides").length,
    },
  ];

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Universal Search Header */}
      <div className="mx-auto max-w-3xl text-center">
        <label
          htmlFor="universal-tool-search"
          className="block font-display text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl"
        >
          {t("hub.searchPrompt", "Šta želite konvertovati ili izračunati?")}
        </label>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {t(
            "hub.searchSubprompt",
            "Pretražite preko 25 brzih online alata, kalkulatora i besplatnih konvertora na jednom mjestu."
          )}
        </p>

        {/* Universal Search Field */}
        <div className="relative mt-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
            <Search className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>

          <input
            id="universal-tool-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              "hub.searchPlaceholder",
              "Unesite naziv alata ili format (npr. KM u EUR, QR kod, PDF, PDV, Gorivo)..."
            )}
            className="w-full min-h-[52px] rounded-2xl border border-border/80 bg-card/90 pl-11 pr-12 text-sm sm:text-base font-medium text-foreground shadow-md backdrop-blur-md placeholder:text-muted-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t("hub.clearSearch", "Poništi pretragu")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="mt-8 flex items-center justify-center">
        <div
          className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-border/80 bg-card/70 p-1.5 shadow-xs backdrop-blur-md"
          role="tablist"
          aria-label={t("hub.categoryListAria", "Kategorije alata")}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex min-h-[40px] items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] tabular-nums font-mono ${
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Current Filter info */}
      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          {searchQuery
            ? `${t("hub.foundTools", "Pronađeno")}: ${filteredTools.length} ${t("hub.toolsCount", "alata")}`
            : `${t("hub.showing", "Prikazano")}: ${filteredTools.length} ${t("hub.toolsCount", "alata")}`}
        </span>

        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="font-semibold text-primary hover:underline"
          >
            {t("hub.resetFilter", "Poništi pretragu")}
          </button>
        )}
      </div>

      {/* Grid of Tool Cards */}
      {filteredTools.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center">
          <Filter className="mx-auto h-8 w-8 text-muted-foreground/60" />
          <h3 className="mt-3 font-display text-base font-bold text-foreground">
            {t("hub.noResultsTitle", "Nijedan alat ne odgovara vašoj pretrazi")}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("hub.noResultsDesc", "Pokušajte sa jednostavnijim pojmom ili odaberite kategoriju 'Svi alati'.")}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("hub.viewAll", "Prikaži sve alate")}
          </button>
        </div>
      )}
    </section>
  );
}
