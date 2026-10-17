import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, Server, Cpu, Database, KeyRound, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { PremiumFooter } from "@/components/PremiumFooter";

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Cpu,
      title: "Obrada direktno u vašem pregledniku (Client-Side)",
      description:
        "Većina naših alata (preslovljavanje ćirilice i latinice, pretvarači mjernih jedinica, hidžretski kalendar, rimski brojevi, osnovne slike i dokumenti) izvršava se u potpunosti unutar vašeg web browsera. Vaši podaci i datoteke ne putuju na server.",
    },
    {
      icon: Lock,
      title: "256-bitna SSL / TLS enkripcija u prijenosu",
      description:
        "Kompletan saobraćaj prema domeni www.bh-konver.com zaštićen je industrijskim HTTPS protokolom sa modernim šifriranjem, sprečavajući neovlašteno presretanje ili modifikaciju podataka.",
    },
    {
      icon: Server,
      title: "Automatsko dnevno brisanje privremenih server datoteka",
      description:
        "Za kompleksne konverzije velikih dokumenata koje zahtijevaju serversku obradu, generiše se automatizovani cleanup job. Privremeni rezultati i fajlovi se trajno i nepovratno brišu u dnevnim ciklusima.",
    },
    {
      icon: KeyRound,
      title: "Kriptografski zaštićene lozinke i sesije",
      description:
        "Autentifikacija korisničkih računa koristi Supabase Auth infrastrukturu. Lozinke se čuvaju isključivo kao snažni jednosmjerni kriptografski hashevi, a sesije su zaštićene sigurnim tokenima.",
    },
    {
      icon: Database,
      title: "Nulta prodaja ili dijeljenje korisničkih podataka",
      description:
        "Ne prodajemo, ne iznajmljujemo i ne analiziramo sadržaj vaših dokumenata ili konvertovanih fajlova. Privatnost korisnika je naš osnovni inženjerski princip.",
    },
    {
      icon: ShieldCheck,
      title: "Bez suvišnih dozvola i bez instalacije softvera",
      description:
        "BH KONVER radi bez potrebe za instaliranjem sumnjivih desktop programa ili dodataka za preglednik, štiteći vaš operativni sistem od malvera i sigurnosnih ranjivosti.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title="Sigurnost i zaštita podataka — BH KONVER"
        description="Detaljan uvid u sigurnosnu arhitekturu BH KONVER-a: klijentska obrada, 256-bitna TLS enkripcija i automatsko brisanje server datoteka."
        path="/sigurnost"
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Povratak na početnu
        </Link>

        <header className="mb-10 border-b border-border pb-8 sm:mb-12 sm:pb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1.5 text-xs font-semibold text-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
            Sigurnost po dizajnu (Security by Design)
          </div>
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Posljednja izmjena: Oktobar 2026.</p>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Sigurnost i zaštita podataka</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            Saznajte kako arhitektura BH KONVER-a štiti vaše osjetljive dokumente, proračune i lične podatke kroz moderne tehnologije i stroga pravila privatnosti.
          </p>
        </header>

        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {securityFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <section className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">Naš inženjerski manifest privatnosti</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span><strong className="text-foreground">Lokalno prije clouda:</strong> Sve što je tehnički izvodivo u JavaScript/WebAssembly mašini izvršava se isključivo na vašem računaru.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span><strong className="text-foreground">Bez trajnog skladištenja:</strong> Serveri nikada trajno ne arhiviraju konvertovane korisničke datoteke.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span><strong className="text-foreground">Transparentnost u svakom trenutku:</strong> U svakom trenutku jasno naznačujemo da li se koristi klijentski ili serverski resurs.</span>
              </li>
            </ul>
          </section>

          <div className="flex flex-wrap gap-3 pt-2 text-sm">
            <Link to="/privatnost" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              Politika privatnosti
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/kolacici" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              Politika kolačića
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/pravne-napomene" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              Pravne napomene
            </Link>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
