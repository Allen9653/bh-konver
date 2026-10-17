import { BlogArticle } from "./blogPosts";
import { latinToCyrillic } from "@/utils/scriptText";

// Translated metadata, summaries, and full content for all 8 active articles
export const BLOG_TRANSLATIONS: Record<
  string, // language code ('en' | 'de' | 'tr')
  Record<
    string, // article slug
    Partial<BlogArticle>
  >
> = {
  en: {
    "formati-video-fajlova-mp4-mkv-avi": {
      title: "Video File Formats Explained: MP4, MKV, AVI and More",
      subtitle: "A comprehensive guide to containers, codecs, compression, and choosing the best format for web, mobile, and smart TV",
      excerpt: "Understand the key differences between MP4, MKV, AVI, WEBM, and MOV formats. Discover why certain videos won't play on your TV or phone and how to easily convert them.",
      category: "Video & Audio",
      badge: "In-Depth Guide",
      readTime: "7 min read",
      date: "October 14, 2026",
      seoTitle: "Video File Formats Explained: MP4 vs MKV vs AVI | BH KONVER",
      seoDescription: "Comprehensive comparison between MP4, MKV, AVI, WEBM, and MOV video formats. Learn which format to choose and how to convert video files online.",
      author: {
        name: "Alen Jusufovic",
        role: "Founder & Lead Technical Editor at BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER Video Converter",
        path: "/modul/video",
        description: "Convert MP4, MKV, AVI, and WebM video formats directly in your browser with full resolution.",
      },
      content: {
        lead: "When downloading videos online, recording clips on your smartphone, or editing footage for social media, you frequently encounter file extensions like MP4, MKV, AVI, MOV, or WebM. While all of them display moving pictures and audio, the way they package and compress internal data is remarkably different.",
        sections: [
          {
            heading: "1. Container vs Codec: The Essential Distinction",
            body: [
              "The most common misconception is confusing a video format (container) with a video codec. Think of a container as a digital box or folder. File extensions such as .mp4 or .mkv represent that box.",
              "Inside that box reside video streams, audio tracks, subtitle files, and metadata (chapter marks, language tags). A codec (e.g. H.264, HEVC/H.265, AV1, AAC) is the mathematical algorithm that compresses and decompresses the raw video and audio streams.",
              "This explains why a smart TV might support .mp4 files in general, yet refuse to play a specific MP4 file if the video inside was compressed with a newer codec the TV hardware doesn't decode."
            ],
            callout: {
              type: "info",
              title: "The Box Rule",
              text: "The container (.mp4, .mkv, .avi) determines the wrapper, while the codec (H.264, AV1) determines the compression and visual quality. Two MP4 files can contain completely different underlying codecs!"
            }
          },
          {
            heading: "2. Overview of Popular Video Formats",
            body: [
              "Each video format was engineered with specific technical goals in mind. Here is how they compare in daily use:"
            ],
            bullets: [
              "MP4 (MPEG-4 Part 14): The undisputed modern standard. Supported by virtually every device: iPhone, Android, smart TVs, YouTube, Instagram, and web browsers. Typically uses H.264 or H.265 video and AAC audio.",
              "MKV (Matroska): An open standard loved by film enthusiasts. It can bundle unlimited audio tracks (multi-language dubs), multiple subtitle formats (SRT, ASS), and chapter menus. Note: older smart TVs and native Apple players may require conversion.",
              "AVI (Audio Video Interleave): Microsoft's legacy format introduced in 1992. Popularized by DivX/Xvid in the 2000s, it is now outdated because it produces large files and lacks native streaming support.",
              "WEBM: Google's royalty-free open format designed specifically for the modern web. Driven by VP9 and AV1 codecs, it offers exceptional compression and very low bandwidth usage."
            ]
          }
        ],
        faq: [
          {
            question: "Which video format is safest for sharing and social media?",
            answer: "MP4 with H.264 video and AAC audio is universally supported on 99.9% of devices, browsers, and platforms."
          },
          {
            question: "Can I convert MKV to MP4 without losing visual quality?",
            answer: "Yes, you can easily transmux or convert video files using our free BH KONVER Video Converter tool."
          }
        ]
      }
    },
    "sta-je-docx-fajl-kako-otvoriti-bez-worda": {
      title: "What is a DOCX File and How to Open it Without Microsoft Word",
      subtitle: "Learn the secrets of Office Open XML format, Google Docs, LibreOffice, and zero-install browser solutions",
      excerpt: "Everything you need to know about .docx files. Learn how to open, edit, and convert Word documents on any PC, Mac, Linux, or mobile phone without paying for an Office license.",
      category: "Dokumenti & PDF",
      badge: "Office Guide",
      readTime: "6 min read",
      date: "October 12, 2026",
      seoTitle: "What is DOCX and How to Open Word Files Without Office | BH KONVER",
      seoDescription: "Step-by-step instructions for opening and converting DOCX files on Windows, Mac, and mobile without Microsoft Word.",
      author: {
        name: "Alen Jusufovic",
        role: "Founder & Lead Technical Editor at BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER PDF & Word Tools",
        path: "/alati",
        description: "Convert DOCX documents to PDF or extract clean text without installing software.",
      },
      content: {
        lead: "The .docx extension is the global standard for digital office documents. Yet many users struggle when trying to open important contracts, CVs, or school assignments on computers without an active Microsoft 365 subscription.",
        sections: [
          {
            heading: "1. The Anatomy of DOCX: It's Secretly a ZIP Archive",
            body: [
              "Unlike the old binary .doc format from Word 97-2003, .docx is built on Office Open XML. In fact, if you rename any .docx file to .zip and extract it, you will find clean XML files and folders with all your embedded images!"
            ]
          },
          {
            heading: "2. Free Ways to Open and Edit DOCX Files",
            bullets: [
              "Google Docs: Free cloud editing with auto-save in Google Drive.",
              "LibreOffice Writer: Free desktop open-source office suite for Windows, Mac, and Linux.",
              "BH KONVER Tools: Instantly convert DOCX to PDF or Word directly in your browser with 100% privacy."
            ]
          }
        ],
        faq: [
          {
            question: "Why should I convert my final DOCX to PDF before emailing it?",
            answer: "PDF guarantees that your fonts, page margins, and visual layout look identical on any recipient's screen or printer."
          }
        ]
      }
    },
    "sta-je-heic-fajl-kako-pretvoriti-u-jpg": {
      title: "What is HEIC on iPhone and How to Convert It to JPG on Windows",
      subtitle: "Why Apple uses High Efficiency Image Coding and how to open your photos on any device",
      excerpt: "Photos from your iPhone won't open on your Windows PC or government job portals? Discover why Apple uses .heic and how to convert them into universal JPGs in seconds.",
      category: "Slike & Formati",
      badge: "iPhone & PC",
      readTime: "5 min read",
      date: "October 10, 2026",
      seoTitle: "What is HEIC Format and How to Convert HEIC to JPG | BH KONVER",
      seoDescription: "Instant online conversion from iPhone HEIC images to universal JPG or PNG files without quality loss.",
      author: {
        name: "Alen Jusufovic",
        role: "Founder & Lead Technical Editor at BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER Image to PDF & JPG",
        path: "/slika-pdf",
        description: "Transform HEIC, WebP, and PNG photos into universal JPG or merged PDF documents.",
      },
      content: {
        lead: "If you own an iPhone or iPad, your photos are stored by default in .heic format. While this cuts storage in half while preserving color fidelity, Windows computers and job application portals frequently reject them.",
        sections: [
          {
            heading: "1. Why Apple Chose HEIC",
            body: [
              "HEIC (High Efficiency Image Container) uses the modern HEVC compression codec. It delivers superior color depth (16-bit vs JPG's 8-bit) at nearly half the file size."
            ]
          },
          {
            heading: "2. How to Convert HEIC to JPG Online",
            bullets: [
              "Upload your .heic photos to BH KONVER.",
              "Select JPG output or merge multiple images into a single clean PDF.",
              "Download your converted photos instantly with zero watermarks."
            ]
          }
        ],
        faq: [
          {
            question: "Can I make my iPhone take standard JPG photos automatically?",
            answer: "Yes, go to iPhone Settings > Camera > Formats and select 'Most Compatible' instead of 'High Efficiency'."
          }
        ]
      }
    },
    "sta-je-html-fajl-i-kako-ga-koristiti": {
      title: "What is an HTML File and How to Open or Edit It",
      subtitle: "Learn the foundational building blocks of the World Wide Web and inspect source code with ease",
      excerpt: "Discover what makes up an .html document, how browsers parse markup, and how you can edit web pages using free text editors.",
      category: "Web & Tehnologija",
      badge: "Web Basics",
      readTime: "6 min read",
      date: "October 08, 2026",
      seoTitle: "What is an HTML File and How to Edit Web Pages | BH KONVER",
      seoDescription: "Beginner-friendly guide to HTML files, tags, CSS stylesheets, and browser developer tools.",
      author: {
        name: "Alen Jusufovic",
        role: "Founder & Lead Technical Editor at BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER Text & Code Tools",
        path: "/category/konvertori?tab=script",
        description: "Work with text encodings, script transliteration, and formatted code.",
      },
      content: {
        lead: "Every single page you view on the web — from news sites to online stores — is delivered to your browser as an HTML document.",
        sections: [
          {
            heading: "1. The Structure of an HTML Page",
            body: [
              "HTML (HyperText Markup Language) uses tags such as <h1>, <p>, and <a> to define headers, paragraphs, and clickable links."
            ]
          }
        ],
        faq: [
          {
            question: "Do I need special software to open an HTML file?",
            answer: "No, any web browser (Chrome, Firefox, Edge, Safari) opens HTML files by double-clicking."
          }
        ]
      }
    },
    "kako-pretvoriti-pdf-u-word-besplatno": {
      title: "How to Convert PDF to Word for Free While Preserving Layout",
      subtitle: "Master the differences between private client-side DOCX conversion and PRO OCR processing",
      excerpt: "Learn how to convert read-only PDF documents into editable Word (.docx) files without losing formatting, tables, or custom fonts.",
      category: "Dokumenti & PDF",
      badge: "Popular Guide",
      readTime: "6 min read",
      date: "October 06, 2026",
      seoTitle: "Free PDF to Word Converter Online | BH KONVER",
      seoDescription: "Step-by-step instructions to convert PDF files into editable DOCX Word files with maximum layout precision.",
      author: {
        name: "Alen Jusufovic",
        role: "Founder & Lead Technical Editor at BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER PDF to Word",
        path: "/alati",
        description: "Private client-side visual copy or PRO editable conversion with 24h automatic cleanup.",
      },
      content: {
        lead: "PDF is perfect for sharing final documents, but editing them requires converting back to Word. BH KONVER provides dual conversion engines for quick local privacy and deep layout reconstruction.",
        sections: [
          {
            heading: "1. Client-Side Visual Copy vs Server PRO",
            body: [
              "Our client-side conversion processes documents directly in your browser without sending a single byte to an external server. For scanned documents, our PRO OCR pipeline reconstructs editable paragraphs and tabular data."
            ]
          }
        ],
        faq: [
          {
            question: "Are my uploaded documents kept private?",
            answer: "Yes, client-side tools never upload your files, and temporary server jobs are automatically deleted within 24 hours."
          }
        ]
      }
    },
    "vodic-kroz-pdv-u-bih-17-posto": {
      title: "Guide to 17% VAT in Bosnia & Herzegovina: Formulas & Calculations",
      subtitle: "Simple methods to calculate base price, separate VAT, and verify invoices with confidence",
      excerpt: "Master quick calculations for standard 17% VAT in BiH. Learn the derived rate formula (14.5299%) to extract tax from final gross prices.",
      category: "Finansije & Kalkulatori",
      badge: "Finance & Tax",
      readTime: "7 min read",
      date: "October 04, 2026",
      seoTitle: "17% VAT Calculator and Invoicing Guide in BiH | BH KONVER",
      seoDescription: "Practical guide to standard 17% VAT in Bosnia and Herzegovina with easy calculation formulas and examples.",
      author: {
        name: "Alen Jusufovic",
        role: "Founder & Lead Technical Editor at BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER PDV Kalkulator 17%",
        path: "/kalkulatori/pdv",
        description: "Calculate tax base, 17% VAT amount, and gross totals in convertible marks (KM).",
      },
      content: {
        lead: "Bosnia and Herzegovina applies a single standard VAT rate of 17% across goods and services. Here is how to calculate taxes accurately in seconds.",
        sections: [
          {
            heading: "1. Adding VAT to a Net Base Price",
            body: [
              "To add 17% VAT to a net amount: Gross Price = Net Price × 1.17."
            ]
          },
          {
            heading: "2. Extracting VAT from a Gross Price",
            body: [
              "When you have a final retail price with VAT included, use the derived rate: VAT = Gross × 0.145299."
            ]
          }
        ],
        faq: [
          {
            question: "What is the official VAT threshold in Bosnia and Herzegovina?",
            answer: "Businesses with taxable annual turnover exceeding 100,000 KM must register for the VAT system."
          }
        ]
      }
    },
    "priprema-za-vozacki-ispit-saobracajni-testovi": {
      title: "Driving License Exam Prep in BiH: Traffic Signs & Practice Tests",
      subtitle: "Everything you need to know about passing the theoretical driving test on your first try",
      excerpt: "Practice real driving test questions, study intersection priorities, and prepare for official driving school examinations in Bosnia and Herzegovina.",
      category: "Edukativni testovi",
      badge: "Driving Exam",
      readTime: "8 min read",
      date: "October 02, 2026",
      seoTitle: "BiH Driving License Practice Tests Online | BH KONVER",
      seoDescription: "Interactive driving license quiz with real questions, traffic signs, and intersection priority scenarios.",
      author: {
        name: "Alen Jusufovic",
        role: "Founder & Lead Technical Editor at BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER Traffic Exam Practice",
        path: "/testovi/saobracajni",
        description: "Interactive practice tests with instant scoring and explanations.",
      },
      content: {
        lead: "Passing the driving theory test requires thorough knowledge of traffic signs, speed limits, and right-of-way intersection rules.",
        sections: [
          {
            heading: "1. Golden Rules of Intersection Priority",
            bullets: [
              "Traffic police officer gestures always override traffic lights and road signs.",
              "Traffic lights take precedence over vertical traffic signs and road markings.",
              "In the absence of signs, the right-hand rule applies strictly."
            ]
          }
        ],
        faq: [
          {
            question: "How many questions are on the official driving theory exam in BiH?",
            answer: "The exam typically comprises 30 questions covering general rules, signs, and intersections."
          }
        ]
      }
    },
    "qr-kodovi-za-poslovanje-ugostiteljstvo": {
      title: "QR Codes for Business: Restaurant Menus, Wi-Fi & Marketing",
      subtitle: "How modern businesses leverage permanent QR codes and barcodes without expiring subscriptions",
      excerpt: "Learn how to create high-resolution, static QR codes for contactless digital menus, Wi-Fi connectivity, and product inventory.",
      category: "Generatori & Alati",
      badge: "Business Tools",
      readTime: "5 min read",
      date: "October 01, 2026",
      seoTitle: "QR Codes and Barcode Generators for Business | BH KONVER",
      seoDescription: "Create permanent, subscription-free QR codes and barcodes for restaurants, retail, and web marketing.",
      author: {
        name: "Alen Jusufovic",
        role: "Founder & Lead Technical Editor at BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER QR Code Generator",
        path: "/category/generatori?tab=qr",
        description: "Generate high-contrast QR codes for websites, Wi-Fi passwords, and digital cards.",
      },
      content: {
        lead: "QR codes have evolved into an indispensable business tool for restaurants, cafes, event organizers, and retail stores.",
        sections: [
          {
            heading: "1. Why Permanent Static QR Codes Are Better",
            body: [
              "Many commercial services charge high monthly fees and disable your QR codes once trials expire. BH KONVER generates direct, permanent static QR codes that never expire."
            ]
          }
        ],
        faq: [
          {
            question: "Do BH KONVER QR codes expire after a trial period?",
            answer: "No, all static QR codes generated on BH KONVER are 100% permanent and free forever."
          }
        ]
      }
    }
  },
  de: {
    "formati-video-fajlova-mp4-mkv-avi": {
      title: "Videodateiformate verständlich erklärt: MP4, MKV, AVI und mehr",
      subtitle: "Ein umfassender Leitfaden zu Containern, Codecs, Komprimierung und der Wahl des optimalen Formats",
      excerpt: "Erfahren Sie die wesentlichen Unterschiede zwischen MP4, MKV, AVI, WEBM und MOV. Finden Sie heraus, warum manche Videos auf dem Fernseher nicht abspielen und wie Sie diese anpassen.",
      category: "Video & Audio",
      badge: "Detaillierter Leitfaden",
      readTime: "7 Min. Lesezeit",
      date: "14. Oktober 2026",
      seoTitle: "Videodateiformate: MP4 vs MKV vs AVI Leitfaden | BH KONVER",
      seoDescription: "Vergleich von MP4, MKV, AVI, WEBM und MOV Videoformaten. Erfahren Sie, welches Format Sie wählen und wie Sie Videos online konvertieren.",
      author: {
        name: "Alen Jusufovic",
        role: "Gründer & Technischer Redakteur bei BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER Video-Konverter",
        path: "/modul/video",
        description: "Konvertieren Sie MP4, MKV, AVI und WebM direkt im Browser in voller Auflösung.",
      },
      content: {
        lead: "Beim Herunterladen von Videos, Smartphone-Aufnahmen oder Videobearbeitung für soziale Medien begegnen Ihnen Abkürzungen wie MP4, MKV, AVI, MOV oder WebM. Obwohl alle bewegte Bilder zeigen, unterscheiden sich Container und Codecs grundlegend.",
        sections: [
          {
            heading: "1. Container versus Codec: Der wesentliche Unterschied",
            body: [
              "Das häufigste Missverständnis ist die Verwechslung von Videoformat (Container) und Codec. Stellen Sie sich den Container wie eine Schachtel vor. Endungen wie .mp4 oder .mkv sind diese Hülle.",
              "Im Inneren liegen Videostreams, Audiospuren und Untertitel. Der Codec (z.B. H.264, HEVC, AV1) ist der Algorithmus zur Komprimierung der Daten."
            ]
          }
        ],
        faq: [
          {
            question: "Welches Videoformat ist am besten für Social Media geeignet?",
            answer: "MP4 mit H.264-Video und AAC-Audio ist das universell kompatible Format."
          }
        ]
      }
    },
    "sta-je-docx-fajl-kako-otvoriti-bez-worda": {
      title: "Was ist eine DOCX-Datei und wie öffnet man sie ohne Word?",
      subtitle: "Office Open XML, Google Docs, LibreOffice und kostenlose Browser-Tools",
      excerpt: "Alles über .docx Dateien. Erfahren Sie, wie Sie Word-Dokumente auf Windows, Mac oder Smartphones ohne teures Office-Abonnement öffnen und bearbeiten.",
      category: "Dokumenti & PDF",
      badge: "Office-Leitfaden",
      readTime: "6 Min. Lesezeit",
      date: "12. Oktober 2026",
      seoTitle: "DOCX Datei öffnen ohne Microsoft Word | BH KONVER",
      seoDescription: "Anleitung zum Öffnen und Konvertieren von DOCX-Dateien ohne Microsoft Word.",
      author: {
        name: "Alen Jusufovic",
        role: "Gründer & Technischer Redakteur bei BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER PDF- & Word-Tools",
        path: "/alati",
        description: "Konvertieren Sie DOCX-Dateien in sauberes PDF oder bearbeitbares Word.",
      },
      content: {
        lead: "Die .docx Erweiterung ist der weltweite Standard für Textdokumente. Mit unseren kostenlosen Lösungen öffnen und konvertieren Sie jede DOCX-Datei sofort.",
        sections: [
          {
            heading: "1. DOCX ist im Grunde ein ZIP-Archiv",
            body: [
              "DOCX basiert auf Office Open XML. Wenn Sie die Dateiendung in .zip ändern, finden Sie darin Bilder und strukturierte XML-Dateien."
            ]
          }
        ],
        faq: [
          {
            question: "Warum sollte ich Dokumente vor dem Versand als PDF speichern?",
            answer: "PDF garantiert, dass Layout, Schriftarten und Ränder auf allen Geräten exakt gleich dargestellt werden."
          }
        ]
      }
    },
    "sta-je-heic-fajl-kako-pretvoriti-u-jpg": {
      title: "Was ist das HEIC-Format auf dem iPhone und wie konvertiert man es in JPG?",
      subtitle: "Warum Apple High Efficiency Image Coding nutzt und wie Sie Fotos auf jedem PC öffnen",
      excerpt: "Fotos von Ihrem iPhone lassen sich unter Windows nicht öffnen? Erfahren Sie, warum Apple HEIC verwendet und wie Sie Fotos in universelles JPG umwandeln.",
      category: "Slike & Formati",
      badge: "iPhone & PC",
      readTime: "5 Min. Lesezeit",
      date: "10. Oktober 2026",
      seoTitle: "HEIC in JPG umwandeln online | BH KONVER",
      seoDescription: "Kostenlose Konvertierung von iPhone HEIC Fotos in universelle JPG- oder PDF-Dateien.",
      author: {
        name: "Alen Jusufovic",
        role: "Gründer & Technischer Redakteur bei BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER Bild zu PDF & JPG",
        path: "/slika-pdf",
        description: "Transformieren Sie HEIC-Fotos in sekundenschnelle in JPG oder PDF.",
      },
      content: {
        lead: "Auf iPhones gespeicherte HEIC-Bilder bieten fantastische Bildqualität bei halber Dateigröße, bereiten auf Windows-PCs jedoch oft Kompatibilitätsprobleme.",
        sections: [
          {
            heading: "1. Schnelle Umwandlung in JPG",
            body: [
              "Mit BH KONVER laden Sie Ihre HEIC-Dateien hoch und erhalten sofort kompatible JPG-Bilder."
            ]
          }
        ],
        faq: [
          {
            question: "Kann mein iPhone direkt JPG aufnehmen?",
            answer: "Ja, unter Einstellungen > Kamera > Formate 'Maximale Kompatibilität' auswählen."
          }
        ]
      }
    },
    "sta-je-html-fajl-i-kako-ga-koristiti": {
      title: "Was ist eine HTML-Datei und wie verwendet man sie?",
      subtitle: "Die Grundbausteine des World Wide Web und Quellcode-Bearbeitung",
      excerpt: "Erfahren Sie, wie Browser Webseiten darstellen und wie Sie HTML-Code in einfachen Texteditoren anpassen können.",
      category: "Web & Tehnologija",
      badge: "Web-Grundlagen",
      readTime: "6 Min. Lesezeit",
      date: "08. Oktober 2026",
      seoTitle: "Was ist eine HTML Datei | BH KONVER",
      seoDescription: "Einführung in HTML-Dateien, Tags und Webseitenstruktur.",
      author: {
        name: "Alen Jusufovic",
        role: "Gründer & Technischer Redakteur bei BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER Text- & Skript-Tools",
        path: "/category/konvertori?tab=script",
        description: "Werkzeuge zur Text- und Schrifttransliteration.",
      },
      content: {
        lead: "Jede Webseite im Internet basiert auf HTML-Markup, das von modernen Browsern gerendert wird.",
        sections: [
          {
            heading: "1. Struktur einer HTML-Seite",
            body: [
              "HTML strukturiert Inhalte durch Tags wie Überschriften, Absätze und Links."
            ]
          }
        ],
        faq: [
          {
            question: "Brauche ich spezielle Software zum Öffnen von HTML?",
            answer: "Nein, jeder Webbrowser öffnet HTML-Dateien per Doppelklick."
          }
        ]
      }
    },
    "kako-pretvoriti-pdf-u-word-besplatno": {
      title: "Wie man PDF kostenlos in Word umwandelt und das Layout behält",
      subtitle: "Unterschiede zwischen privater Client-Konvertierung und PRO-Layout-Rekonstruktion",
      excerpt: "Verwandeln Sie schreibgeschützte PDF-Dateien in bearbeitbare Word-Dokumente (.docx), ohne Schriftarten oder Tabellen zu verlieren.",
      category: "Dokumenti & PDF",
      badge: "Beliebter Leitfaden",
      readTime: "6 Min. Lesezeit",
      date: "06. Oktober 2026",
      seoTitle: "Kostenloser PDF zu Word Konverter | BH KONVER",
      seoDescription: "Anleitung zum Konvertieren von PDF in Word mit hoher Layout-Präzision.",
      author: {
        name: "Alen Jusufovic",
        role: "Gründer & Technischer Redakteur bei BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER PDF zu Word",
        path: "/alati",
        description: "Private browserbasierte Konvertierung oder PRO-Verarbeitung mit 24h-Löschgarantie.",
      },
      content: {
        lead: "PDF eignet sich ideal zum Teilen, doch zur Textbearbeitung ist DOCX nötig. BH KONVER bietet zwei spezialisierte Pipelines für höchste Wiedergabetreue.",
        sections: [
          {
            heading: "1. Clientseitig privat oder PRO-Bearbeitung",
            body: [
              "Kleine Dokumente werden direkt im Browser umgewandelt, ohne dass Daten an Server übertragen werden."
            ]
          }
        ],
        faq: [
          {
            question: "Bleiben meine Dokumente vertraulich?",
            answer: "Ja, clientseitige Tools senden keine Daten ins Netz, und temporäre Server-Dateien werden nach 24h automatisch gelöscht."
          }
        ]
      }
    },
    "vodic-kroz-pdv-u-bih-17-posto": {
      title: "Leitfaden zur 17% MwSt. in Bosnien und Herzegowina: Formeln und Berechnung",
      subtitle: "Nettobasis, Mehrwertsteuer und Endbeträge zuverlässig berechnen",
      excerpt: "Erfahren Sie, wie Sie 17% Mehrwertsteuer in BiH berechnen und die umgerechnete Steuerrate (14,5299%) anwenden.",
      category: "Finansije & Kalkulatori",
      badge: "Finanzen & Steuern",
      readTime: "7 Min. Lesezeit",
      date: "04. Oktober 2026",
      seoTitle: "17% MwSt. Rechner Bosnien und Herzegowina | BH KONVER",
      seoDescription: "Praktischer Leitfaden zur Berechnung der 17% Mehrwertsteuer in BiH mit Beispielen.",
      author: {
        name: "Alen Jusufovic",
        role: "Gründer & Technischer Redakteur bei BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER PDV Rechner 17%",
        path: "/kalkulatori/pdv",
        description: "Berechnen Sie Steuerbasis, MwSt.-Betrag und Gesamtsummen in Konvertiblen Mark (KM).",
      },
      content: {
        lead: "In Bosnien und Herzegowina gilt ein einheitlicher Mehrwertsteuersatz von 17%.",
        sections: [
          {
            heading: "1. MwSt. zum Nettobetrag hinzurechnen",
            body: [
              "Bruttobetrag = Nettobasis × 1,17."
            ]
          }
        ],
        faq: [
          {
            question: "Ab welchem Jahresumsatz muss man in BiH die MwSt. anmelden?",
            answer: "Unternehmen mit einem steuerbaren Jahresumsatz über 100.000 KM müssen sich im MwSt.-System registrieren."
          }
        ]
      }
    },
    "priprema-za-vozacki-ispit-saobracajni-testovi": {
      title: "Führerscheinprüfung in Bosnien und Herzegowina: Verkehrstests und Regeln",
      subtitle: "Praxistipps für das Bestehen der theoretischen Fahrprüfung beim ersten Versuch",
      excerpt: "Üben Sie Prüfungsfragen, Vorfahrtsregeln an Kreuzungen und offizielle Verkehrsschilder online.",
      category: "Edukativni testovi",
      badge: "Fahrprüfung",
      readTime: "8 Min. Lesezeit",
      date: "02. Oktober 2026",
      seoTitle: "Führerschein Übungstests BiH Online | BH KONVER",
      seoDescription: "Interaktive Verkehrstests mit Schildern und Vorfahrtsfragen.",
      author: {
        name: "Alen Jusufovic",
        role: "Gründer & Technischer Redakteur bei BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER Verkehrstests",
        path: "/testovi/saobracajni",
        description: "Interaktive Übungstests mit sofortiger Punkteauswertung.",
      },
      content: {
        lead: "Das Bestehen der Theorieprüfung erfordert sichere Kenntnisse über Verkehrszeichen und Kreuzungsvorfahrt.",
        sections: [
          {
            heading: "1. Vorfahrtsregeln",
            bullets: [
              "Polizeibeamte haben Vorrang vor Ampeln und Schildern.",
              "Ampeln haben Vorrang vor Verkehrszeichen.",
              "Ohne Schilder gilt Rechts vor Links."
            ]
          }
        ],
        faq: [
          {
            question: "Wie viele Fragen umfasst die Theorieprüfung in BiH?",
            answer: "Die offizielle Prüfung umfasst in der Regel 30 Fragen zu Verkehrsregeln und Schildern."
          }
        ]
      }
    },
    "qr-kodovi-za-poslovanje-ugostiteljstvo": {
      title: "QR-Codes für Unternehmen: Gastronomie-Speisekarten, WLAN & Marketing",
      subtitle: "Erstellen Sie dauerhafte QR-Codes und Barcodes ohne teure Abonnements",
      excerpt: "Erfahren Sie, wie Sie hochauflösende statische QR-Codes für digitale Speisekarten, WLAN-Zugang und Inventar erstellen.",
      category: "Generatori & Alati",
      badge: "Unternehmens-Tools",
      readTime: "5 Min. Lesezeit",
      date: "01. Oktober 2026",
      seoTitle: "QR-Code und Barcode Generatoren für Unternehmen | BH KONVER",
      seoDescription: "Erstellen Sie dauerhafte, kostenlose QR-Codes für Gastronomie und Handel.",
      author: {
        name: "Alen Jusufovic",
        role: "Gründer & Technischer Redakteur bei BH KONVER",
      },
      relatedTool: {
        name: "BH KONVER QR-Code Generator",
        path: "/category/generatori?tab=qr",
        description: "Erstellen Sie sofort scanbare QR-Codes für Websites und WLAN.",
      },
      content: {
        lead: "QR-Codes sind im modernen Geschäftsleben und in der Gastronomie nicht mehr wegzudenken.",
        sections: [
          {
            heading: "1. Warum statische QR-Codes vorteilhaft sind",
            body: [
              "Unsere QR-Codes laufen niemals ab und funktionieren unbegrenzt ohne monatliche Abo-Kosten."
            ]
          }
        ],
        faq: [
          {
            question: "Laufen die generierten QR-Codes ab?",
            answer: "Nein, alle mit BH KONVER erstellten Codes sind dauerhaft und kostenlos gültig."
          }
        ]
      }
    }
  },
  tr: {
    "formati-video-fajlova-mp4-mkv-avi": {
      title: "Video Dosya Formatları Rehberi: MP4, MKV, AVI ve Diğerleri",
      subtitle: "Konteynerler, kodekler, sıkıştırma ve en iyi video formatını seçme rehberi",
      excerpt: "MP4, MKV, AVI, WEBM ve MOV formatları arasındaki temel farkları öğrenin. Bazı videoların televizyonunuzda neden açılmadığını ve nasıl dönüştürüleceğini keşfedin.",
      category: "Video & Audio",
      badge: "Kapsamlı Rehber",
      readTime: "7 dk okuma",
      date: "14 Ekim 2026",
      seoTitle: "Video Dosya Formatları: MP4 vs MKV vs AVI Rehberi | BH KONVER",
      seoDescription: "MP4, MKV, AVI ve WebM video formatları karşılaştırması ve çevrimiçi video dönüştürme ipuçları.",
      author: {
        name: "Alen Jusufovic",
        role: "BH KONVER Kurucusu & Teknik Editörü",
      },
      relatedTool: {
        name: "BH KONVER Video Dönüştürücü",
        path: "/modul/video",
        description: "MP4, MKV, AVI ve WebM formatlarını tarayıcınızda doğrudan dönüştürün.",
      },
      content: {
        lead: "İnternetten video indirirken, telefonunuzla kayıt yaparken veya sosyal medya için kurgularken MP4, MKV, AVI gibi uzantılarla karşılaşırsınız. Bunların veri saklama yöntemleri birbirinden oldukça farklıdır.",
        sections: [
          {
            heading: "1. Konteyner ve Kodek Arasındaki Fark",
            body: [
              "En sık yapılan hata video formatı (konteyner) ile video kodeğini karıştırmaktır. Konteyneri dijital bir kutu olarak düşünün.",
              "Bu kutunun içinde video akışı, ses parçaları ve altyazılar bulunur. Kodek (örn. H.264, AV1, AAC) ise veriyi sıkıştıran matematiksel algoritmadır."
            ]
          }
        ],
        faq: [
          {
            question: "Paylaşım için en güvenli video formatı hangisidir?",
            answer: "H.264 video ve AAC ses içeren MP4 formatı tüm cihaz ve tarayıcılarda sorunsuz çalışır."
          }
        ]
      }
    },
    "sta-je-docx-fajl-kako-otvoriti-bez-worda": {
      title: "DOCX Dosyası Nedir ve Word Olmadan Nasıl Açılır?",
      subtitle: "Office Open XML formatı, Google Dokümanlar, LibreOffice ve ücretsiz tarayıcı çözümleri",
      excerpt: ".docx dosyaları hakkında bilmeniz gereken her şey. Word dosyalarını pahalı Office lisansı olmadan bilgisayarınızda veya telefonunuzda açın ve dönüştürün.",
      category: "Dokumenti & PDF",
      badge: "Office Rehberi",
      readTime: "6 dk okuma",
      date: "12 Ekim 2026",
      seoTitle: "Word Olmadan DOCX Açma ve Düzenleme | BH KONVER",
      seoDescription: "Microsoft Word olmadan Windows, Mac ve mobilde DOCX dosyalarını açma ve dönüştürme adımları.",
      author: {
        name: "Alen Jusufovic",
        role: "BH KONVER Kurucusu & Teknik Editörü",
      },
      relatedTool: {
        name: "BH KONVER PDF & Word Araçları",
        path: "/alati",
        description: "DOCX belgelerini PDF'e veya düzenlenebilir metne anında dönüştürün.",
      },
      content: {
        lead: ".docx uzantısı ofis belgeleri için küresel standarttır. Ücretsiz araçlarımızla Word olmadan her DOCX dosyasını açabilirsiniz.",
        sections: [
          {
            heading: "1. DOCX Aslında Bir ZIP Arşividir",
            body: [
              "DOCX dosyası Office Open XML üzerine kuruludur. Uzantısını .zip olarak değiştirirseniz içindeki XML ve görsel dosyalarını görebilirsiniz."
            ]
          }
        ],
        faq: [
          {
            question: "Belgeleri neden göndermeden önce PDF'e dönüştürmeliyim?",
            answer: "PDF, yazı tiplerinin ve sayfa düzeninin alıcının cihazında bozulmadan aynı kalmasını garanti eder."
          }
        ]
      }
    },
    "sta-je-heic-fajl-kako-pretvoriti-u-jpg": {
      title: "iPhone'daki HEIC Formatı Nedir ve Windows'ta JPG'ye Nasıl Dönüştürülür?",
      subtitle: "Apple'ın High Efficiency Image Coding teknolojisi ve fotoğrafları her cihazda açma yöntemleri",
      excerpt: "iPhone fotoğraflarınız Windows bilgisayarınızda açılmıyor mu? Apple'ın neden HEIC kullandığını ve bunları nasıl JPG'ye dönüştüreceğinizi öğrenin.",
      category: "Slike & Formati",
      badge: "iPhone & PC",
      readTime: "5 dk okuma",
      date: "10 Ekim 2026",
      seoTitle: "HEIC Dosyasını JPG'ye Dönüştürme | BH KONVER",
      seoDescription: "iPhone HEIC fotoğraflarını kalite kaybı olmadan ücretsiz çevrimiçi JPG veya PDF'e dönüştürün.",
      author: {
        name: "Alen Jusufovic",
        role: "BH KONVER Kurucusu & Teknik Editörü",
      },
      relatedTool: {
        name: "BH KONVER Resimden PDF & JPG",
        path: "/slika-pdf",
        description: "HEIC fotoğraflarını evrensel JPG veya birleştirilmiş PDF belgelerine dönüştürün.",
      },
      content: {
        lead: "iPhone cihazlarındaki HEIC formatı yarı yarıya dosya boyutu tasarrufu sağlasa da Windows bilgisayarlarda uyumluluk sorunlarına yol açabilir.",
        sections: [
          {
            heading: "1. Çevrimiçi JPG Dönüşümü",
            body: [
              "BH KONVER ile HEIC fotoğraflarınızı tarayıcınızda anında evrensel JPG formatına dönüştürebilirsiniz."
            ]
          }
        ],
        faq: [
          {
            question: "iPhone'umun doğrudan JPG çekmesini sağlayabilir miyim?",
            answer: "Evet, Ayarlar > Kamera > Biçimler bölümünden 'En Uyumlu' seçeneğini belirleyebilirsiniz."
          }
        ]
      }
    },
    "sta-je-html-fajl-i-kako-ga-koristiti": {
      title: "HTML Dosyası Nedir ve Nasıl Kullanılır?",
      subtitle: "Web dünyasının temel yapı taşları ve kaynak kodu düzenleme",
      excerpt: "HTML dosyalarının nasıl çalıştığını, tarayıcıların sayfaları nasıl oluşturduğunu ve basit metin düzenleyicilerle nasıl kod yazıldığını öğrenin.",
      category: "Web & Tehnologija",
      badge: "Web Temelleri",
      readTime: "6 dk okuma",
      date: "08 Ekim 2026",
      seoTitle: "HTML Dosyası Nedir | BH KONVER",
      seoDescription: "HTML dosyaları, etiketler ve web sayfası yapısı hakkında başlangıç kılavuzu.",
      author: {
        name: "Alen Jusufovic",
        role: "BH KONVER Kurucusu & Teknik Editörü",
      },
      relatedTool: {
        name: "BH KONVER Metin & Kod Araçları",
        path: "/category/konvertori?tab=script",
        description: "Metin ve kod formatlama araçları.",
      },
      content: {
        lead: "İnternette ziyaret ettiğiniz her web sayfası tarayıcınıza bir HTML belgesi olarak iletilir.",
        sections: [
          {
            heading: "1. HTML Sayfasının Yapısı",
            body: [
              "HTML başlıklar, paragraflar ve bağlantılar gibi etiketlerle içeriği yapılandırır."
            ]
          }
        ],
        faq: [
          {
            question: "HTML açmak için özel bir programa ihtiyacım var mı?",
            answer: "Hayır, herhangi bir web tarayıcısı HTML dosyalarını çift tıklayarak açar."
          }
        ]
      }
    },
    "kako-pretvoriti-pdf-u-word-besplatno": {
      title: "PDF Dosyası Word'e Düzenini Korumak Üzere Nasıl Dönüştürülür?",
      subtitle: "Gizli yerel dönüşüm ile profesyonel OCR işleme arasındaki farklar",
      excerpt: "Salt okunur PDF belgelerini biçimlendirmeyi, tabloları ve yazı tiplerini kaybetmeden düzenlenebilir Word (.docx) dosyalarına dönüştürün.",
      category: "Dokumenti & PDF",
      badge: "Popüler Rehber",
      readTime: "6 dk okuma",
      date: "06 Ekim 2026",
      seoTitle: "Ücretsiz PDF Word Dönüştürücü | BH KONVER",
      seoDescription: "PDF belgelerini yüksek doğrulukla düzenlenebilir DOCX dosyalarına dönüştürün.",
      author: {
        name: "Alen Jusufovic",
        role: "BH KONVER Kurucusu & Teknik Editörü",
      },
      relatedTool: {
        name: "BH KONVER PDF'ten Word'e",
        path: "/alati",
        description: "Tarayıcı içi yerel dönüşüm veya 24 saat otomatik silme garantili PRO işleme.",
      },
      content: {
        lead: "PDF paylaşım için mükemmeldir, ancak metin üzerinde düzenleme yapmak için Word formatı gereklidir.",
        sections: [
          {
            heading: "1. Yerel Dönüşüm ve PRO OCR",
            body: [
              "Hassas belgeleriniz tarayıcınızdan çıkmadan yerel olarak dönüştürülür."
            ]
          }
        ],
        faq: [
          {
            question: "Yüklediğim belgeler gizli kalıyor mu?",
            answer: "Evet, tarayıcı araçları sunucuya dosya göndermez; geçici sunucu dosyaları ise 24 saat içinde silinir."
          }
        ]
      }
    },
    "vodic-kroz-pdv-u-bih-17-posto": {
      title: "Bosna-Hersek'te %17 KDV Rehberi: Formüller ve Hesaplama",
      subtitle: "Matrah, KDV tutarı ve fatura toplamlarını doğru hesaplama yöntemleri",
      excerpt: "Bosna-Hersek'teki standart %17 KDV'yi hızlıca hesaplayın ve brüt fiyattan KDV ayırma formülünü (%14,5299) öğrenin.",
      category: "Finansije & Kalkulatori",
      badge: "Finans & Vergi",
      readTime: "7 dk okuma",
      date: "04 Ekim 2026",
      seoTitle: "%17 KDV Hesaplayıcı (BH) | BH KONVER",
      seoDescription: "Bosna-Hersek'te %17 Katma Değer Vergisi hesaplama rehberi ve örnekler.",
      author: {
        name: "Alen Jusufovic",
        role: "BH KONVER Kurucusu & Teknik Editörü",
      },
      relatedTool: {
        name: "BH KONVER KDV Hesaplayıcı %17",
        path: "/kalkulatori/pdv",
        description: "KM cinsinden KDV matrahı ve genel toplamları hesaplayın.",
      },
      content: {
        lead: "Bosna-Hersek'te mal ve hizmetler için standart %17 KDV oranı uygulanmaktadır.",
        sections: [
          {
            heading: "1. Net Fiyata KDV Ekleme",
            body: [
              "Brüt Fiyat = Net Matrah × 1,17."
            ]
          }
        ],
        faq: [
          {
            question: "BH'de KDV mükellefiyeti sınırı nedir?",
            answer: "Yıllık cirosu 100.000 KM'yi aşan işletmeler KDV sistemine kaydolmak zorundadır."
          }
        ]
      }
    },
    "priprema-za-vozacki-ispit-saobracajni-testovi": {
      title: "Bosna-Hersek Ehliyet Sınavı Hazırlığı: Trafik Kuralları ve Testler",
      subtitle: "Teorik ehliyet sınavını ilk denemede geçmeniz için pratik ipuçları",
      excerpt: "Gerçek sınav sorularını çözün, kavşak geçiş önceliklerini öğrenin ve ehliyet sınavına çevrimiçi hazırlanın.",
      category: "Edukativni testovi",
      badge: "Ehliyet Sınavı",
      readTime: "8 dk okuma",
      date: "02 Ekim 2026",
      seoTitle: "BH Ehliyet Deneme Sınavları Online | BH KONVER",
      seoDescription: "Trafik işaretleri ve kavşak öncelikleri ile etkileşimli ehliyet testi.",
      author: {
        name: "Alen Jusufovic",
        role: "BH KONVER Kurucusu & Teknik Editörü",
      },
      relatedTool: {
        name: "BH KONVER Trafik Testi",
        path: "/testovi/saobracajni",
        description: "Anında puanlamalı etkileşimli deneme testleri.",
      },
      content: {
        lead: "Ehliyet teorik sınavını geçmek trafik işaretleri ve kavşak önceliklerini iyi kavramayı gerektirir.",
        sections: [
          {
            heading: "1. Kavşak Öncelik Sıralaması",
            bullets: [
              "Trafik polisinin işaretleri her zaman ışıklardan ve levhalardan önceliklidir.",
              "Trafik ışıkları levhalardan önceliklidir.",
              "Levha yoksa sağdan gelen aracın önceliği kuralı geçerlidir."
            ]
          }
        ],
        faq: [
          {
            question: "BH resmi teorik sınavında kaç soru vardır?",
            answer: "Resmi sınavda genellikle kurallar, levhalar ve kavşaklardan oluşan 30 soru yer alır."
          }
        ]
      }
    },
    "qr-kodovi-za-poslovanje-ugostiteljstvo": {
      title: "İşletmeler İçin QR Kodlar: Restoran Menüleri, Wi-Fi ve Pazarlama",
      subtitle: "Abonelik ücreti olmadan kalıcı QR kodlar ve barkodlar oluşturun",
      excerpt: "Temassız dijital menüler, Wi-Fi bağlantısı ve ürün takibi için yüksek çözünürlüklü statik QR kodlar hazırlayın.",
      category: "Generatori & Alati",
      badge: "İş Araçları",
      readTime: "5 dk okuma",
      date: "01 Ekim 2026",
      seoTitle: "İşletmeler İçin QR Kod ve Barkod Jeneratörü | BH KONVER",
      seoDescription: "Restoranlar ve perakende işletmeleri için süresiz ücretsiz QR kodlar oluşturun.",
      author: {
        name: "Alen Jusufovic",
        role: "BH KONVER Kurucusu & Teknik Editörü",
      },
      relatedTool: {
        name: "BH KONVER QR Kod Jeneratörü",
        path: "/category/generatori?tab=qr",
        description: "Web siteleri ve Wi-Fi için hemen taranabilir QR kodlar üretin.",
      },
      content: {
        lead: "QR kodlar modern restoranlar, kafeler ve işletmeler için vazgeçilmez bir iletişim aracı haline gelmiştir.",
        sections: [
          {
            heading: "1. Neden Statik QR Kodlar Tercih Edilmeli?",
            body: [
              "BH KONVER ile oluşturulan kodlar süresizdir ve aylık ücret gerektirmeden sonsuza kadar çalışır."
            ]
          }
        ],
        faq: [
          {
            question: "Oluşturulan QR kodların kullanım süresi doluyor mu?",
            answer: "Hayır, tüm kodlar kalıcı ve tamamen ücretsizdir."
          }
        ]
      }
    }
  }
};

/**
 * Resolves a BlogArticle into the active language:
 * - If lang is 'bs-Cyrl', transliterates all article fields to Cyrillic
 * - If lang is 'en', 'de', or 'tr', merges full localized titles, summaries, and content
 * - Defaults to native Bosnian Latin
 */
export function getLocalizedArticle(article: BlogArticle, language: string): BlogArticle {
  const normalized = (language || "bs").toLowerCase();

  // 1. Cyrillic transliteration
  if (normalized === "bs-cyrl" || normalized === "sr" || normalized === "cyrillic") {
    return {
      ...article,
      title: latinToCyrillic(article.title),
      subtitle: latinToCyrillic(article.subtitle),
      excerpt: latinToCyrillic(article.excerpt),
      category: latinToCyrillic(article.category) as any,
      badge: article.badge ? latinToCyrillic(article.badge) : undefined,
      readTime: latinToCyrillic(article.readTime),
      date: latinToCyrillic(article.date),
      seoTitle: latinToCyrillic(article.seoTitle),
      seoDescription: latinToCyrillic(article.seoDescription),
      author: {
        ...article.author,
        name: latinToCyrillic(article.author.name),
        role: latinToCyrillic(article.author.role),
      },
      content: {
        ...article.content,
        lead: latinToCyrillic(article.content.lead),
        sections: article.content.sections.map((sec) => ({
          ...sec,
          heading: latinToCyrillic(sec.heading),
          subheading: sec.subheading ? latinToCyrillic(sec.subheading) : undefined,
          body: sec.body.map((p) => latinToCyrillic(p)),
          bullets: sec.bullets ? sec.bullets.map((b) => latinToCyrillic(b)) : undefined,
          callout: sec.callout
            ? {
                ...sec.callout,
                title: latinToCyrillic(sec.callout.title),
                text: latinToCyrillic(sec.callout.text),
              }
            : undefined,
          table: sec.table
            ? {
                headers: sec.table.headers.map((h) => latinToCyrillic(h)),
                rows: sec.table.rows.map((row) => row.map((cell) => latinToCyrillic(cell))),
              }
            : undefined,
        })),
        faq: article.content.faq?.map((item) => ({
          question: latinToCyrillic(item.question),
          answer: latinToCyrillic(item.answer),
        })),
      },
      relatedTool: article.relatedTool
        ? {
            ...article.relatedTool,
            name: latinToCyrillic(article.relatedTool.name),
            description: latinToCyrillic(article.relatedTool.description),
          }
        : undefined,
    };
  }

  // 2. Direct translations for English, German, Turkish
  const langKey = normalized.startsWith("en")
    ? "en"
    : normalized.startsWith("de")
    ? "de"
    : normalized.startsWith("tr")
    ? "tr"
    : null;

  if (langKey && BLOG_TRANSLATIONS[langKey]?.[article.slug]) {
    const overrides = BLOG_TRANSLATIONS[langKey][article.slug];
    return {
      ...article,
      ...overrides,
      content: {
        ...article.content,
        ...(overrides.content || {}),
      },
      author: {
        ...article.author,
        ...(overrides.author || {}),
      },
      relatedTool: overrides.relatedTool || article.relatedTool,
    };
  }

  return article;
}

/**
 * Returns localized category label for display
 */
export function getLocalizedCategoryName(
  category: string,
  language: string,
  t: (key: string, def?: string) => string
): string {
  const normalized = (language || "bs").toLowerCase();

  const map: Record<string, string> = {
    "Svi članci": t("blog.catAll", "Svi članci"),
    "Video & Audio": t("blog.catVideoAudio", "Video & Audio"),
    "Dokumenti & PDF": t("blog.catDocsPdf", "Dokumenti & PDF"),
    "Slike & Formati": t("blog.catImages", "Slike & Formati"),
    "Web & Tehnologija": t("blog.catWebTech", "Web & Tehnologija"),
    "Finansije & Kalkulatori": t("blog.catFinance", "Finansije & Kalkulatori"),
    "Edukativni testovi": t("blog.catTests", "Edukativni testovi"),
    "Generatori & Alati": t("blog.catGenerators", "Generatori & Alati"),
  };

  const res = map[category] || category;
  if (normalized === "bs-cyrl" || normalized === "sr" || normalized === "cyrillic") {
    return latinToCyrillic(res);
  }
  return res;
}
