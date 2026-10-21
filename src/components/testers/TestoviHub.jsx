import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Brain, CarFront, Landmark, Sparkles, CheckCircle2, Crown, Trophy } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { FreemiumPaywallModal } from "@/components/free-tools/FreemiumPaywallModal";
import { BackButton } from "@/components/common/BackButton";

const testConfigs = [
  {
    id: "general",
    icon: Landmark,
    to: "/testovi/opste-znanje",
  },
  {
    id: "traffic",
    icon: CarFront,
    to: "/testovi/saobracajni",
  },
  {
    id: "iq",
    icon: Brain,
    to: "/testovi/logika",
  },
  {
    id: "personality",
    icon: Sparkles,
    to: "/testovi/licnost",
  },
];

export default function TestoviHub() {
  const { t } = useTranslation();
  const [paywallOpen, setPaywallOpen] = useState(false);

  const tests = [
    {
      title: t("tests.generalTitle", "Opšte znanje o BiH"),
      description: t(
        "tests.generalDesc",
        "Kratki i zanimljivi kviz o geografiji, gradovima, historiji i bogatoj kulturi Bosne i Hercegovine."
      ),
      icon: Landmark,
      to: "/testovi/opste-znanje",
      badge: t("tests.freemiumBadge", "Freemium dostupno"),
      questions: t("tests.generalQuestions", "10 pitanja"),
    },
    {
      title: t("tests.trafficTitle", "Saobraćajni test"),
      description: t(
        "tests.trafficDesc",
        "Provjerite i utvrdite znanje saobraćajnih propisa, znakova i pravila prvenstva prolaza na raskrsnicama."
      ),
      icon: CarFront,
      to: "/testovi/saobracajni",
      badge: t("tests.freemiumBadge", "Freemium dostupno"),
      questions: t("tests.trafficQuestions", "10 pitanja"),
    },
    {
      title: t("tests.iqTitle", "IQ i logički test"),
      description: t(
        "tests.iqDesc",
        "Testirajte svoje logičko zaključivanje, prepoznavanje niza brojeva i misaone obrasce."
      ),
      icon: Brain,
      to: "/testovi/logika",
      badge: t("tests.freemiumBadge", "Freemium dostupno"),
      questions: t("tests.iqQuestions", "10 zadataka"),
    },
    {
      title: t("tests.personalityTitle", "Test ličnosti"),
      description: t(
        "tests.personalityDesc",
        "Informativna samoprocjena koja vam pomaže da bolje razumijete svoje lične preferencije i radne navike."
      ),
      icon: Sparkles,
      to: "/testovi/licnost",
      badge: t("tests.freemiumBadge", "Freemium dostupno"),
      questions: t("tests.personalityQuestions", "Kratka procjena"),
    },
  ];

  const pageTitle = t("tests.seoTitle", "Online kvizovi i testovi znanja | BH KONVER");
  const pageDescription = t(
    "tests.seoDesc",
    "Isprobajte Freemium testove opšteg znanja o BiH, saobraćajnih propisa, logičke IQ zadatke i test ličnosti. Brzo, zabavno i bez čekanja."
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title={pageTitle}
        description={pageDescription}
        path="/testovi"
        jsonLd={{
          "@type": "CollectionPage",
          name: pageTitle,
          description: pageDescription,
        }}
      />
      <Navbar activeCategory="TESTOVI" />
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <BackButton label={t("common.backToHome", "← Povratak na početnu")} fallbackTo="/" />
        </div>

        {/* Hero Section */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-9 shadow-2xl backdrop-blur-xl">
          {/* Ambient Background Watermark Logo */}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-80 sm:w-[480px] md:w-[600px] h-full pointer-events-none overflow-hidden select-none opacity-15 sm:opacity-20 flex items-center justify-end">
            <img
              src="/categories/testovi.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto max-h-[140%] object-contain filter drop-shadow-[0_0_60px_rgba(168,85,247,0.5)] transform translate-x-10 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/15 px-3.5 py-1 text-xs font-bold text-purple-300 shadow-sm">
                <Trophy className="h-3.5 w-3.5 text-purple-400" />
                <span>{t("tests.badge", "DOBRO DOŠLI U TESTOVE ZNANJA · FREEMIUM")}</span>
              </div>
              <h1 className="mt-4 font-display text-2xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-3xl lg:text-4xl">
                {t("tests.heroTitle", "Dobro došli! Pozivamo vas da testirate svoje znanje i vještine")}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-100 sm:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {t(
                  "tests.heroDesc",
                  "Želite provjeriti koliko dobro poznajete Bosnu i Hercegovinu, ponoviti saobraćajna pravila prije vožnje, razmrdati vijuge logičkim zadacima ili istražiti svoj profil ličnosti? Na pravom ste mjestu! Svi testovi na BH Konveru dostupni su kao Freemium opcija – možete odmah započeti rješavanje pitanja, dobiti trenutne bodove i provjeriti tačne odgovore potpuno besplatno, bez ikakvog čekanja."
                )}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-slate-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t("tests.benefit1", "Svi testovi dostupni besplatno")}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t("tests.benefit2", "Trenutni bodovni rezultati")}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t("tests.benefit3", "Bez registracije za osnovni test")}
                </span>
              </div>
            </div>

            <div className="relative shrink-0 self-center sm:self-auto flex items-center justify-center p-4 sm:p-6 rounded-3xl bg-slate-900/60 border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.35)] backdrop-blur-xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/25 via-pink-500/15 to-transparent rounded-3xl opacity-80 blur-xl pointer-events-none group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[1px] rounded-[23px] border border-white/10 pointer-events-none" />
              <img
                src="/categories/testovi.png"
                alt="Testovi BH KONVER"
                className="relative z-10 h-28 w-36 sm:h-36 sm:w-48 md:h-40 md:w-56 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Available Tests Cards */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-foreground sm:text-lg mb-4">
            {t("tests.availableTitle", "Dostupni Freemium testovi")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tests.map(({ title, description, icon: Icon, to, badge, questions }) => (
              <Link
                key={title}
                to={to}
                className="glass-panel glass-card-hover group flex flex-col justify-between rounded-2xl p-5 shadow-sm transition-all hover:border-primary/50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                      {badge}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {title}
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                  <span className="text-muted-foreground font-medium">{questions}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-primary group-hover:translate-x-1 transition-transform">
                    {t("tests.startTest", "Započni test")} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Premium Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-6 sm:p-8 shadow-sm">
          <div className="filter blur-[1.5px] select-none opacity-60 pointer-events-none">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">
                  {t("tests.feature1Title", "Službeni PDF Certifikat o položenom testu")}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("tests.feature1Desc", "Verifikovani dokument s vašim imenom, postignutim procentom i QR potvrdom.")}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">
                  {t("tests.feature2Title", "Detaljna psihološka i logička analiza odgovora")}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("tests.feature2Desc", "Komparativna statistika, analiza snaga i preporuke za poboljšanje vještina.")}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">
                  {t("tests.feature3Title", "Neograničeno ponavljanje s novim setovima pitanja")}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("tests.feature3Desc", "Baza od preko 500 naprednih pitanja i praćenje vašeg napretka kroz vrijeme.")}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-[3px] p-4 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Crown className="h-3.5 w-3.5" /> {t("tests.proTitle", "PRO NAPREDNE ANALIZE")}
            </span>
            <p className="mt-2 text-sm font-semibold text-foreground max-w-md">
              {t(
                "tests.proDesc",
                "Svi testovi su besplatni za rješavanje. Ako želite službeni PDF certifikat i detaljnu analizu svakog odgovora, pogledajte našu Premium ponudu."
              )}
            </p>
            <button
              type="button"
              onClick={() => setPaywallOpen(true)}
              className="mt-3.5 inline-flex items-center gap-2 rounded-xl fluid-cta px-5 py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Sparkles className="h-4 w-4" /> {t("tests.proCta", "Otključaj puni izvještaj i certifikat (PayPal & Banka)")}
            </button>
          </div>
        </div>
      </main>

      <Footer activeCategory="TESTOVI" />
      <FreemiumPaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        title={t("tests.paywallTitle", "Premium certifikati i analize")}
        description={t(
          "tests.paywallDesc",
          "Otključajte detaljne izvještaje o rezultatima i službene certifikate o završenim testovima."
        )}
        redirectPath="/testovi"
      />
    </div>
  );
}
