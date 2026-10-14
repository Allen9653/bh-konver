import { Link } from "react-router-dom";
import { ArrowLeft, Cookie, ShieldCheck, Check, Info } from "lucide-react";
import { SEO } from "@/components/SEO";
import { PremiumFooter } from "@/components/PremiumFooter";

export default function CookiesPage() {
  const cookieTypes = [
    {
      title: "Neophodni kolačići (Essential Cookies)",
      badge: "Uvijek aktivni",
      description:
        "Ovi kolačići su neophodni za rad web aplikacije. Omogućavaju osnovne funkcije poput sigurnosti sesije, navigacije po stranicama i pristupa zaštićenim područjima korisničkog naloga. Aplikacija ne može ispravno funkcionisati bez ovih kolačića.",
      examples: ["Supabase sesijski tokeni za prijavu", "CSRF zaštita", "Podešavanja osnovne teme (tamna/svijetla)"],
    },
    {
      title: "Funkcionalni kolačići i memorija (Functional)",
      badge: "Preporučeno",
      description:
        "Omogućavaju web stranici da zapamti vaše odabire i pruži unaprijeđene, personalizovane funkcije. Na primjer, pamte odabrani jezik interfejsa (bosanski, ćirilica, engleski, njemački, turski), često korištene valute ili postavke konverzije.",
      examples: ["Odabir jezika u i18n sistemu (`bh_konver_lang`)", "Posljednje korišteni alati u historiji preglednika"],
    },
    {
      title: "Analitički i statistički kolačići (Analytics)",
      badge: "Anonimizovano",
      description:
        "Pomažu nam razumjeti kako posjetioci komuniciraju sa BH KONVER platformom prikupljanjem i prijavljivanjem informacija anonimno. Koristimo ih isključivo radi uočavanja grešaka, praćenja brzine učitavanja i optimizacije korisničkog iskustva.",
      examples: ["Agregirana statistika posjećenosti", "Praćenje brzine učitavanja stranica i alata"],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title="Politika kolačića (Cookies) — BH KONVER"
        description="Informacije o vrstama kolačića koje koristi BH KONVER, njihovoj svrsi i načinima upravljanja u vašem pregledniku."
        path="/kolacici"
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
            <Cookie className="h-4 w-4 text-accent" aria-hidden="true" />
            Transparentnost i privatnost
          </div>
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Posljednja izmjena: Oktobar 2026.</p>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Politika kolačića (Cookies)</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            Web stranica <strong className="font-semibold text-foreground">www.bh-konver.ba</strong> koristi kolačiće i srodne tehnologije kako bi osigurala besprijekoran rad alata, zapamtila vaše jezičke postavke i pružila sigurno okruženje za obradu datoteka.
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">Šta su kolačići?</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              Kolačići (cookies) su male tekstualne datoteke koje web poslužitelj šalje vašem pregledniku i koje se pohranjuju na vašem računaru ili mobilnom uređaju. Oni omogućavaju stranici da prepozna vaš uređaj i zapamti ključne postavke (poput jezika interfejsa ili prijave) kako ih ne biste morali ponovo unositi pri svakom prelasku na drugu stranicu.
            </p>
          </section>

          <div className="space-y-4">
            {cookieTypes.map((cookie) => (
              <section key={cookie.title} className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">{cookie.title}</h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {cookie.badge}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{cookie.description}</p>
                <div className="mt-4 rounded-md border border-border bg-background p-4">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Primjeri korištenja:</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                    {cookie.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-primary" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          <section className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">Kako možete kontrolisati kolačiće?</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              U svakom trenutku možete prilagoditi ili izbrisati kolačiće u postavkama vašeg internetskog preglednika (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari). Imajte na umu da isključivanje neophodnih kolačića može uticati na funkcionalnost prijave i rada pojedinih alata.
            </p>
          </section>

          <div className="flex flex-wrap gap-3 pt-2 text-sm">
            <Link to="/privatnost" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <ShieldCheck className="h-4 w-4" /> Politika privatnosti
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/uslovi-koristenja" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              Uslovi korištenja
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/sigurnost" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              Sigurnost
            </Link>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
