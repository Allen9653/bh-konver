import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage, normalizeLanguageCode } from "@/hooks/useLanguage";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Calculator,
  Repeat2,
  WandSparkles,
  ClipboardCheck,
  FileText,
  QrCode,
  Barcode,
  Coins,
  Ruler,
  Type,
  FileImage,
  Flame,
  Percent,
  Calendar,
  Zap,
  BookOpen,
  ShieldCheck,
  HelpCircle,
  Command,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export interface SearchToolItem {
  id: string;
  titleKey: string;
  title: string;
  description: string;
  category: "konvertori" | "generatori" | "kalkulatori" | "testovi" | "info";
  categoryLabel: string;
  to: string;
  icon: any;
  keywords: string[];
  badge?: string;
}

export interface GlobalSearchProps {
  variant?: "default" | "full";
}

export function GlobalSearch({ variant = "default" }: GlobalSearchProps = {}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const currentLang = normalizeLanguageCode(language);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // All searchable tools and modules in BH KONVER
  const allTools: SearchToolItem[] = useMemo(() => [
    // --- KONVERTORI ---
    {
      id: "conv-currency",
      titleKey: "converter.currency",
      title: t("converter.currency", "Konverter valuta (BAM / EUR / USD)"),
      description: t("search.currencyDesc", "Trenutni kurs KM prema EUR, USD, CHF, GBP, TRY i ostalim svjetskim valutama."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/category/konvertori?tab=currency",
      icon: Coins,
      keywords: ["valute", "novac", "kurs", "bam", "km", "euro", "eur", "usd", "dolar", "chf", "franak", "currency", "money"],
      badge: "Popularno",
    },
    {
      id: "conv-units",
      titleKey: "converter.units",
      title: t("converter.units", "Konverter mjernih jedinica"),
      description: t("search.unitsDesc", "Dužina, masa, površina, zapremina, temperatura i pritisak."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/category/konvertori?tab=unit",
      icon: Ruler,
      keywords: ["jedinice", "metar", "kilogram", "gram", "km", "milje", "celzijus", "farenhajt", "units", "length", "weight"],
      badge: "Besplatno",
    },
    {
      id: "conv-script",
      titleKey: "converter.script",
      title: t("converter.script", "Preslovljavanje: Ćirilica ↔ Latinica"),
      description: t("search.scriptDesc", "Trenutna dvosmjerna transliteracija teksta između ćirilice i latinice."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/category/konvertori?tab=script",
      icon: Type,
      keywords: ["cirilica", "latinica", "preslovljavanje", "tekst", "pismo", "cyrillic", "latin"],
    },
    {
      id: "conv-case",
      titleKey: "converter.case",
      title: t("converter.case", "Text Case konverter"),
      description: t("search.caseDesc", "Velika i mala slova, CamelCase, Title Case, Snake Case i Kebab Case."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/category/konvertori?tab=case",
      icon: Type,
      keywords: ["tekst", "velika slova", "mala slova", "case", "uppercase", "lowercase", "camelcase"],
    },
    {
      id: "conv-hijri",
      titleKey: "converter.hijri",
      title: t("converter.hijri", "Hidžretski kalendar konverter"),
      description: t("search.hijriDesc", "Pretvaranje datuma između gregorijanskog i islamskog hidžretskog kalendara."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/category/konvertori?tab=hijri",
      icon: Calendar,
      keywords: ["hidzretski", "kalendar", "islam", "datum", "hijri", "date"],
    },
    {
      id: "conv-image-pdf",
      titleKey: "converter.imagePdf",
      title: t("converter.imagePdf", "Slika u PDF konverzija"),
      description: t("search.imagePdfDesc", "Pretvorite JPG, PNG, WEBP ili HEIC slike u optimizovan PDF dokument."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/slika-pdf",
      icon: FileImage,
      keywords: ["slika", "pdf", "jpg", "png", "webp", "heic", "image", "photo"],
      badge: "Brzo",
    },
    {
      id: "conv-audio",
      titleKey: "converter.audio",
      title: t("converter.audio", "Audio konverter"),
      description: t("search.audioDesc", "Konverzija MP3, WAV, AAC, OGG i FLAC audio datoteka."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/modul/audio",
      icon: Repeat2,
      keywords: ["audio", "mp3", "wav", "zvuk", "muzika", "aac", "flac"],
    },
    {
      id: "conv-video",
      titleKey: "converter.video",
      title: t("converter.video", "Video konverter (MP4, MKV, GIF)"),
      description: t("search.videoDesc", "Promjena video formata, izdvajanje zvuka i kreiranje GIF animacija."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/modul/video",
      icon: Repeat2,
      keywords: ["video", "mp4", "gif", "mkv", "avi", "webm", "film"],
    },
    {
      id: "conv-pdf-word",
      titleKey: "converter.pdfWord",
      title: t("converter.pdfWord", "PDF i Word alati (Word u PDF, PDF u Word, spajanje)"),
      description: t("search.pdfWordDesc", "Privatna klijentska konverzija i PRO obrada PDF dokumenata, Word fajlova i spajanje."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/alati",
      icon: FileText,
      keywords: ["pdf", "word", "docx", "spajanje", "merge", "alati", "dokument", "freemium", "format"],
      badge: "Popularno",
    },
    {
      id: "conv-length",
      titleKey: "converter.length",
      title: t("converter.length", "Konverter dužine i udaljenosti"),
      description: t("search.lengthDesc", "Metri, kilometri, milje, jardi, stope i inči."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/category/konvertori?tab=length",
      icon: Ruler,
      keywords: ["duzina", "udaljenost", "metar", "centimetar", "kilometar", "milja", "inc", "length"],
    },
    {
      id: "conv-roman",
      titleKey: "converter.roman",
      title: t("converter.roman", "Rimski brojevi konverter"),
      description: t("search.romanDesc", "Dvosmjerno pretvaranje rimskih i arapskih brojeva."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/category/konvertori?tab=roman",
      icon: Type,
      keywords: ["rimski", "brojevi", "roman", "numerals", "arapske", "cifre"],
    },
    {
      id: "conv-temp",
      titleKey: "converter.temp",
      title: t("converter.temp", "Konverter temperature"),
      description: t("search.tempDesc", "Pretvaranje između Celzijusa, Farenhajta i Kelvina."),
      category: "konvertori",
      categoryLabel: t("nav.converters", "KONVERTORI"),
      to: "/category/konvertori?tab=temperature",
      icon: Ruler,
      keywords: ["temperatura", "celzijus", "farenhajt", "kelvin", "temperature"],
    },

    // --- GENERATORI ---
    {
      id: "gen-cv",
      titleKey: "generator.cv",
      title: t("generator.cv", "Europass CV Generator (A4 PDF)"),
      description: t("search.cvDesc", "Izradite moderan Europass životopis sa slikom za bh. i inostrano tržište u A4 PDF formatu."),
      category: "generatori",
      categoryLabel: t("nav.generators", "GENERATORI"),
      to: "/category/generatori?tab=cv",
      icon: FileText,
      keywords: ["cv", "europass", "biografija", "posao", "zivotopis", "resume", "curriculum", "vitae", "pdf", "rad", "karijera", "slika"],
      badge: "Preporučeno",
    },
    {
      id: "gen-qr",
      titleKey: "generator.qr",
      title: t("generator.qr", "QR Kod Generator"),
      description: t("search.qrDesc", "Kreirajte prilagođeni QR kod za web stranice, Wi-Fi mreže, tekst ili vCard."),
      category: "generatori",
      categoryLabel: t("nav.generators", "GENERATORI"),
      to: "/category/generatori?tab=qr",
      icon: QrCode,
      keywords: ["qr", "kod", "wifi", "link", "url", "barcode", "vcard"],
      badge: "Popularno",
    },
    {
      id: "gen-uuid",
      titleKey: "generator.uuid",
      title: t("generator.uuid", "UUID v4 Generator"),
      description: t("search.uuidDesc", "Generisanje jedinstvenih identifikatora (Universally Unique Identifiers)."),
      category: "generatori",
      categoryLabel: t("nav.generators", "GENERATORI"),
      to: "/category/generatori?tab=uuid",
      icon: WandSparkles,
      keywords: ["uuid", "guid", "id", "random", "kod", "programiranje"],
    },
    {
      id: "gen-slug",
      titleKey: "generator.slug",
      title: t("generator.slug", "SEO Slug Generator"),
      description: t("search.slugDesc", "Pretvorite naslove u čiste web URL linkove sa podrškom za domaća slova."),
      category: "generatori",
      categoryLabel: t("nav.generators", "GENERATORI"),
      to: "/category/generatori?tab=slug",
      icon: WandSparkles,
      keywords: ["slug", "url", "seo", "link", "web", "naslov"],
    },
    {
      id: "gen-barcode",
      titleKey: "generator.barcode",
      title: t("generator.barcode", "Barkod Generator (CODE128, EAN)"),
      description: t("search.barcodeDesc", "Izrada linijskih barkodova za artikle, skladišta i inventar."),
      category: "generatori",
      categoryLabel: t("nav.generators", "GENERATORI"),
      to: "/category/generatori?tab=barcode",
      icon: Barcode,
      keywords: ["barkod", "barcode", "ean", "code128", "artikal", "skener"],
    },

    // --- KALKULATORI ---
    {
      id: "calc-gorivo",
      titleKey: "calculator.gorivo",
      title: t("calculator.gorivo", "Kalkulator potrošnje goriva"),
      description: t("search.gorivoDesc", "Izračunajte troškove puta, potrošnju na 100 km i cijenu po putniku."),
      category: "kalkulatori",
      categoryLabel: t("nav.calculators", "KALKULATORI"),
      to: "/kalkulatori/gorivo",
      icon: Flame,
      keywords: ["gorivo", "benzin", "dizel", "auto", "potrosnja", "put", "troskovi", "fuel"],
      badge: "Preporučeno",
    },
    {
      id: "calc-pdv",
      titleKey: "calculator.pdv",
      title: t("calculator.pdv", "PDV Kalkulator 17% (BiH)"),
      description: t("search.pdvDesc", "Brzi obračun osnovice, iznosa PDV-a i ukupne cijene po stopi u BiH."),
      category: "kalkulatori",
      categoryLabel: t("nav.calculators", "KALKULATORI"),
      to: "/kalkulatori/pdv",
      icon: Percent,
      keywords: ["pdv", "porez", "17", "bih", "faktura", "cijena", "osnovica", "vat", "tax"],
      badge: "17% BiH",
    },
    {
      id: "calc-staz",
      titleKey: "calculator.staz",
      title: t("calculator.staz", "Kalkulator radnog staža"),
      description: t("search.stazDesc", "Zbir godina, mjeseci i dana radnog staža iz više radnih odnosa."),
      category: "kalkulatori",
      categoryLabel: t("nav.calculators", "KALKULATORI"),
      to: "/kalkulatori/staz",
      icon: Calendar,
      keywords: ["staz", "posao", "penzija", "godine", "rad", "radni odnos"],
    },
    {
      id: "calc-struja",
      titleKey: "calculator.struja",
      title: t("calculator.struja", "Kalkulator potrošnje struje"),
      description: t("search.strujaDesc", "Procjena troškova električne energije kućanskih aparata po kilovat-satu."),
      category: "kalkulatori",
      categoryLabel: t("nav.calculators", "KALKULATORI"),
      to: "/kalkulatori/struja",
      icon: Zap,
      keywords: ["struja", "kwh", "kilovat", "strujomjer", "aparat", "elektricna energija", "electricity"],
    },
    {
      id: "calc-all",
      titleKey: "calculator.all",
      title: t("calculator.all", "Svi kalkulatori"),
      description: t("search.allCalculatorsDesc", "Pregled svih praktičnih i finansijskih kalkulatora prilagođenih za BiH."),
      category: "kalkulatori",
      categoryLabel: t("nav.calculators", "KALKULATORI"),
      to: "/category/kalkulatori",
      icon: Calculator,
      keywords: ["kalkulatori", "svi kalkulatori", "finansije", "racun", "izracun"],
      badge: "Kalkulatori",
    },

    // --- TESTOVI ---
    {
      id: "test-kviz",
      titleKey: "testers.quiz",
      title: t("testers.quiz", "Kviz opšteg znanja o BiH"),
      description: t("search.quizDesc", "Testirajte znanje iz geografije, historije, kulture i sporta Bosne i Hercegovine."),
      category: "testovi",
      categoryLabel: t("nav.tests", "TESTOVI"),
      to: "/testovi/opste-znanje",
      icon: ClipboardCheck,
      keywords: ["kviz", "znanje", "bih", "pitanja", "geografija", "historija", "test"],
      badge: "Kviz",
    },
    {
      id: "test-saobracaj",
      titleKey: "testers.traffic",
      title: t("testers.traffic", "Saobraćajni test (Vozački ispit)"),
      description: t("search.trafficDesc", "Vježbajte pitanja iz saobraćajnih propisa i znakova za polaganje ispita."),
      category: "testovi",
      categoryLabel: t("nav.tests", "TESTOVI"),
      to: "/testovi/saobracajni",
      icon: ClipboardCheck,
      keywords: ["saobracaj", "vozacki", "ispit", "znakovi", "propisi", "auto", "test"],
    },
    {
      id: "test-logika",
      titleKey: "testers.logic",
      title: t("testers.logic", "IQ & Logički test"),
      description: t("search.logicDesc", "Logički zadaci, nizovi i prostorno razmišljanje sa bodovanjem."),
      category: "testovi",
      categoryLabel: t("nav.tests", "TESTOVI"),
      to: "/testovi/logika",
      icon: ClipboardCheck,
      keywords: ["iq", "logika", "inteligncija", "zadaci", "razmisljanje"],
    },
    {
      id: "test-licnost",
      titleKey: "testers.personality",
      title: t("testers.personality", "Test ličnosti"),
      description: t("search.personalityDesc", "Saznajte svoje dominantne karakterne osobine i stil komunikacije."),
      category: "testovi",
      categoryLabel: t("nav.tests", "TESTOVI"),
      to: "/testovi/licnost",
      icon: ClipboardCheck,
      keywords: ["licnost", "karakter", "psihologija", "test"],
    },

    // --- BLOG & VODIČI ---
    {
      id: "info-blog",
      titleKey: "nav.blog",
      title: t("nav.blog", "Blog & Edukativni vodiči"),
      description: t("search.blogDesc", "Praktični članci o MP4, DOCX, HEIC, kalkulatorima i digitalnim vještinama."),
      category: "info",
      categoryLabel: t("nav.blog", "BLOG"),
      to: "/blog",
      icon: BookOpen,
      keywords: ["blog", "clanci", "vodici", "uputstva", "mp4", "docx", "heic", "savjeti"],
    },
  ], [t, currentLang]);

  // Global hotkey listener: Ctrl+K or Cmd+K or / to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter tools based on query and category
  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTools.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const catMatch = item.categoryLabel.toLowerCase().includes(q);
      const keywordMatch = item.keywords.some((k) => k.toLowerCase().includes(q));

      return titleMatch || descMatch || catMatch || keywordMatch;
    });
  }, [allTools, query, selectedCategory]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredTools.length, selectedCategory]);

  const handleSelect = useCallback((item: SearchToolItem) => {
    setOpen(false);
    setQuery("");
    navigate(item.to);
  }, [navigate]);

  // Handle keyboard navigation inside the list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredTools.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredTools.length - 1));
    } else if (e.key === "Enter" && filteredTools[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredTools[selectedIndex]);
    }
  };

  const categories = [
    { id: "all", label: t("search.allCategories", "Sve kategorije"), image: null },
    { id: "konvertori", label: t("nav.converters", "Konvertori"), image: "/categories/konvertori.png" },
    { id: "generatori", label: t("nav.generators", "Generatori"), image: "/categories/generatori.png" },
    { id: "kalkulatori", label: t("nav.calculators", "Kalkulatori"), image: "/categories/kalkulatori.png" },
    { id: "testovi", label: t("nav.tests", "Testovi"), image: "/categories/testovi.png" },
    { id: "info", label: t("nav.blog", "Blog & Info"), image: "/categories/blog.png" },
  ];

  return (
    <>
      {variant === "full" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between gap-2.5 rounded-xl border border-border/80 bg-card/80 px-3.5 py-2.5 text-xs text-muted-foreground hover:bg-muted/70 hover:border-primary/40 transition-all shadow-xs"
          aria-label={t("search.openSearch", "Pretraži alate")}
        >
          <span className="flex items-center gap-2.5 text-foreground/80 font-medium">
            <Search className="h-4 w-4 text-primary" />
            <span>{t("search.placeholderShort", "Pretraži alate...")}</span>
          </span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
            Ctrl+K
          </kbd>
        </button>
      ) : (
        <>
          {/* 1. Desktop Trigger Button in Navbar */}
          {/* 1. Desktop / Tablet Trigger Search Bar in Navbar */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hidden sm:flex w-full items-center justify-between gap-2.5 rounded-xl border border-border/80 bg-muted/40 hover:bg-muted/70 px-3.5 py-2 text-xs text-muted-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/50 shadow-xs group"
            aria-label={t("search.openSearch", "Pretraži generatore, konvertore i kalkulatore")}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Search className="h-4 w-4 text-primary shrink-0 transition-transform group-hover:scale-110" />
              <span className="font-medium text-foreground/80 truncate">
                {t("search.navbarPlaceholder", "Pretraži generatore, konvertore, kalkulatore...")}
              </span>
            </div>
            <kbd className="pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-semibold text-muted-foreground shadow-xs shrink-0">
              <span className="text-[11px]">⌘</span>K
            </kbd>
          </button>

          {/* 2. Mobile Trigger Icon Button in Navbar */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex sm:hidden items-center justify-center h-9 w-9 rounded-md border border-border/60 bg-card/60 text-foreground hover:bg-muted transition-colors"
            aria-label={t("search.openSearch", "Pretraži alate")}
          >
            <Search className="h-4 w-4 text-primary" />
          </button>
        </>
      )}

      {/* 3. Global Search Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden border-border bg-card shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{t("search.title", "Pretraga alata i kalkulatora")}</DialogTitle>
          </DialogHeader>

          {/* Search Input Bar */}
          <div className="flex items-center border-b border-border/80 px-4 py-3 bg-card/90">
            <Search className="h-5 w-5 text-primary shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("search.inputPlaceholder", "Upišite naziv alata (npr. valute, gorivo, PDV, QR kod, PDF)...")}
              className="flex-1 bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Poništi pretragu"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border/50 bg-muted/30 overflow-x-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat.image && <img src={cat.image} alt="" className="h-3.5 w-3.5 object-contain" />}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Results List */}
          <div
            ref={listRef}
            className="max-h-[380px] overflow-y-auto p-2 divide-y divide-border/20"
          >
            {filteredTools.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground space-y-2">
                <Search className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-sm font-medium text-foreground">{t("search.noResults", "Nema pronađenih alata za traženi pojam.")}</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  {t("search.noResultsSub", "Pokušajte sa sinonimima kao što su 'valuta', 'pdf', 'kalkulator' ili odaberite drugu kategoriju.")}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredTools.map((item, idx) => {
                  const IconComponent = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-primary/10 text-foreground border border-primary/20"
                          : "hover:bg-muted/60 text-foreground/90"
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 pr-2">
                        <div className={`p-2 rounded-md shrink-0 mt-0.5 ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                        }`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-foreground truncate">
                              {item.title}
                            </h4>
                            {item.badge && (
                              <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-semibold rounded bg-accent/20 text-accent-foreground border border-accent/30">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-medium text-muted-foreground px-2 py-0.5 rounded bg-muted/60 border border-border/40 hidden sm:inline-block">
                          {item.categoryLabel}
                        </span>
                        <ArrowRight className={`h-4 w-4 transition-transform ${
                          isSelected ? "text-primary translate-x-1" : "text-muted-foreground/40"
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Shortcuts Info */}
          <div className="px-4 py-2 border-t border-border/70 bg-muted/40 flex items-center justify-between text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <kbd className="px-1 rounded bg-card border border-border">↑</kbd>
                <kbd className="px-1 rounded bg-card border border-border">↓</kbd>
                <span>{t("search.navigate", "kretanje")}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="px-1.5 rounded bg-card border border-border">↵</kbd>
                <span>{t("search.open", "otvori")}</span>
              </span>
            </div>
            <span>
              <kbd className="px-1.5 rounded bg-card border border-border">ESC</kbd> {t("search.close", "zatvori")}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GlobalSearch;
