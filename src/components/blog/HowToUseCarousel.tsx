import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Image as ImageIcon,
  Calculator,
  GraduationCap,
  QrCode,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface GuideSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  steps: { number: string; title: string; desc: string }[];
  highlight: string;
  ctaText: string;
  ctaLink: string;
  icon: typeof FileText;
  themeColor: string;
  bgGradient: string;
}

const SLIDES: GuideSlide[] = [
  {
    id: "documents",
    badge: "1. Korak po korak",
    title: "Kako pretvoriti PDF u Word ili spojiti dokumente",
    subtitle: "Riješite svakodnevne zadatke s dokumentima u samo 3 klika",
    description:
      "BH KONVER nudi jedinstvenu dvostruku tehnologiju: brzu privatnu klijentsku konverziju u vašem pregledniku ili naprednu PRO obradu skeniranih dokumenata.",
    steps: [
      {
        number: "01",
        title: "Izaberite fajl",
        desc: "Prevucite PDF, Word (DOCX) ili Excel datoteku direktno u zonu za učitavanje.",
      },
      {
        number: "02",
        title: "Odaberite željeni format",
        desc: "Izaberite hoćete li Word, čist PDF, spajanje više stranica ili vađenje teksta.",
      },
      {
        number: "03",
        title: "Preuzmite gotov fajl",
        desc: "Konverzija je trenutna — kliknite 'Preuzmi' i nastavite raditi bez čekanja.",
      },
    ],
    highlight: "100% povjerljivost: Lokalni alati ne šalju dokumente na server.",
    ctaText: "Isprobajte PDF i Word alate",
    ctaLink: "/alati",
    icon: FileText,
    themeColor: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
  {
    id: "images",
    badge: "2. Slike & Mobilni formati",
    title: "Pretvorite iPhone HEIC slike u univerzalni JPG ili PDF",
    subtitle: "Kraj problemima s nepodržanim formatima za konkurse i obrasce",
    description:
      "Slike sa novijih iPhone i iPad uređaja (.heic) domaći web portali i Windows računari često ne prepoznaju. Uz BH KONVER, transformacija je gotova za nekoliko sekundi.",
    steps: [
      {
        number: "01",
        title: "Učitajte HEIC ili WebP",
        desc: "Odaberite jednu ili više fotografija direktno iz galerije telefona ili računara.",
      },
      {
        number: "02",
        title: "Odaberite JPG ili spajanje u PDF",
        desc: "Možete sačuvati svaku sliku kao JPG ili ih sve spojiti u jedan uredan PDF fajl.",
      },
      {
        number: "03",
        title: "Pošaljite bez brige",
        desc: "Dobijeni fajl garantovano se otvara na svim Windows računarima, telefonima i portalima.",
      },
    ],
    highlight: "Optimizovano za studente, prijavu za posao i slanje ličnih dokumenata.",
    ctaText: "Konvertujte HEIC u JPG / PDF",
    ctaLink: "/slika-pdf",
    icon: ImageIcon,
    themeColor: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    id: "calculators",
    badge: "3. Finansije & Zakoni",
    title: "Pametni kalkulatori prilagođeni tržištu BiH",
    subtitle: "Proračun PDV-a od 17%, radnog staža, potrošnje goriva i struje",
    description:
      "Nema potrebe za komplikovanim formulama u Excelu. Svi kalkulatori su unaprijed programirani sa zvaničnim stopama i cijenama u konvertibilnim markama (KM).",
    steps: [
      {
        number: "01",
        title: "PDV Kalkulator 17%",
        desc: "Trenutno izračunajte osnovicu ili izdvojite PDV iz ukupnog iznosa uz formulu preračunate stope.",
      },
      {
        number: "02",
        title: "Kalkulator goriva u KM",
        desc: "Unesite razdaljinu i potrošnju vašeg automobila za tačnu procjenu troška putovanja.",
      },
      {
        number: "03",
        title: "Radni staž i električna energija",
        desc: "Zbir godina, mjeseci i dana rada, te procjena troška pojedinih kućnih aparata.",
      },
    ],
    highlight: "Uvijek tačni proračuni u KM, prilagođeni lokalnim potrebama građana i privrednika.",
    ctaText: "Otvorite BiH kalkulatore",
    ctaLink: "/category/kalkulatori",
    icon: Calculator,
    themeColor: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    id: "tests",
    badge: "4. Edukacija & Znanje",
    title: "Vježbajte saobraćajne propise i testove znanja",
    subtitle: "Interaktivna priprema za vozački ispit i provjera opšteg znanja",
    description:
      "Vježbajte pitanja iz saobraćaja s detaljnim ilustracijama raskrsnica i bodovanjem prema zvaničnim standardima u Bosni i Hercegovini.",
    steps: [
      {
        number: "01",
        title: "Izaberite vrstu testa",
        desc: "Saobraćajni test, opšte znanje o kulturi i historiji BiH, IQ logika ili test ličnosti.",
      },
      {
        number: "02",
        title: "Rješavajte pitanja korak po korak",
        desc: "Intuitivni odgovori na dodir s trenutnom povratnom informacijom o tačnosti.",
      },
      {
        number: "03",
        title: "Analiza rezultata",
        desc: "Pogledajte svoj bodovni saldo, procenat prolaznosti i objašnjenja za netačne odgovore.",
      },
    ],
    highlight: "Savršeno za kandidate autoškola i sve koji žele obnoviti poznavanje propisa.",
    ctaText: "Pokrenite saobraćajni test",
    ctaLink: "/testovi/saobracajni",
    icon: GraduationCap,
    themeColor: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
  {
    id: "generators",
    badge: "5. Za posao & Ugostiteljstvo",
    title: "Trajni QR kodovi i barkodovi za vaše poslovanje",
    subtitle: "Kreirajte digitalne menije, Wi-Fi pristup i barkodove bez isteka",
    description:
      "Zaboravite na servise koji vam traže pretplatu nakon 14 dana. BH KONVER generatori kreiraju statične i trajne kodove u punoj rezoluciji.",
    steps: [
      {
        number: "01",
        title: "Unesite podatke",
        desc: "Link na PDF cjenovnik, naziv i lozinku za Wi-Fi, broj telefona ili kontakt karticu.",
      },
      {
        number: "02",
        title: "Prilagodite izgled",
        desc: "Generišite visoko-kontrastni kod u PNG formatu spreman za štampu na stalcima ili ambalaži.",
      },
      {
        number: "03",
        title: "Preuzmite i koristite zauvijek",
        desc: "Kod nema rok trajanja i vaši gosti ga mogu skenirati neograničen broj puta.",
      },
    ],
    highlight: "Besplatno za ugostitelje, male biznise, trgovine i programere.",
    ctaText: "Napravite besplatan QR kod",
    ctaLink: "/category/generatori?tab=qr",
    icon: QrCode,
    themeColor: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
];

export function HowToUseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlide = SLIDES[currentIndex];

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const Icon = activeSlide.icon;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/70 p-6 sm:p-8 lg:p-10 shadow-xl backdrop-blur-xl">
      {/* Background ambient glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${activeSlide.bgGradient} opacity-50 transition-all duration-700 pointer-events-none`}
      />

      {/* Header bar with controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
              Kako koristiti BH KONVER
            </h2>
            <p className="text-xs text-muted-foreground">
              Brzi interaktivni vodič kroz ključne funkcije platforme
            </p>
          </div>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card/80 text-muted-foreground hover:text-foreground transition-colors"
            title={isPlaying ? "Pauziraj rotaciju" : "Pokreni rotaciju"}
            aria-label={isPlaying ? "Pauziraj rotaciju" : "Pokreni rotaciju"}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card/80 text-muted-foreground hover:text-foreground transition-colors"
            title="Prethodni korak"
            aria-label="Prethodni korak"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-xs font-semibold tabular-nums text-muted-foreground">
            {currentIndex + 1} / {SLIDES.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card/80 text-muted-foreground hover:text-foreground transition-colors"
            title="Sljedeći korak"
            aria-label="Sljedeći korak"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="relative z-10 pt-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Info & Action */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Icon className="h-3.5 w-3.5" />
              <span>{activeSlide.badge}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {activeSlide.title}
            </h3>

            <p className="text-sm sm:text-base font-medium text-foreground/80">
              {activeSlide.subtitle}
            </p>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {activeSlide.description}
            </p>

            <div className="flex items-center gap-2 rounded-xl border border-primary/15 bg-primary/5 p-3 text-xs text-primary">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>{activeSlide.highlight}</span>
            </div>

            <div className="pt-2">
              <Link
                to={activeSlide.ctaLink}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:gap-3"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Steps Cards */}
          <div className="lg:col-span-7 grid gap-3 sm:grid-cols-3">
            {activeSlide.steps.map((step) => (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card/90 p-4 sm:p-5 shadow-sm transition-all hover:border-primary/40 hover:bg-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                      KORAK {step.number}
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="font-display text-sm font-bold text-foreground mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress navigation tabs */}
      <div className="relative z-10 mt-8 pt-5 border-t border-border/50">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
          {SLIDES.map((slide, idx) => {
            const SlideIcon = slide.icon;
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(false);
                }}
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/60 bg-card/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                <SlideIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{slide.badge.replace(/^\d+\.\s*/, "")}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
