export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: "Video & Audio" | "Dokumenti & PDF" | "Slike & Formati" | "Web & Tehnologija" | "Finansije & Kalkulatori" | "Edukativni testovi" | "Generatori & Alati";
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  date: string;
  isoDate: string;
  readTime: string;
  image: string;
  badge?: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  relatedTool?: {
    name: string;
    path: string;
    description: string;
  };
  content: {
    lead: string;
    sections: {
      heading: string;
      subheading?: string;
      body: string[];
      bullets?: string[];
      callout?: {
        type: "tip" | "info" | "warning";
        title: string;
        text: string;
      };
      table?: {
        headers: string[];
        rows: string[][];
      };
    }[];
    faq?: {
      question: string;
      answer: string;
    }[];
  };
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "formati-video-fajlova-mp4-mkv-avi",
    slug: "formati-video-fajlova-mp4-mkv-avi",
    title: "Formati video fajlova: Objašnjenje za MP4, MKV, AVI i druge",
    subtitle: "Vodič kroz kontejnere, kodeke, kompresiju i pravila odabira najboljeg formata za web, telefon ili TV",
    excerpt: "Saznajte ključne razlike između MP4, MKV, AVI, WEBM i MOV formata. Naučite zašto neki video snimci ne rade na televizoru ili telefonu i kako ih jednostavno prilagoditi.",
    category: "Video & Audio",
    author: {
      name: "Alen Jusufović",
      role: "Osnivač & Tehnički urednik BH KONVER",
    },
    date: "14. Oktobar 2026",
    isoDate: "2026-10-14T10:00:00Z",
    readTime: "7 min čitanja",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    badge: "Detaljan vodič",
    tags: ["MP4", "MKV", "AVI", "WEBM", "Video konverzija", "Kodeci", "H.264", "H.265"],
    seoTitle: "Formati video fajlova: MP4 vs MKV vs AVI vodič | BH KONVER",
    seoDescription: "Sveobuhvatno objašnjenje razlike između MP4, MKV, AVI, WEBM i MOV video formata. Saznajte koji format izabrati i kako ga besplatno konvertovati.",
    relatedTool: {
      name: "Video konvertor BH KONVER",
      path: "/modul/video",
      description: "Pretvorite MP4, MKV, AVI i WebM formate direktno u pregledniku ili uz visoku definiciju.",
    },
    content: {
      lead: "Kada preuzmete video sa interneta, snimite ga telefonom ili montirate za društvene mreže, često se susrećete sa zbunjujućim skraćenicama poput MP4, MKV, AVI, MOV ili WebM. Iako svi oni na ekranu prikazuju pokretne slike i ton, način na koji čuvaju podatke izuzetno se razlikuje.",
      sections: [
        {
          heading: "1. Kontejner nasuprot Kodeku: Ključna razlika",
          body: [
            "Najčešća zabluda kod korisnika jeste miješanje pojmova 'video format' (kontejner) i 'video kodek'. Zamislite kontejner kao digitalnu kutiju ili fasciklu. Ekstenzije poput .mp4 ili .mkv su upravo ta kutija.",
            "Unutar te kutije nalazi se video stream, audio zapis, titlovi i metapodaci (poput naziva poglavlja ili jezika). Kodek (npr. H.264, HEVC/H.265, AV1, AAC) je algoritam koji sabija i dekompresuje sam video i zvuk.",
            "Upravo zato se dešava da televizor podržava .mp4 datoteku, ali odbije da je pusti ukoliko je video unutar nje kodiran novijim kodekom koji TV čip ne prepoznaje."
          ],
          callout: {
            type: "info",
            title: "Pravilo kutije",
            text: "Kontejner (.mp4, .mkv, .avi) određuje omotač, dok kodek (H.264, AV1) određuje kompresiju i kvalitet. Dva MP4 fajla mogu imati potpuno različite unutrašnje kodeke!"
          }
        },
        {
          heading: "2. Detaljan pregled najpopularnijih video formata",
          body: [
            "Svaki video format stvoren je sa specifičnom namjenom. Pogledajmo njihove prednosti i mane:"
          ],
          bullets: [
            "MP4 (MPEG-4 Part 14): Apsolutni standard današnjice. Podržavaju ga bukvalno svi uređaji: iPhone, Android, pametni televizori, YouTube, Instagram i svi moderni preglednici. Najčešće koristi H.264 ili H.265 video kodek i AAC audio.",
            "MKV (Matroska): Otvoreni format koji je omiljen među filmskim entuzijastima. Može u jedan fajl spakovati neograničen broj audio zapisa (različiti sinhronizovani jezici), više vrsta titlova (SRT, ASS) i poglavlja. Mana: neki stariji TV uređaji i Apple ekosistem ga ne podržavaju fabrički bez konverzije.",
            "AVI (Audio Video Interleave): Legendarni Microsoft format iz 1992. godine. Iako je dominirao početkom 2000-ih (posebno uz DivX i Xvid), danas je zastario jer stvara veće fajlove i ne podržava moderne streaming tehnologije.",
            "WEBM: Googleov moderni format otvorenog koda razvijen specijalno za web. Koristi VP9 ili AV1 kodeke i pruža fantastičnu kompresiju uz izuzetno malu potrošnju internet saobraćaja.",
            "MOV: Standard razvijen od strane Applea za QuickTime. Idealan je za profesionalnu montažu (ProRes kodek) i čuvanje visokog dinamičkog raspona."
          ]
        },
        {
          heading: "3. Uporedna tabela formata",
          body: [
            "Brzi vodič za lakše donošenje odluke koji format upotrijebiti:"
          ],
          table: {
            headers: ["Format", "Kompatibilnost", "Veličina fajla", "Titlovi & Više zvuka", "Najbolja namjena"],
            rows: [
              ["MP4", "Univerzalna (100%)", "Mala do srednja", "Osnovna podrška", "Društvene mreže, web, telefon, TV"],
              ["MKV", "Srednja do visoka", "Srednja do velika", "Vrhunska (višestruki trackovi)", "Filmovi visoke rezolucije, serije, arhiva"],
              ["WEBM", "Samo moderni browseri/web", "Vrlo mala", "Osnovna podrška", "Web stranice, HTML5 video playeri"],
              ["AVI", "Visoka na starijim PC-ima", "Velika (lošija kompresija)", "Ograničena", "Stariji DVD playeri i arhivski diskovi"],
              ["MOV", "Vrhunska na Apple / Mac", "Velika do ogromna", "Dobra podrška", "Video montaža i Final Cut / Premiere"]
            ]
          }
        },
        {
          heading: "4. Koji format trebate izabrati i kada raditi konverziju?",
          body: [
            "Ako niste sigurni, MP4 je u 95% slučajeva najbolji izbor. Ukoliko vaš pametni TV, USB priključak u automobilu ili portal za slanje video materijala javlja grešku 'Format not supported' prilikom učitavanja MKV ili AVI fajla, konverzija u MP4 rješava problem u nekoliko sekundi.",
            "Na platformi BH KONVER nudimo brz i siguran video modul gdje možete konvertovati video zapise, prilagoditi formate ili izdvojiti audio traku (npr. Video u MP3) bez instaliranja sumnjivih desktop programa."
          ]
        }
      ],
      faq: [
        {
          question: "Zašto moj MKV film nema zvuka na pametnom televizoru?",
          answer: "To se dešava ako audio zapis unutar MKV kontejnera koristi DTS ili Dolby TrueHD kodek, koji jeftiniji TV modeli ne licenciraju. Konverzijom audio zapisa u AC3 ili AAC zvuk se vraća."
        },
        {
          question: "Koji je najbolji format za slanje videa putem e-maila ili Vibera?",
          answer: "MP4 kompresovan H.264 kodekom u rezoluciji 720p ili 1080p daje najbolji omjer kristalno čiste slike i minimalnog utroška megabajta."
        }
      ]
    }
  },
  {
    id: "sta-je-docx-fajl-kako-otvoriti-bez-worda",
    slug: "sta-je-docx-fajl-kako-otvoriti-bez-worda",
    title: "Šta je DOCX fajl i kako ga otvoriti bez Microsoft Word-a",
    subtitle: "Kompletan vodič za rad sa DOCX dokumentima na računaru i telefonu bez plaćanja skupe licence",
    excerpt: "Dobili ste .docx datoteku, a nemate instaliran Microsoft Office? Otkrijte šta je DOCX format i kako ga potpuno besplatno pregledati, urediti ili pretvoriti u PDF.",
    category: "Dokumenti & PDF",
    author: {
      name: "BH KONVER Edukativni tim",
      role: "Digitalni vodiči i produktivnost",
    },
    date: "14. Oktobar 2026",
    isoDate: "2026-10-14T09:30:00Z",
    readTime: "6 min čitanja",
    image: "https://images.unsplash.com/photo-1583521214690-73421a1829a9?auto=format&fit=crop&w=1200&q=80",
    badge: "Praktični savjeti",
    tags: ["DOCX", "Word", "PDF u Word", "Besplatni alati", "Dokumenti", "Office", "LibreOffice"],
    seoTitle: "Šta je DOCX fajl i kako ga besplatno otvoriti | BH KONVER",
    seoDescription: "Saznajte šta je DOCX format i kako otvoriti ili urediti Word dokumente bez instaliranog Microsoft Word-a pomoću besplatnih alata i BH KONVER-a.",
    relatedTool: {
      name: "PDF u Word konvertor",
      path: "/alati",
      description: "Pretvorite skenirane i digitalne PDF fajlove u uredive Word dokumente.",
    },
    content: {
      lead: "DOCX je danas de facto svjetski standard za tekstualne dokumente, ugovore, školske radove i biografije (CV). Međutim, ako nemate plaćenu Microsoft 365 licencu, dvostruki klik na .docx fajl može dovesti do greške ili obavijesti o isteku probnog perioda.",
      sections: [
        {
          heading: "1. Šta je zapravo DOCX fajl?",
          body: [
            "DOCX je skraćenica od 'Office Open XML Document'. Predstavljen je 2007. godine kao nasljednik starog binarnog .DOC formata koji je Microsoft koristio još od 1990-ih.",
            "Glavna tajna DOCX formata jeste da on zapravo nije običan fajl, već ZIP arhiva! Ako promijenite ekstenziju iz .docx u .zip i raspakujete ga, pronaći ćete fascikle sa XML fajlovima u kojima se nalazi čist tekst, te fasciklu 'media' u kojoj su spremljene sve originalne slike u punoj rezoluciji.",
            "Ova arhitektura omogućava da se oštećeni DOCX fajlovi lakše poprave i zauzimaju i do 75% manje memorije na disku u odnosu na stari .DOC."
          ]
        },
        {
          heading: "2. Pet besplatnih načina da otvorite i uredite DOCX bez kupovine Worda",
          body: [
            "Ne morate trošiti novac na skupe licence da biste pročitali ili dopunili dokument. Evo provjerenih načina:"
          ],
          bullets: [
            "Google Dokumenti (Google Docs): Najpopularnije rješenje. Sve što vam treba je besplatan Google nalog. Otvorite Google Drive, prevucite DOCX fajl i otvorite ga u pretraživaču. Možete ga mijenjati, dijeliti link i ponovo preuzeti kao DOCX ili PDF.",
            "Microsoft 365 za web (Office Online): Malo korisnika zna da Microsoft nudi potpuno besplatnu web verziju Worda na stranici office.com. Iako ima nešto manje naprednih funkcija u odnosu na desktop verziju, 100% je vjerna originalnom formatiranju.",
            "LibreOffice i OnlyOffice: Vrhunski besplatni open-source programi koje možete instalirati na Windows, Mac ili Linux. Rade offline i podržavaju sve funkcije kancelarijskog poslovanja.",
            "Mobilne aplikacije: Na Android i iOS uređajima zvanična aplikacija Microsoft 365 ili Google Docs omogućavaju besplatno čitanje i osnovno uređivanje dokumenata na telefonu.",
            "BH KONVER DOCX Preview i Konverzija: Na BH KONVER-u možete trenutno otvoriti pregled dokumenta ili pretvoriti PDF u Word i Word u PDF direktno u svom pregledniku, uz poštovanje privatnosti."
          ],
          callout: {
            type: "tip",
            title: "Trik za vađenje slika iz Worda",
            text: "Trebaju vam slike iz Word dokumenta u punom kvalitetu? Preimenujte 'dokument.docx' u 'dokument.zip', raspakujte ga programom WinRAR ili 7-Zip, i u mapi 'word/media' naći ćete sve slike!"
          }
        },
        {
          heading: "3. Zašto je za slanje zvaničnih dokumenata bolji PDF od DOCX-a?",
          body: [
            "Iako je DOCX odličan dok pišete tekst, nikada ga nemojte slati kao konačnu verziju poslodavcu ili klijentu (osim ako to izričito ne traže).",
            "Razlog: DOCX zavisi od fontova instaliranih na računaru primaoca. Ako primalac nema font koji ste vi koristili, njegov Word će automatski zamijeniti font, što može uništiti prelom stranice, tabele i potpis.",
            "Uvijek pretvorite svoj finalni DOCX u PDF prije slanja putem e-maila – PDF garantuje da će dokument izgledati identično na svakom ekranu i štampaču."
          ]
        }
      ],
      faq: [
        {
          question: "Mogu li starije verzije Worda otvoriti DOCX fajlove?",
          answer: "Microsoft Word 2007 i noviji ga otvaraju fabrički. Za verzije 2000 i 2003 bio je potreban Compatibility Pack, ali danas je najbolje koristiti besplatni Google Docs ili LibreOffice."
        },
        {
          question: "Da li je DOCX siguran format ili može sadržavati viruse?",
          answer: "DOCX sam po sebi ne izvršava makroe (za makroe se koristi format .DOCM). Ipak, nikada ne otvarajte dokumente pristigle sa nepoznatih e-mail adresa bez antivirusne provjere."
        }
      ]
    }
  },
  {
    id: "sta-je-heic-fajl-kako-pretvoriti-u-jpg",
    slug: "sta-je-heic-fajl-kako-pretvoriti-u-jpg",
    title: "Šta je HEIC fajl i zašto ga vaš računar ne može otvoriti?",
    subtitle: "Zašto iPhone koristi HEIC, kako ga jednostavno pretvoriti u standardni JPG/PNG i kako promijeniti postavke na telefonu",
    excerpt: "Prebacili ste fotografije s iPhonea na Windows računar i dobili grešku da format nije podržan? Naučite šta je HEIC format i kako ga pretvoriti u JPG u sekundi.",
    category: "Slike & Formati",
    author: {
      name: "Alen Jusufović",
      role: "Osnivač & Tehnički urednik BH KONVER",
    },
    date: "14. Oktobar 2026",
    isoDate: "2026-10-14T09:00:00Z",
    readTime: "5 min čitanja",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    badge: "Rješenje problema",
    tags: ["HEIC", "JPG", "iPhone", "Apple", "Konverzija slika", "HEIF", "Windows", "Fotografija"],
    seoTitle: "Šta je HEIC fajl i kako ga pretvoriti u JPG | BH KONVER",
    seoDescription: "Naučite šta je HEIC format sa iPhone uređaja, zašto ga Windows često ne otvara i kako ga u par sekundi besplatno pretvoriti u JPG na BH KONVER-u.",
    relatedTool: {
      name: "Slika u PDF i alati za formate",
      path: "/slika-pdf",
      description: "Pretvorite vaše fotografije (HEIC, PNG, WebP) u standardni PDF ili JPG.",
    },
    content: {
      lead: "Korisnici iPhonea često se susretnu sa neugodnim iznenađenjem kada pokušaju učitati fotografiju lične karte, računa ili diplomskog rada na državni portal, prijavu za posao ili na Windows računar – stranica prijavi 'Nedozvoljen format datoteke: .heic'. O čemu se zapravo radi?",
      sections: [
        {
          heading: "1. Zašto Apple koristi HEIC format?",
          body: [
            "HEIC (High Efficiency Image Container) je Appleova verzija HEIF (High Efficiency Image File Format) standarda. Uveden je 2017. godine sa iOS 11 operativnim sistemom.",
            "Glavni razlog za uvođenje HEIC formata je ušteda prostora. Zahvaljujući modernoj HEVC (H.265) kompresiji, HEIC fotografija zauzima otprilike 50% manje memorije u odnosu na klasični JPEG, a pri tome pruža čak i bolji kvalitet slike!",
            "Pored toga, HEIC podržava 16-bitni raspon boja (u poređenju sa 8-bitnim JPEG-om), providnost pozadine (poput PNG-a) i može unutar jedne datoteke čuvati seriju fotografija (Burst shots) ili Apple 'Live Photos' sa pratećim zvukom."
          ]
        },
        {
          heading: "2. Zašto nastaje problem sa otvaranjem na Windows računarima?",
          body: [
            "JPEG je standard star preko 30 godina i podržava ga apsolutno svaki softver na planeti. HEIC je relativno nov format čiji kodeci zahtijevaju licence.",
            "Windows 10 i 11 po fabričkim postavkama često nemaju instaliran kodek za otvaranje HEIC datoteka (Microsoft traži kupovinu ekstenzije u Storeu za 0.99$ ili instalaciju vanjskih kodeka).",
            "Također, većina web obrazaca u bankama, fakultetima i javnim institucijama u Bosni i Hercegovini i regiji programirana je da prihvata isključivo .jpg, .jpeg, .png ili .pdf."
          ],
          callout: {
            type: "warning",
            title: "Upozorenje za online prijave",
            text: "Ukoliko konkurišete za posao ili vizu, nikada ne prilažite dokumente u .heic formatu jer ih komisija na Windows računarima vjerovatno neće moći otvoriti."
          }
        },
        {
          heading: "3. Kako pretvoriti HEIC u JPG na BH KONVER-u",
          body: [
            "Najjednostavnije rješenje jeste korištenje BH KONVER alata:",
            "1. Otvorite modul za slike na BH KONVER-u.",
            "2. Prevucite svoje .heic fotografije direktno u preglednik.",
            "3. Sistem automatski dešifruje sliku lokalno na vašem uređaju i priprema preuzimanje u JPG formatu ili spajanje u PDF dokument.",
            "4. Cijeli proces traje nekoliko sekundi, a vaše privatne slike ne šalju se na sumnjive inostrane servere."
          ]
        },
        {
          heading: "4. Kako trajno podesiti iPhone da snima u JPG umjesto HEIC?",
          body: [
            "Ako ne želite stalno konvertovati fotografije, možete reći svom telefonu da ubuduće sve snima u JPG formatu:",
            "1. Otvorite 'Settings' (Postavke) na svom iPhone-u.",
            "2. Pomjerite prema dolje i izaberite 'Camera' (Kamera).",
            "3. Dodirnite opciju 'Formats' (Formati) na vrhu.",
            "4. Umjesto 'High Efficiency' (Visoka efikasnost), izaberite 'Most Compatible' (Najkompatibilnije).",
            "Nakon ovoga, svaka nova fotografija biće automatski sačuvana kao univerzalni .JPEG fajl!"
          ]
        }
      ],
      faq: [
        {
          question: "Da li gubim kvalitet slike kada pretvorim HEIC u JPG?",
          answer: "Gubitak je golim okom potpuno neprimjetan ukoliko se konverzija obavi sa visokim nivoom kompresije (preko 90%), što je standard na BH KONVER-u."
        },
        {
          question: "Može li Android telefon otvoriti HEIC?",
          answer: "Većina novijih Android telefona (Android 9 i noviji) bez problema otvara HEIC fajlove, ali ih starije verzije ne prepoznaju bez namjenskih aplikacija."
        }
      ]
    }
  },
  {
    id: "sta-je-html-fajl-i-kako-ga-koristiti",
    slug: "sta-je-html-fajl-i-kako-ga-koristiti",
    title: "Šta je HTML fajl i šta s njim kada ga preuzmete na računar?",
    subtitle: "Vodič za razumijevanje web stranica, sačuvanih računa, e-mail arhiva i konverziju HTML-a u PDF ili DOCX",
    excerpt: "Preuzeli ste fajl sa ekstenzijom .html ili .htm i niste sigurni čemu služi? Otkrijte kako ga otvoriti, pregledati izvorni kod ili pretvoriti u praktičan PDF dokument.",
    category: "Web & Tehnologija",
    author: {
      name: "BH KONVER Edukativni tim",
      role: "Digitalni vodiči i produktivnost",
    },
    date: "14. Oktobar 2026",
    isoDate: "2026-10-14T08:30:00Z",
    readTime: "5 min čitanja",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    badge: "Web osnove",
    tags: ["HTML", "HTML u PDF", "Web stranice", "Web kod", "Konverzija", "Preglednik", "Korisni savjeti"],
    seoTitle: "Šta je HTML fajl i kako ga otvoriti i pretvoriti | BH KONVER",
    seoDescription: "Sve što trebate znati o HTML fajlovima: kako ih otvoriti, šta znače tagovi i kako sačuvane web račune pretvoriti u PDF ili Word dokument.",
    relatedTool: {
      name: "HTML alati BH KONVER",
      path: "/alati",
      description: "Pretvorite HTML kod ili sačuvane stranice u uredan PDF dokument ili DOCX tekst.",
    },
    content: {
      lead: "Kada sa interneta spremite stranicu za čitanje offline, preuzmete bankovni izvod sa e-banking portala ili sačuvate kartu za koncert, na računaru se često pojavi ikonica sa oznakom Chrome, Edge ili Firefox i nastavkom '.html'. Šta je to zapravo?",
      sections: [
        {
          heading: "1. Šta označava skraćenica HTML?",
          body: [
            "HTML je skraćenica za 'HyperText Markup Language' (jezik za označavanje hiperteksta). To nije programski jezik u klasičnom smislu, već opisni kod koji web preglednicima govori kako da rasporede elemente na stranici: gdje je naslov, gdje pasus, gdje slika, a gdje tabela.",
            "Svaka web stranica koju posjetite – od Googlea, YouTubea pa do BH KONVER-a – u svojoj osnovi je strukturisana pomoću HTML koda.",
            "Ako otvorite HTML fajl običnim tekstualnim programom (poput Notepad-a), vidjećete oznake poput <h1>, <p>, <a> ili <table>. Kada isti taj fajl otvorite u pregledniku, pretraživač 'pročita' te oznake i pretvori ih u lijepo dizajniranu stranicu."
          ]
        },
        {
          heading: "2. Kako jednostavno otvoriti HTML fajl?",
          body: [
            "Za otvaranje HTML fajla ne trebate nikakve posebne alate – alat već imate na računaru i telefonu:"
          ],
          bullets: [
            "Dvostruki klik mišem: Standardno će se otvoriti u vašem zadanom web pretraživaču (Google Chrome, Microsoft Edge, Mozilla Firefox ili Safari). Ne brinite, za otvaranje lokalnog .html fajla uglavnom vam nije potrebna internet veza.",
            "Pregled koda (za radoznale): Kliknite desnim tasterom na fajl, izaberite 'Open with' (Otvori pomoću) i odaberite 'Notepad' (Blok za pisanje). Tu možete vidjeti i promijeniti čist tekst.",
            "Uređivanje za programere: Koristite napredne besplatne editore poput VS Code, Notepad++ ili Sublime Text sa isticanjem sintakse."
          ]
        },
        {
          heading: "3. Zašto i kako pretvoriti HTML u PDF?",
          body: [
            "Iako je HTML odličan za interaktivno čitanje, ima veliku manu za arhiviranje: ako HTML fajl koristi eksterne slike ili stilove sa interneta, a vi niste spojeni na mrežu, stranica se može prikazati polomljeno.",
            "Također, ako želite sačuvati potvrdu o uplati, avionsku kartu ili račun sa web shopa, mnogo je sigurnije pretvoriti ga u PDF.",
            "Na platformi BH KONVER razvili smo napredne konvertore koji omogućavaju da:",
            "- Pretvorite sirovi HTML kod ili fajl u kristalno čist PDF sa sačuvanim tabelama i stilovima.",
            "- Konvertujete HTML tabele u Excel (XLSX) format za dalju obradu podataka.",
            "- Izvučete čist tekst bez dosadnih programskih tagova."
          ],
          callout: {
            type: "tip",
            title: "Brza prečica za štampanje u PDF",
            text: "Kada otvorite HTML fajl u Chromeu ili Edgeu, pritisnite tipke CTRL + P (ili CMD + P na Macu), te kao štampač izaberite 'Save as PDF' (Sačuvaj kao PDF)."
          }
        }
      ],
      faq: [
        {
          question: "Da li je HTML fajl bezbjedan za otvaranje?",
          answer: "Sam HTML fajl sadrži tekst i oznake, ali može sadržavati i JavaScript skripte. Ako ste preuzeli fajl sa pouzdanog portala (npr. banka ili avio-kompanija), potpuno je bezbjedan."
        },
        {
          question: "Koja je razlika između .html i .htm ekstenzije?",
          answer: "Nema nikakve funkcionalne razlike. Ekstenzija .htm se koristila na starim DOS sistemima koji su podržavali maksimalno 3 slova u ekstenziji (poput .doc umjesto .docx)."
        }
      ]
    }
  },
  {
    id: "kako-pretvoriti-pdf-u-word-besplatno",
    slug: "kako-pretvoriti-pdf-u-word-besplatno",
    title: "Kako brzo i besplatno pretvoriti PDF u Word bez gubitka formata",
    subtitle: "Saznajte kako sačuvati raspored teksta, tabele i slike prilikom pretvaranja PDF dokumenata u Microsoft Word (DOCX)",
    excerpt: "Vodič za savršenu konverziju PDF dokumenata u uredive DOCX fajlove. Kako izbjeći lomljenje teksta, sačuvati dijakritičke znakove i tabele.",
    category: "Dokumenti & PDF",
    author: {
      name: "BH KONVER Edukativni tim",
      role: "Digitalni vodiči i produktivnost",
    },
    date: "10. Oktobar 2026",
    isoDate: "2026-10-10T12:00:00Z",
    readTime: "4 min čitanja",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    badge: "Najčitanije",
    tags: ["PDF", "Word", "DOCX", "OCR", "Besplatno", "Konverzija"],
    seoTitle: "Kako pretvoriti PDF u Word besplatno | BH KONVER",
    seoDescription: "Saznajte kako sačuvati raspored teksta, tabele i slike prilikom pretvaranja PDF dokumenata u Microsoft Word (DOCX) direktno u pregledniku.",
    relatedTool: {
      name: "PDF u Word alat",
      path: "/alati",
      description: "Pretvorite PDF u DOCX uz očuvanje rasporeda.",
    },
    content: {
      lead: "Koliko vam se puta desilo da vam neko pošalje ugovor ili obrazac u PDF formatu koji morate hitno dopuniti, a vi nemate plaćeni Adobe Acrobat Pro? Srećom, konverzija u DOCX nikada nije bila jednostavnija.",
      sections: [
        {
          heading: "Dva načina konverzije na BH KONVER-u",
          body: [
            "1. Vizuelna brza kopija (Lokalno u pregledniku): Ako vam je važno da dokument odmah pogledate i izvučete tekst bez slanja fajla na server, naš klijentski konvertor to završava za par sekundi.",
            "2. PRO urediva konverzija (Sa OCR prepoznavanjem): Ako je dokument skeniran ili fotografisan telefonom, naš inteligentni sistem prepoznaje slova, rekonstruiše paragrafe i kreira pravi Word dokument u kojem možete mijenjati svaku riječ."
          ]
        }
      ]
    }
  },
  {
    id: "vodic-kroz-pdv-u-bih-17-posto",
    slug: "vodic-kroz-pdv-u-bih-17-posto",
    title: "Vodič kroz PDV u BiH: Kako tačno izračunati osnovicu i 17% poreza",
    subtitle: "Jednostavne matematičke formule za dodavanje ili izdvajanje PDV-a iz bruto iznosa, uz naš kalkulator",
    excerpt: "Objasnili smo formulu preračunate stope od 14.5299% za brzo izdvajanje PDV-a iz konačnog računa i kako izbjeći greške pri fakturisanju.",
    category: "Finansije & Kalkulatori",
    author: {
      name: "Alen Jusufović",
      role: "Osnivač & Tehnički urednik BH KONVER",
    },
    date: "05. Oktobar 2026",
    isoDate: "2026-10-05T11:00:00Z",
    readTime: "5 min čitanja",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    badge: "Finansije",
    tags: ["PDV", "BiH", "Porezi", "Kalkulator", "17 posto", "Fakture"],
    seoTitle: "PDV u BiH 17%: Kako izračunati osnovicu i porez | BH KONVER",
    seoDescription: "Objasnili smo matematičke formule za dodavanje ili izdvajanje PDV-a iz bruto iznosa, uz primjenu našeg besplatnog online kalkulatora.",
    relatedTool: {
      name: "PDV Kalkulator BiH",
      path: "/kalkulatori/pdv",
      description: "Trenutan proračun osnovice, iznosa PDV-a i ukupnog iznosa.",
    },
    content: {
      lead: "U Bosni i Hercegovini primjenjuje se jedinstvena stopa poreza na dodatu vrijednost od 17%. Ipak, mnogi privrednici i građani griješe kada pokušavaju saznati koliko je tačno PDV-a sadržano u maloprodajnoj cijeni.",
      sections: [
        {
          heading: "Tajna preračunate stope od 14,5299%",
          body: [
            "Ako artikal košta 117 KM sa PDV-om, PDV ne iznosi 17% od 117 KM! Formula za izdvajanje PDV-a iz ukupne cijene je: Ukupno × (17 / 117) = Ukupno × 0,145299.",
            "Za osnovicu od 100 KM, 17% dodanog poreza je tačno 17 KM (Ukupno 117 KM). Kada od 117 KM oduzmete 14,5299%, dobijate tačno 17 KM poreza i 100 KM osnovice."
          ]
        }
      ]
    }
  },
  {
    id: "priprema-za-vozacki-ispit-saobracajni-testovi",
    slug: "priprema-za-vozacki-ispit-saobracajni-testovi",
    title: "Priprema za vozački ispit u BiH: Najčešće greške na saobraćajnom testu",
    subtitle: "Pregled ključnih saobraćajnih pravila, raskrsnica i pravila prvenstva prolaza",
    excerpt: "Saznajte koja pitanja najčešće zbune kandidate na teorijskom ispitu za B kategoriju u BiH i provjerite svoje znanje online.",
    category: "Edukativni testovi",
    author: {
      name: "BH KONVER Edukativni tim",
      role: "Edukacija i testovi",
    },
    date: "01. Oktobar 2026",
    isoDate: "2026-10-01T14:00:00Z",
    readTime: "6 min čitanja",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
    badge: "Vozački ispit",
    tags: ["Vozački", "Saobraćaj", "Testovi", "BiH", "Raskrsnice", "Kviz"],
    seoTitle: "Priprema za vozački ispit u BiH: Saobraćajni testovi | BH KONVER",
    seoDescription: "Pregled ključnih saobraćajnih pravila, raskrsnica i pravila prvenstva prolaza koje kandidati najčešće pogriješe tokom polaganja teorijskog ispita.",
    relatedTool: {
      name: "Saobraćajni test online",
      path: "/testovi/saobracajni",
      description: "Riješite interaktivna pitanja iz saobraćaja uz trenutnu bodovnu evaluaciju.",
    },
    content: {
      lead: "Polaganje teorijskog dijela vozačkog ispita zahtijeva visoku koncentraciju. Najveći procenat grešaka ne nastaje na poznavanju znakova, već na kompleksnim raskrsnicama sa policajcem, semaforima i vozilima sa prvenstvom prolaza.",
      sections: [
        {
          heading: "Zlatna hijerarhija saobraćajnih pravila",
          body: [
            "Uvijek zapamtite redoslijed prioriteta:",
            "1. Naredbe i znakovi ovlašćenog lica (saobraćajnog policajca) – nadređeni su svemu ostalom!",
            "2. Svjetlosni saobraćajni znakovi (semafori).",
            "3. Saobraćajni znakovi (trougao, stop, znak prioriteta).",
            "4. Oznake na kolovozu (linije i strelice).",
            "5. Opšte pravilo desne strane (uključujući pravilo lijevog skretanja)."
          ]
        }
      ]
    }
  },
  {
    id: "qr-kodovi-za-poslovanje-ugostiteljstvo",
    slug: "qr-kodovi-za-poslovanje-ugostiteljstvo",
    title: "QR kodovi za poslovanje i ugostiteljstvo: Kako napraviti besplatan meni ili kontakt",
    subtitle: "Kreirajte atraktivne i funkcionalne QR kodove za linkove, PDF cjenovnike, Wi-Fi pristup i vCard",
    excerpt: "Kako ugostitelji i preduzetnici u BiH mogu jednostavno postaviti QR kod na stolove ili vizitkartu bez plaćanja mjesečnih pretplata stranim servisima.",
    category: "Generatori & Alati",
    author: {
      name: "Alen Jusufović",
      role: "Osnivač & Tehnički urednik BH KONVER",
    },
    date: "28. Septembar 2026",
    isoDate: "2026-09-28T16:00:00Z",
    readTime: "4 min čitanja",
    image: "https://images.unsplash.com/photo-1595079672139-62540915f0eb?auto=format&fit=crop&w=1200&q=80",
    badge: "Biznis savjeti",
    tags: ["QR kod", "Generator", "Ugostiteljstvo", "Meni", "Wi-Fi", "Biznis"],
    seoTitle: "QR kodovi za ugostiteljstvo i biznis | BH KONVER",
    seoDescription: "Kreirajte besplatne QR kodove za PDF cjenovnike, linkove, vizitkarte i Wi-Fi pristup u samo par sekundi na BH KONVER-u.",
    relatedTool: {
      name: "QR Code Generator",
      path: "/category/generatori?tab=qr",
      description: "Generišite čiste i prilagodljive QR kodove bez isteka trajanja.",
    },
    content: {
      lead: "Nakon pandemije, digitalni meniji postali su standard u kafićima i restoranima. Međutim, mnogi ugostitelji plaćaju skupe inostrane servise koji zaključavaju kod nakon 14 dana.",
      sections: [
        {
          heading: "Kako postaviti trajan i besplatan QR meni",
          body: [
            "1. Vaš PDF cjenovnik postavite na Google Drive ili vašu web stranicu i osigurajte da je link javan ('Anyone with the link can view').",
            "2. Kopirajte link i unesite ga u BH KONVER QR Code Generator.",
            "3. Preuzmite PNG sliku koda u visokoj rezoluciji spremnu za štampu na stolnim stalcima ili naljepnicama.",
            "Naš QR kod je statičan i trajan – nema skrivenih pretplata, isteka trajanja ili preusmjeravanja!"
          ]
        }
      ]
    }
  }
];

export const BLOG_CATEGORIES = [
  "Svi članci",
  "Video & Audio",
  "Dokumenti & PDF",
  "Slike & Formati",
  "Web & Tehnologija",
  "Finansije & Kalkulatori",
  "Edukativni testovi",
  "Generatori & Alati",
] as const;
