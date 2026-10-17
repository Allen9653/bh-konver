import { lazy, Suspense, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Coins,
  WandSparkles,
  Calculator,
  ClipboardCheck,
  CircleHelp,
  ArrowRight,
  Sparkles,
  Crown,
  ShieldCheck,
  Zap,
  BookOpen,
  Ruler,
  CalendarDays,
  Thermometer,
  WholeWord,
  Building2,
} from "lucide-react";
import { PremiumHeader } from "@/components/PremiumHeader";
import { PremiumFooter } from "@/components/PremiumFooter";
import { CompactHeroConverter } from "@/components/home/CompactHeroConverter";
import { EthnoFuturaBackground } from "@/components/home/EthnoFuturaBackground";
import { SEO, SITE_URL } from "@/components/SEO";
import { AdSenseSlot } from "@/components/AdSenseSlot";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FreemiumPaywallModal } from "@/components/free-tools/FreemiumPaywallModal";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useSubscription } from "@/hooks/useSubscription";

const PayPalPaymentModal = lazy(() =>
  import("@/components/PayPalPaymentModal").then((module) => ({ default: module.PayPalPaymentModal }))
);

const FAQ_ITEMS = [
  {
    question: "Koje sve tačno opcije i alate nudi BH KONVER?",
    answer:
      "BH KONVER objedinjuje četiri ključne grupe modernih digitalnih alata: 1) Konvertori: valute (KM, EUR, USD, CHF, GBP itd.), mjerne jedinice (dužina, masa, površina, zapremina, temperatura), ćirilica/latinica, te brzi PDF alati i konverzija slika; 2) Generatori: QR kodovi za Wi-Fi, tekst i linkove, UUID v4 ključevi, SEO slugovi i linijski barkodovi (CODE128 i EAN); 3) Kalkulatori: potrošnja goriva i putni troškovi, PDV stopa 17% u BiH, kalkulator radnog staža i procjena troškova struje aparata; 4) Testovi: kviz o BiH, saobraćajni propisi za vozače, IQ logički zadaci i test ličnosti.",
  },
  {
    question: "Koje su cijene paketa i kako se vrši plaćanje (PayPal i banka)?",
    answer:
      "Svi osnovni alati dostupni su besplatno u Freemium modelu bez registracije. Za korisnike kojima je potreban neograničeni kapacitet, batch obrada i preuzimanje službenih specifikacija, nudimo povoljne Premium pakete (24h pristup za 2 KM, mjesečni ili godišnji). Plaćanje je omogućeno odmah putem PayPal-a (karticom), kao i direktnom uplatom na račun u banci u BiH (putem mobilnog bankarstva ili uplatnice). Za bankovnu uplatu pošaljite potvrdu na alen.jusufovic@proton.me ili podrska@bh-assistant.ba i pristup se aktivira odmah.",
  },
  {
    question: "Da li su moji podaci, tekstovi i dokumenti sigurni?",
    answer:
      "Apsolutno. Osnovne konverzije valuta, mjernih jedinica i teksta obrađuju se 100% lokalno unutar vašeg internet pretraživača – vaši podaci ne napuštaju vaš računar ili telefon. Dokumenti koji zahtijevaju serversku obradu prolaze kroz šifrovane kanale i automatski se trajno brišu u dnevnom ciklusu čišćenja.",
  },
  {
    question: "Kako funkcioniše Freemium pristup testovima i kalkulatorima?",
    answer:
      "Svi testovi i kalkulatori su u Freemium režimu. Možete odmah riješiti bilo koji test, dobiti bodove i vidjeti tačne odgovore, ili izračunati troškove goriva i PDV bez ikakve naplate. Premium pretplata je namijenjena onima koji žele napredni izvoz rezultata u PDF certifikat ili poslovne Excel specifikacije.",
  },
  {
    question: "Kako mogu kontaktirati podršku ili zatražiti novi alat?",
    answer:
      "Za sva pitanja, podršku pri uplati ili prijedloge novih alata, stojimo vam na raspolaganju putem e-maila: podrska@bh-assistant.ba, info@bh-assistant.ba, kao i direktno na e-mail osnivača: alen.jusufovic@proton.me. Možete nas kontaktirati i telefonom/Viberom na broj +387 62 580 207.",
  },
];

const CATEGORY_CARDS = [
  {
    id: "konvertori",
    title: "KONVERTORI",
    description: "Valute prema KM, dužina, masa, temperatura, pismo ćirilica/latinica i formati dokumenata.",
    image: "/categories/konvertori.png",
    icon: Coins,
    badge: "100% Besplatno",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    to: "/category/konvertori",
    popular: ["Valute (KM/EUR)", "Jedinice mjere", "Ćirilica / Latinica", "Slika u PDF"],
  },
  {
    id: "generatori",
    title: "GENERATORI",
    description: "Kreirajte QR kodove, UUID v4 identifikatore, SEO slugove za web i barkodove za artikle.",
    image: "/categories/generatori.png",
    icon: WandSparkles,
    badge: "Brzi alati",
    badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    to: "/category/generatori",
    popular: ["QR Kod Generator", "UUID v4", "SEO Slug", "CODE128 Barkod"],
  },
  {
    id: "kalkulatori",
    title: "KALKULATORI",
    description: "Kalkulator goriva i putnih troškova, PDV 17% BiH, proračun radnog staža i potrošnja struje.",
    image: "/categories/kalkulatori.png",
    icon: Calculator,
    badge: "Trenutni proračun",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    to: "/category/kalkulatori",
    popular: ["Kalkulator goriva", "PDV 17% BiH", "Radni staž", "Potrošnja struje"],
  },
  {
    id: "testovi",
    title: "TESTOVI",
    description: "Interaktivni kviz o BiH, saobraćajni testovi, IQ logički zadaci i samoprocjena ličnosti.",
    image: "/categories/testovi.png",
    icon: ClipboardCheck,
    badge: "Svi testovi Freemium",
    badgeColor: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
    to: "/category/testovi",
    popular: ["Znanje o BiH", "Saobraćajni test", "IQ & Logika", "Test ličnosti"],
  },
  {
    id: "blog",
    title: "BLOG & VODIČI",
    description: "Praktični vodiči i objašnjenja za video formate, DOCX, iPhone HEIC i digitalne alate.",
    image: "/categories/blog.png",
    icon: BookOpen,
    badge: "Baza znanja",
    badgeColor: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
    to: "/blog",
    popular: ["Video formati (MP4)", "Otvaranje DOCX", "iPhone HEIC u JPG", "Digitalni vodiči"],
  },
];

export default function Index() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const { hasActiveSubscription, expiresAt } = useSubscription(user?.id);
  const isPremium = isAdmin || hasActiveSubscription;
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallTab, setPaywallTab] = useState<"overview" | "bank">("overview");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const openPaywall = useCallback((tab: "overview" | "bank" = "overview") => {
    setPaywallTab(tab);
    setPaywallOpen(true);
  }, []);

  const freemiumTools = [
    {
      id: "valute",
      title: t("home.freemiumTools.currency.title", "KONVERTOR VALUTA"),
      desc: t("home.freemiumTools.currency.desc", "Preračunajte valute prema KM (BAM), EUR, USD, CHF, GBP, TRY i RSD u realnom vremenu po važećim kursevima."),
      icon: Coins,
      badge: "100% BESPLATNO",
      actionText: t("home.freemiumTools.currency.action", "Otvori Valute"),
      to: "/category/konvertori?view=basic&tab=currency",
    },
    {
      id: "jedinice",
      title: t("home.freemiumTools.units.title", "KONVERTOR JEDINICA MJERE, VISINE, TEŽINE, DUŽINE"),
      desc: t("home.freemiumTools.units.desc", "Pretvaranje dužine, visine, težine/mase, površine i standardnih metričkih i imperijalnih jedinica."),
      icon: Ruler,
      badge: "100% BESPLATNO",
      actionText: t("home.freemiumTools.units.action", "Otvori Mjere"),
      to: "/category/konvertori?view=basic&tab=unit",
    },
    {
      id: "hijri",
      title: t("home.freemiumTools.hijri.title", "Hijri Date Converter"),
      desc: t("home.freemiumTools.hijri.desc", "Convert dates between Gregorian and Islamic Hijri calendars (Umm al-Qura sistem proračuna)."),
      icon: CalendarDays,
      badge: "100% BESPLATNO",
      actionText: t("home.freemiumTools.hijri.action", "Convert Hijri"),
      to: "/category/konvertori?view=basic&tab=hijri",
    },
    {
      id: "temperature",
      title: t("home.freemiumTools.temperature.title", "Temperature Converter"),
      desc: t("home.freemiumTools.temperature.desc", "Convert between Celsius, Fahrenheit, and Kelvin uz verifikaciju fizičke apsolutne nule."),
      icon: Thermometer,
      badge: "100% BESPLATNO",
      actionText: t("home.freemiumTools.temperature.action", "Convert Temp"),
      to: "/category/konvertori?view=basic&tab=temperature",
    },
    {
      id: "roman",
      title: t("home.freemiumTools.roman.title", "Roman Numeral Date Converter"),
      desc: t("home.freemiumTools.roman.desc", "Convert dates and numbers to/from Roman numerals uz provjeru standardnog zapisa."),
      icon: WholeWord,
      badge: "100% BESPLATNO",
      actionText: t("home.freemiumTools.roman.action", "Convert Roman"),
      to: "/category/konvertori?view=basic&tab=roman",
    },
  ];

  const categoryCards = [
    {
      id: "konvertori",
      title: t("home.cards.converters.title", "KONVERTORI"),
      description: t("home.cards.converters.desc", "Valute prema KM, jedinice mjere (visina, težina, dužina), Hidžretski datum, Temperatura i Rimski brojevi."),
      image: "/categories/konvertori.png",
      icon: Coins,
      badge: t("home.cards.converters.badge", "100% Besplatno"),
      badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
      to: "/category/konvertori",
      popular: ["Konvertor valuta", "Jedinice & dužina", "Hijri Date", "Temperature", "Roman Numerals"],
    },
    {
      id: "generatori",
      title: t("home.cards.generators.title", "GENERATORI"),
      description: t("home.cards.generators.desc", "Kreirajte QR kodove, UUID v4 identifikatore, SEO slugove za web i barkodove za artikle."),
      image: "/categories/generatori.png",
      icon: WandSparkles,
      badge: t("home.cards.generators.badge", "Brzi alati"),
      badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
      to: "/category/generatori",
      popular: ["QR Kod Generator", "UUID v4", "SEO Slug", "CODE128 Barkod"],
    },
    {
      id: "kalkulatori",
      title: t("home.cards.calculators.title", "KALKULATORI"),
      description: t("home.cards.calculators.desc", "Kalkulator goriva i putnih troškova, PDV 17% BiH, proračun radnog staža i potrošnja struje."),
      image: "/categories/kalkulatori.png",
      icon: Calculator,
      badge: t("home.cards.calculators.badge", "Trenutni proračun"),
      badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
      to: "/category/kalkulatori",
      popular: ["Kalkulator goriva", "PDV 17% BiH", "Radni staž", "Potrošnja struje"],
    },
    {
      id: "testovi",
      title: t("home.cards.tests.title", "TESTOVI"),
      description: t("home.cards.tests.desc", "Interaktivni kviz o BiH, saobraćajni testovi, IQ logički zadaci i samoprocjena ličnosti."),
      image: "/categories/testovi.png",
      icon: ClipboardCheck,
      badge: t("home.cards.tests.badge", "Svi testovi Freemium"),
      badgeColor: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
      to: "/category/testovi",
      popular: ["Znanje o BiH", "Saobraćajni test", "IQ & Logika", "Test ličnosti"],
    },
    {
      id: "blog",
      title: t("home.cards.blog.title", "BLOG & VODIČI"),
      description: t("home.cards.blog.desc", "Vodiči kroz video formate, DOCX, iPhone HEIC i digitalne alate."),
      image: "/categories/blog.png",
      icon: BookOpen,
      badge: t("home.cards.blog.badge", "Baza znanja"),
      badgeColor: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
      to: "/blog",
      popular: ["Video formati (MP4)", "Otvaranje DOCX", "iPhone HEIC u JPG", "Digitalni vodiči"],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <SEO
        title="BH KONVER | Besplatni online konverteri i Premium alati"
        description="Besplatni online konverteri valuta, jedinica, teksta i datuma bez prijave. Premium generatori, kalkulatori i testovi za korisnike u Bosni i Hercegovini."
        path="/"
        jsonLd={[
          {
            "@type": "WebApplication",
            name: "BH KONVER",
            url: `${SITE_URL}/`,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            description:
              "Besplatni online konverteri valuta prema KM, mjernih jedinica, pisma i formata uz kalkulatore i testove.",
          },
          {
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          },
        ]}
      />

      <PremiumHeader
        user={user}
        isAdmin={isAdmin}
        isPremium={isPremium}
        expiresAt={expiresAt}
        onSignOut={signOut}
        loading={loading}
      />

      <main className="relative flex-1 overflow-hidden">
        {/* Subtle etno-futura stećak background with animated floating light cubes */}
        <EthnoFuturaBackground />

        {/* ========================================================
            HERO SEKCIJA ("STRUKTURA JEDNOG EKRANA")
            Glavni naslov, podnaslov i ugrađen konverter odmah pri vrhu!
        ======================================================== */}
        <section className="relative z-10 px-4 pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16">
          <div className="mx-auto max-w-5xl text-center">
            {/* Top pill / subtle branding */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t("home.badge", "SVI DIGITALNI ALATI NA JEDNOM MJESTU · BOSNA I HERCEGOVINA")}</span>
            </div>

            {/* Clear, focused headline - ŠTA JE BH KONVER? */}
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-3xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.1]">
              <span className="text-foreground">
                {t("home.heroTitleLead", "ŠTA JE ")}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-400 bg-clip-text text-transparent">
                {t("home.heroTitleBrand", "BH KONVER?")}
              </span>
            </h1>

            {/* Subtitle with exact requested text */}
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-300/90 sm:text-lg">
              {t(
                "home.heroDesc",
                "BH KONVER je moderna, brza i intuitivna web aplikacija namijenjena višenamjenskoj konverziji datoteka, valuta i mjernih jedinica na jednom mjestu. Projekat je razvijen s fokusom na jednostavnost korištenja, visoke performanse i potpunu privatnost korisničkih podataka."
              )}
            </p>

            {/* PRIMARNI ALAT ODMAH U HERO SEKCIJI (NULA SKROLOVANJA) */}
            <div className="mx-auto mt-7 max-w-4xl text-left">
              <CompactHeroConverter />
            </div>
          </div>
        </section>

        {/* ========================================================
            KONVERTOR FREEMIUM SU :
            Istaknuti segment besplatnih konvertora
        ======================================================== */}
        <section className="relative z-10 px-4 py-8 sm:py-10 border-t border-border/60">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                  {t("home.freemiumEyebrow", "BESPLATNI ALATI BEZ REGISTRACIJE")}
                </p>
                <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl flex items-center gap-2">
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {t("home.freemiumTitle", "KONVERTOR FREEMIUM SU :")}
                  </span>
                </h2>
              </div>
              <p className="text-xs text-muted-foreground sm:text-right max-w-md">
                {t(
                  "home.freemiumSubtitle",
                  "Svi navedeni konvertori dostupni su 100% besplatno bez ikakvih preuzimanja i bez čekanja, odmah u vašem pregledniku."
                )}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {freemiumTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    to={tool.to}
                    className="glass-panel glass-card-hover group flex flex-col justify-between rounded-2xl p-4 sm:p-5 shadow-sm transition-all hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-card/60"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                          {tool.badge}
                        </span>
                      </div>

                      <h3 className="mt-3.5 font-display text-sm font-bold text-foreground group-hover:text-emerald-400 transition-colors leading-snug">
                        {tool.title}
                      </h3>

                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs font-semibold text-emerald-400">
                      <span>{tool.actionText}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            KOMPAKTNE KARTICE KATEGORIJA (GRID OD 4 KARTICE)
        ======================================================== */}
        <section className="relative z-10 px-4 py-8 sm:py-10 border-t border-border/60">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {t("home.categoriesEyebrow", "KATEGORIJE ALATA")}
                </p>
                <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {t("home.categoriesTitle", "Odaberite željenu rubriku")}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground sm:text-right max-w-xs">
                {t("home.categoriesDesc", "Sve rubrike su dostupne odmah. Kliknite na bilo koju za otvaranje posvećene stranice sa svim opcijama.")}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {categoryCards.map((card) => {
                return (
                  <Link
                    key={card.id}
                    to={card.to}
                    className="glass-panel glass-card-hover group flex flex-col justify-between rounded-2xl p-5 shadow-sm transition-all hover:border-primary/50 bg-card/60"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/60 p-1.5 border border-primary/20 shadow-inner group-hover:scale-105 group-hover:border-primary/50 transition-all">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="h-full w-full object-contain drop-shadow"
                            loading="lazy"
                          />
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${card.badgeColor}`}
                        >
                          {card.badge}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{card.description}</p>

                      {/* Popular tool tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {card.popular.map((item) => (
                          <span
                            key={item}
                            className="rounded-md bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-foreground/80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-3 text-xs font-semibold text-primary">
                      <span>{t("home.openCategory", "Otvori rubriku")}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            MODERNI, FLUIDNI VIZUELNI CTA ZA PREMIUM I PLAĆANJE
        ======================================================== */}
        <section className="relative z-10 px-4 py-6">
          <div
            onClick={() => openPaywall("overview")}
            className="mx-auto max-w-5xl rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 p-5 sm:p-6 shadow-md backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-cyan-400 text-slate-950 shadow-md group-hover:scale-105 transition-transform">
                <Crown className="h-6 w-6 text-slate-950 font-bold" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t("home.premium.eyebrow", "PREMIUM & POSLOVNI PAKET")}
                </p>
                <h3 className="text-sm font-bold text-foreground sm:text-base group-hover:text-cyan-300 transition-colors">
                  {t("home.premium.title", "Potreban vam je neograničen pristup i PDF izvoz bez limita?")}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("home.premium.desc", "Plaćanje je omogućeno odmah putem PayPal-a ili direktnom uplatom na bankovni račun u BiH.")}
                </p>
              </div>
            </div>

            <div
              className="flex shrink-0 items-center gap-2.5 w-full sm:w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => openPaywall("overview")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold tracking-wider uppercase text-xs sm:text-sm py-3 px-5 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-[1.01] active:scale-[0.99]"
              >
                <Sparkles className="h-4 w-4" /> {t("home.premium.btn", "Pogledaj Premium ponudu")}
              </button>
              <button
                type="button"
                onClick={() => openPaywall("bank")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted hover:border-primary/50 transition-colors"
              >
                <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>{t("home.premium.contactBtn", "Kontakt & Banka")}</span>
              </button>
            </div>
          </div>
        </section>

        {/* AdSense slot prema standardima oglašavanja */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-3">
          <AdSenseSlot slotId="home-after-tools" />
        </div>

        {/* ========================================================
            MALI SEO BLOK (ACCORDION FAQ)
            Pitanja koja detaljno informišu o opcijama, cijenama,
            načinu plaćanja i privatnosti.
        ======================================================== */}
        <section className="relative z-10 px-4 py-10 sm:py-14 border-t border-border/60" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CircleHelp className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  {t("home.faq.eyebrow", "INFORMACIJE & FAQ")}
                </p>
                <h2 id="faq-heading" className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {t("home.faq.title", "Najčešća pitanja posjetilaca")}
                </h2>
              </div>
            </div>

            <Accordion type="single" collapsible className="glass-panel rounded-2xl px-4 sm:px-6 divide-y divide-border/60">
              {FAQ_ITEMS.map(({ question, answer }, index) => (
                <AccordionItem key={question} value={`faq-${index + 1}`} className="border-none py-1">
                  <AccordionTrigger className="gap-4 text-left text-sm font-semibold text-foreground hover:no-underline sm:text-base py-4">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-3xl text-sm leading-6 text-muted-foreground pb-4">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Blog link teaser section */}
        <section className="relative z-10 px-4 pb-12">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  {t("home.blogTeaser.title", "Želite saznati više o digitalnim formatima?")}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {t("home.blogTeaser.desc", "Posjetite našu novu rubriku Blog sa vodičima i savjetima.")}
                </p>
              </div>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
            >
              {t("home.blogTeaser.btn", "Čitaj Blog")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <FreemiumPaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        initialTab={paywallTab}
        title="BH KONVER Premium alati"
        description="Otključajte neograničeni kapacitet za masovnu konverziju, poslovne PDF specifikacije i certifikate. Plaćanje putem PayPal-a ili bankovnog računa u BiH."
        redirectPath="/"
      />

      {paymentModalOpen && (
        <Suspense fallback={null}>
          <PayPalPaymentModal
            open={paymentModalOpen}
            onOpenChange={setPaymentModalOpen}
            initialPlanId="24h"
          />
        </Suspense>
      )}

      <PremiumFooter />
    </div>
  );
}