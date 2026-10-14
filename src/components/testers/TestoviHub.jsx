import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, CarFront, Landmark, Sparkles, CheckCircle2, Crown, Trophy } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { FreemiumPaywallModal } from "@/components/free-tools/FreemiumPaywallModal";
import { BackButton } from "@/components/common/BackButton";

const tests = [
  {
    title: "Opšte znanje o BiH",
    description: "Kratki i zanimljivi kviz o geografiji, gradovima, historiji i bogatoj kulturi Bosne i Hercegovine.",
    icon: Landmark,
    to: "/testovi/opste-znanje",
    badge: "Freemium dostupno",
    questions: "10 pitanja",
  },
  {
    title: "Saobraćajni test",
    description: "Provjerite i utvrdite znanje saobraćajnih propisa, znakova i pravila prvenstva prolaza na raskrsnicama.",
    icon: CarFront,
    to: "/testovi/saobracajni",
    badge: "Freemium dostupno",
    questions: "10 pitanja",
  },
  {
    title: "IQ i logički test",
    description: "Testirajte svoje logičko zaključivanje, prepoznavanje niza brojeva i misaone obrasce.",
    icon: Brain,
    to: "/testovi/logika",
    badge: "Freemium dostupno",
    questions: "10 zadataka",
  },
  {
    title: "Test ličnosti",
    description: "Informativna samoprocjena koja vam pomaže da bolje razumijete svoje lične preferencije i radne navike.",
    icon: Sparkles,
    to: "/testovi/licnost",
    badge: "Freemium dostupno",
    questions: "Kratka procjena",
  },
];

export default function TestoviHub() {
  const [paywallOpen, setPaywallOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title="Online kvizovi i testovi znanja | BH KONVER"
        description="Isprobajte Freemium testove opšteg znanja o BiH, saobraćajnih propisa, logičke IQ zadatke i test ličnosti. Brzo, zabavno i bez čekanja."
        path="/testovi"
        jsonLd={{
          "@type": "CollectionPage",
          name: "Testovi i kvizovi BH KONVER",
          description: "Interaktivni Freemium kvizovi i testovi znanja.",
        }}
      />
      <Navbar activeCategory="TESTOVI" />
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <BackButton label="← Povratak na početnu" fallbackTo="/" />
        </div>
        {/* Hero Page Stranice Rubrike TESTOVI s prijateljskom porukom i Freemium najavom */}
        <section className="mb-8 rounded-3xl border border-border/80 p-6 sm:p-10 shadow-sm glass-panel">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Trophy className="h-3.5 w-3.5" />
              <span>DOBRO DOŠLI U TESTOVE ZNANJA · FREEMIUM</span>
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Dobro došli! Pozivamo vas da testirate svoje znanje i vještine
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Želite provjeriti koliko dobro poznajete Bosnu i Hercegovinu, ponoviti saobraćajna pravila prije vožnje, razmrdati vijuge logičkim zadacima ili istražiti svoj profil ličnosti? Na pravom ste mjestu! Svi testovi na BH Konveru dostupni su kao <strong>Freemium opcija</strong> – možete odmah započeti rješavanje pitanja, dobiti trenutne bodove i provjeriti tačne odgovore potpuno besplatno, bez ikakvog čekanja.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-foreground">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Svi testovi dostupni besplatno
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Trenutni bodovni rezultati
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Bez registracije za osnovni test
              </span>
            </div>
          </div>
        </section>

        {/* Kartice dostupnih testova */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-foreground sm:text-lg mb-4">Dostupni Freemium testovi</h2>
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
                    Započni test <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Zamagljena Premium opcija za Freemium korisnike + Fluidni CTA */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-6 sm:p-8 shadow-sm">
          <div className="filter blur-[1.5px] select-none opacity-60 pointer-events-none">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">Službeni PDF Certifikat o položenom testu</span>
                <p className="mt-1 text-xs text-muted-foreground">Verifikovani dokument s vašim imenom, postignutim procentom i QR potvrdom.</p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">Detaljna psihološka i logička analiza odgovora</span>
                <p className="mt-1 text-xs text-muted-foreground">Komparativna statistika, analiza snaga i preporuke za poboljšanje vještina.</p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/40">
                <span className="text-xs font-bold text-foreground">Neograničeno ponavljanje s novim setovima pitanja</span>
                <p className="mt-1 text-xs text-muted-foreground">Baza od preko 500 naprednih pitanja i praćenje vašeg napretka kroz vrijeme.</p>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-[3px] p-4 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Crown className="h-3.5 w-3.5" /> PRO NAPREDNE ANALIZE
            </span>
            <p className="mt-2 text-sm font-semibold text-foreground max-w-md">
              Svi testovi su besplatni za rješavanje. Ako želite službeni PDF certifikat i detaljnu analizu svakog odgovora, pogledajte našu Premium ponudu.
            </p>
            <button
              type="button"
              onClick={() => setPaywallOpen(true)}
              className="mt-3.5 inline-flex items-center gap-2 rounded-xl fluid-cta px-5 py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Sparkles className="h-4 w-4" /> Otključaj puni izvještaj i certifikat (PayPal & Banka)
            </button>
          </div>
        </div>
      </main>

      <Footer activeCategory="TESTOVI" />
      <FreemiumPaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        title="Premium certifikati i analize"
        description="Otključajte detaljne izvještaje o rezultatima i službene certifikate o završenim testovima."
        redirectPath="/testovi"
      />
    </div>
  );
}
