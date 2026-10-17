import { useState, useEffect, useRef, useMemo } from "react";
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
import { useLanguage, normalizeLanguageCode } from "@/hooks/useLanguage";
import { latinToCyrillic } from "@/utils/scriptText";

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

const BASE_SLIDES: GuideSlide[] = [
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

const SLIDE_TRANSLATIONS: Record<string, Record<string, Partial<GuideSlide>>> = {
  en: {
    documents: {
      badge: "1. Step by step",
      title: "How to Convert PDF to Word or Merge Documents",
      subtitle: "Complete everyday document tasks in just 3 clicks",
      description: "BH KONVER offers unique dual technology: private client-side conversion in your browser or advanced PRO processing for scanned documents.",
      steps: [
        { number: "01", title: "Select your file", desc: "Drag and drop PDF, Word (DOCX), or Excel files directly into the upload area." },
        { number: "02", title: "Choose desired format", desc: "Select Word, clean PDF, merging multiple pages, or extracting text." },
        { number: "03", title: "Download finished file", desc: "Conversion is instantaneous — click 'Download' and keep working without delays." },
      ],
      highlight: "100% Privacy: Client-side tools never upload your files to any server.",
      ctaText: "Try PDF & Word Tools",
    },
    images: {
      badge: "2. Images & Mobile Formats",
      title: "Convert iPhone HEIC Photos to Universal JPG or PDF",
      subtitle: "Say goodbye to unsupported formats on application forms",
      description: "Photos from modern iPhones (.heic) are frequently rejected by Windows PCs and job portals. With BH KONVER, conversion takes seconds.",
      steps: [
        { number: "01", title: "Upload HEIC or WebP", desc: "Choose one or more photos directly from your phone gallery or PC." },
        { number: "02", title: "Choose JPG or merged PDF", desc: "Save each photo as a JPG or combine them all into a neat PDF document." },
        { number: "03", title: "Share with confidence", desc: "The converted file is guaranteed to open on all Windows computers and mobile devices." },
      ],
      highlight: "Optimized for students, job applications, and official document submissions.",
      ctaText: "Convert HEIC to JPG / PDF",
    },
    calculators: {
      badge: "3. Finance & Taxes",
      title: "Smart Calculators Tailored for Bosnia & Herzegovina",
      subtitle: "Calculate 17% VAT, work tenure, fuel costs, and electricity",
      description: "No need for complicated Excel sheets. All calculators are pre-programmed with official tax rates and prices in convertible marks (KM).",
      steps: [
        { number: "01", title: "17% VAT Calculator", desc: "Instantly calculate net base price or extract VAT from gross retail totals." },
        { number: "02", title: "Fuel Cost Calculator", desc: "Enter distance and your car's fuel consumption for accurate trip expense estimation." },
        { number: "03", title: "Tenure & Electricity", desc: "Sum years, months, and days of employment, or estimate individual appliance electricity costs." },
      ],
      highlight: "Always accurate calculations in KM, customized for citizens and businesses.",
      ctaText: "Open BiH Calculators",
    },
    tests: {
      badge: "4. Education & Quizzes",
      title: "Practice Driving Theory & General Knowledge Quizzes",
      subtitle: "Interactive driving license practice tests and cultural quizzes",
      description: "Practice traffic questions with rich intersection illustrations and scoring matching official standards in Bosnia and Herzegovina.",
      steps: [
        { number: "01", title: "Choose test category", desc: "Driving exam quiz, BiH history & culture, IQ logic puzzle, or personality test." },
        { number: "02", title: "Solve questions step by step", desc: "Intuitive touch answers with instant feedback on correctness." },
        { number: "03", title: "Review results & score", desc: "Check your pass percentage, score breakdown, and explanations for mistakes." },
      ],
      highlight: "Perfect for driving school students and anyone refreshing road regulations.",
      ctaText: "Start Traffic Practice Test",
    },
    generators: {
      badge: "5. Business & Hospitality",
      title: "Permanent QR Codes & Barcodes for Your Business",
      subtitle: "Create digital menus, Wi-Fi access, and inventory barcodes without expiration",
      description: "Forget about services charging expensive monthly subscriptions. BH KONVER creates permanent static codes in high resolution.",
      steps: [
        { number: "01", title: "Enter your details", desc: "Link to PDF menu, Wi-Fi network credentials, phone number, or digital business card." },
        { number: "02", title: "Customize appearance", desc: "Generate a high-contrast PNG code ready for printing on table stands or packaging." },
        { number: "03", title: "Download and keep forever", desc: "The code never expires and customers can scan it unlimited times." },
      ],
      highlight: "100% free for restaurant owners, small shops, cafes, and developers.",
      ctaText: "Create Free QR Code",
    },
  },
  de: {
    documents: {
      badge: "1. Schritt für Schritt",
      title: "Wie man PDF in Word umwandelt oder Dokumente zusammenfügt",
      subtitle: "Alltägliche Dokumentaufgaben in nur 3 Klicks erledigen",
      description: "BH KONVER bietet duale Technologie: private browserbasierte Konvertierung oder PRO-Verarbeitung für gescannte Dokumente.",
      steps: [
        { number: "01", title: "Datei auswählen", desc: "PDF, Word (DOCX) oder Excel per Drag & Drop in den Bereich ziehen." },
        { number: "02", title: "Format wählen", desc: "Word, PDF, Zusammenfügen mehrerer Seiten oder Textextraktion wählen." },
        { number: "03", title: "Fertige Datei herunterladen", desc: "Sekundenschnell konvertiert — auf 'Herunterladen' klicken und weiterarbeiten." },
      ],
      highlight: "100% Vertraulichkeit: Lokale Tools übertragen keine Dateien an Server.",
      ctaText: "PDF & Word Tools testen",
    },
    images: {
      badge: "2. Bilder & Mobile Formate",
      title: "iPhone HEIC Bilder in universelles JPG oder PDF umwandeln",
      subtitle: "Schluss mit nicht unterstützten Formaten bei Bewerbungen",
      description: "Fotos neuerer iPhones (.heic) werden unter Windows oft nicht erkannt. Mit BH KONVER klappt die Umwandlung in Sekunden.",
      steps: [
        { number: "01", title: "HEIC hochladen", desc: "Fotos direkt aus der Galerie oder vom Computer auswählen." },
        { number: "02", title: "JPG oder PDF wählen", desc: "Fotos als JPG speichern oder zu einem sauberen PDF zusammenfügen." },
        { number: "03", title: "Sicher teilen", desc: "Die fertige Datei lässt sich garantiert auf allen Geräten öffnen." },
      ],
      highlight: "Optimiert für Studenten, Jobbewerbungen und Behördendokumente.",
      ctaText: "HEIC in JPG / PDF konvertieren",
    },
    calculators: {
      badge: "3. Finanzen & Steuern",
      title: "Smarte Rechner für Bosnien und Herzegowina",
      subtitle: "17% MwSt., Dienstjahre, Spritverbrauch und Strom berechnen",
      description: "Keine komplizierten Excel-Formeln nötig. Alle Rechner sind mit offiziellen Steuersätzen in Konvertiblen Mark (KM) programmiert.",
      steps: [
        { number: "01", title: "17% MwSt. Rechner", desc: "Nettobasis berechnen oder MwSt. aus dem Bruttobetrag herausrechnen." },
        { number: "02", title: "Spritkosten-Rechner", desc: "Entfernung und Verbrauch für eine exakte Kostenschätzung eingeben." },
        { number: "03", title: "Dienstjahre & Strom", desc: "Arbeitsjahre summieren und Stromkosten einzelner Haushaltsgeräte berechnen." },
      ],
      highlight: "Immer exakte Berechnungen in KM für Bürger und Unternehmer.",
      ctaText: "BiH Rechner öffnen",
    },
    tests: {
      badge: "4. Bildung & Tests",
      title: "Verkehrsregeln und Allgemeinwissen üben",
      subtitle: "Interaktive Vorbereitung auf die theoretische Fahrprüfung",
      description: "Üben Sie Prüfungsfragen mit Kreuzungsgrafiken nach offiziellen Standards in Bosnien und Herzegowina.",
      steps: [
        { number: "01", title: "Test wählen", desc: "Verkehrstest, BiH Kultur & Geschichte, IQ-Logik oder Persönlichkeitstest." },
        { number: "02", title: "Schritt für Schritt lösen", desc: "Intuitive Antworten mit sofortiger Auswertung der Richtigkeit." },
        { number: "03", title: "Ergebnisse einsehen", desc: "Punktzahl, Bestehensquote und Erklärungen zu falschen Antworten prüfen." },
      ],
      highlight: "Perfekt für Fahrschüler und alle, die Verkehrsregeln auffrischen möchten.",
      ctaText: "Verkehrstest starten",
    },
    generators: {
      badge: "5. Wirtschaft & Gastronomie",
      title: "Dauerhafte QR-Codes und Barcodes für Ihr Unternehmen",
      subtitle: "Digitale Speisekarten, WLAN-Zugang und Barcodes ohne Ablaufdatum",
      description: "Vergessen Sie Dienste mit teuren Monatsabos. BH KONVER erstellt dauerhafte statische Codes in voller Auflösung.",
      steps: [
        { number: "01", title: "Daten eingeben", desc: "Link zur Speisekarte, WLAN-Passwort oder Kontaktdaten eingeben." },
        { number: "02", title: "Design anpassen", desc: "Druckfertigen PNG-Code mit hohem Kontrast für Tische oder Verpackungen erstellen." },
        { number: "03", title: "Dauerhaft nutzen", desc: "Der Code läuft niemals ab und kann unbegrenzt oft gescannt werden." },
      ],
      highlight: "Kostenlos für Gastronomie, Kleinunternehmen und Entwickler.",
      ctaText: "Kostenlosen QR-Code erstellen",
    },
  },
  tr: {
    documents: {
      badge: "1. Adım Adım",
      title: "PDF'i Word'e Dönüştürme veya Belgeleri Birleştirme",
      subtitle: "Günlük belge görevlerini sadece 3 tıklamada tamamlayın",
      description: "BH KONVER çift teknoloji sunar: tarayıcınızda gizli yerel dönüşüm veya taranmış belgeler için gelişmiş PRO işleme.",
      steps: [
        { number: "01", title: "Dosya seçin", desc: "PDF, Word (DOCX) veya Excel dosyasını yükleme alanına sürükleyin." },
        { number: "02", title: "İstediğiniz formatı seçin", desc: "Word, temiz PDF, sayfa birleştirme veya metin çıkarma seçeneğini belirleyin." },
        { number: "03", title: "Dosyayı indirin", desc: "Dönüşüm anında tamamlanır — 'İndir' butonuna tıklayarak devam edin." },
      ],
      highlight: "%100 Gizlilik: Yerel araçlar dosyalarınızı hiçbir sunucuya yüklemez.",
      ctaText: "PDF & Word Araçlarını Dene",
    },
    images: {
      badge: "2. Resimler & Mobil Formatlar",
      title: "iPhone HEIC Fotoğraflarını Evrensel JPG veya PDF'e Dönüştürün",
      subtitle: "Form ve başvurularda desteklenmeyen format sorununa son verin",
      description: "Yeni iPhone cihazlarındaki fotoğraflar (.heic) Windows bilgisayarlarda sıkça açılamaz. BH KONVER ile saniyeler içinde dönüştürün.",
      steps: [
        { number: "01", title: "HEIC yükleyin", desc: "Galerinizden veya bilgisayarınızdan fotoğrafları seçin." },
        { number: "02", title: "JPG veya PDF seçin", desc: "Her resmi JPG olarak kaydedin veya hepsini tek bir PDF'te birleştirin." },
        { number: "03", title: "Güvenle paylaşın", desc: "Oluşturulan dosya tüm bilgisayar ve telefonlarda sorunsuz açılır." },
      ],
      highlight: "Öğrenciler, iş başvuruları ve resmi evrak gönderimleri için optimize edilmiştir.",
      ctaText: "HEIC'i JPG / PDF'e Dönüştür",
    },
    calculators: {
      badge: "3. Finans & Vergiler",
      title: "Bosna-Hersek İçin Akıllı Hesaplayıcılar",
      subtitle: "%17 KDV, çalışma süresi, yakıt tüketimi ve elektrik hesabı",
      description: "Karmaşık Excel formüllerine gerek yok. Tüm hesaplayıcılar resmi oranlarla ve Konvertibl Mark (KM) para birimiyle hazırlandı.",
      steps: [
        { number: "01", title: "%17 KDV Hesaplayıcı", desc: "Matrahı hesaplayın veya brüt tutardan KDV'yi anında ayırın." },
        { number: "02", title: "Yakıt Maliyet Hesabı", desc: "Yolculuk maliyetini tam olarak öğrenmek için mesafe ve tüketimi girin." },
        { number: "03", title: "Hizmet Süresi & Elektrik", desc: "Hizmet yıllarını toplayın veya ev aletlerinin elektrik tüketimini hesaplayın." },
      ],
      highlight: "Vatandaşlar ve işletmeler için KM cinsinden her zaman doğru hesaplamalar.",
      ctaText: "BH Hesaplayıcıları Aç",
    },
    tests: {
      badge: "4. Eğitim & Testler",
      title: "Trafik Kuralları ve Genel Kültür Testleri Pratiği",
      subtitle: "Teorik ehliyet sınavına ve bilgi testlerine etkileşimli hazırlık",
      description: "Bosna-Hersek resmi standartlarına uygun kavşak görselleri ve puanlama ile trafik sorularını çözün.",
      steps: [
        { number: "01", title: "Test kategorisini seçin", desc: "Ehliyet sınavı, BH tarihi ve kültürü, IQ mantık testi veya kişilik testi." },
        { number: "02", title: "Adım adım soruları yanıtlayın", desc: "Doğruluk hakkında anında geri bildirim içeren dokunmatik yanıtlar." },
        { number: "03", title: "Sonuçları inceleyin", desc: "Puanınızı, başarı yüzdenizi ve yanlış soruların açıklamalarını görün." },
      ],
      highlight: "Sürücü adayları ve trafik kurallarını tazelemek isteyen herkes için idealdir.",
      ctaText: "Trafik Testini Başlat",
    },
    generators: {
      badge: "5. İş & Restorancılık",
      title: "İşletmeniz İçin Kalıcı QR Kodlar ve Barkodlar",
      subtitle: "Dijital menüler, Wi-Fi erişimi ve süresiz barkodlar oluşturun",
      description: "Aylık abonelik talep eden pahalı servisleri unutun. BH KONVER yüksek çözünürlüklü süresiz statik kodlar üretir.",
      steps: [
        { number: "01", title: "Bilgileri girin", desc: "PDF menü linki, Wi-Fi adı ve şifresi veya iletişim kartı ekleyin." },
        { number: "02", title: "Görünümü özelleştirin", desc: "Masalar veya ambalajlar için baskıya hazır yüksek kontrastlı PNG kodu oluşturun." },
        { number: "03", title: "İndirin ve sonsuza kadar kullanın", desc: "Kodun son kullanma tarihi yoktur ve sınırsız sayıda taranabilir." },
      ],
      highlight: "Restoranlar, küçük işletmeler, kafeler ve yazılımcılar için tamamen ücretsizdir.",
      ctaText: "Ücretsiz QR Kod Oluştur",
    },
  },
};

export function HowToUseCarousel() {
  const { language, t } = useLanguage();
  const currentLang = normalizeLanguageCode(language);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute localized slides dynamically
  const slides: GuideSlide[] = useMemo(() => {
    const isCyrillic = currentLang === "bs-Cyrl";
    const langKey = currentLang.startsWith("en")
      ? "en"
      : currentLang.startsWith("de")
      ? "de"
      : currentLang.startsWith("tr")
      ? "tr"
      : null;

    return BASE_SLIDES.map((slide) => {
      let localized = { ...slide };

      if (langKey && SLIDE_TRANSLATIONS[langKey]?.[slide.id]) {
        localized = { ...localized, ...SLIDE_TRANSLATIONS[langKey][slide.id] };
      } else if (isCyrillic) {
        localized = {
          ...localized,
          badge: latinToCyrillic(localized.badge),
          title: latinToCyrillic(localized.title),
          subtitle: latinToCyrillic(localized.subtitle),
          description: latinToCyrillic(localized.description),
          steps: localized.steps.map((s) => ({
            ...s,
            title: latinToCyrillic(s.title),
            desc: latinToCyrillic(s.desc),
          })),
          highlight: latinToCyrillic(localized.highlight),
          ctaText: latinToCyrillic(localized.ctaText),
        };
      }

      return localized;
    });
  }, [currentLang]);

  const activeSlide = slides[currentIndex] || slides[0];

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
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
              {t("blog.howToUseTitle", "Kako koristiti BH KONVER")}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t("blog.howToUseSubtitle", "Brzi interaktivni vodič kroz ključne funkcije platforme")}
            </p>
          </div>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-card/80 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title={isPlaying ? "Pauziraj rotaciju" : "Nastavi rotaciju"}
            aria-label={isPlaying ? "Pauziraj rotaciju" : "Nastavi rotaciju"}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-card/80 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Prethodni vodič"
            aria-label="Prethodni vodič"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-xs font-semibold tabular-nums text-foreground/80">
            {currentIndex + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-card/80 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Sljedeći vodič"
            aria-label="Sljedeći vodič"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="relative z-10 pt-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Icon className="h-3.5 w-3.5" />
              <span>{activeSlide.badge}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
              {activeSlide.title}
            </h3>

            <p className="text-sm font-medium text-primary/90">
              {activeSlide.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {activeSlide.description}
            </p>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-foreground/90 flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
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
          <div className="lg:col-span-7 grid gap-3.5 sm:grid-cols-3">
            {activeSlide.steps.map((step, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-background/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    {step.number}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-display text-sm font-bold text-foreground mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress navigation tabs */}
      <div className="relative z-10 mt-8 pt-5 border-t border-border/50">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
          {slides.map((slide, idx) => {
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

export default HowToUseCarousel;
