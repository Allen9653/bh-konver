import { Link } from "react-router-dom";
import { ArrowLeft, Scale, Shield, FileText, Globe, Mail, Phone } from "lucide-react";
import { SEO } from "@/components/SEO";
import { PremiumFooter } from "@/components/PremiumFooter";

export default function LegalNotice() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title="Pravne napomene (Impressum) — BH KONVER"
        description="Službeni pravni podaci o pružatelju usluge BH KONVER, registraciji, operateru B&H Assistant d.o.o. i kontaktu."
        path="/pravne-napomene"
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
            <Scale className="h-4 w-4 text-accent" aria-hidden="true" />
            Službeni podaci o platformi
          </div>
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Posljednja izmjena: Oktobar 2026.</p>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Pravne napomene (Impressum)</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            Informacije u skladu sa važećim zakonodavstvom o pružanju usluga informacionog društva i transparentnosti poslovanja za platformu <strong className="font-semibold text-foreground">BH KONVER</strong> (www.bh-konver.com).
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">Podaci o operateru i pružatelju usluge</h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-md border border-border bg-background p-4">
                <dt className="text-xs font-semibold uppercase text-muted-foreground">Naziv platforme</dt>
                <dd className="mt-1 text-base font-semibold text-foreground">BH KONVER</dd>
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                <dt className="text-xs font-semibold uppercase text-muted-foreground">Službena web adresa</dt>
                <dd className="mt-1 text-base font-semibold text-primary">www.bh-konver.com</dd>
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                <dt className="text-xs font-semibold uppercase text-muted-foreground">Pravni subjekt (Operater)</dt>
                <dd className="mt-1 text-base font-semibold text-foreground">B&amp;H Assistant d.o.o.</dd>
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                <dt className="text-xs font-semibold uppercase text-muted-foreground">Sjedište i lokacija</dt>
                <dd className="mt-1 text-base font-semibold text-foreground">Zenica, Bosna i Hercegovina</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">Službeni kontakt za pravne i poslovne upite</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:info@bh-assistant.ba"
                className="flex items-center gap-3 rounded-md border border-border bg-background p-4 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Službeni e-mail</p>
                  <p className="text-muted-foreground">info@bh-assistant.ba</p>
                </div>
              </a>
              <a
                href="mailto:alen.jusufovic@proton.me"
                className="flex items-center gap-3 rounded-md border border-border bg-background p-4 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Direktni e-mail osnivača</p>
                  <p className="text-muted-foreground">alen.jusufovic@proton.me</p>
                </div>
              </a>
              <a
                href="tel:+38762580207"
                className="flex items-center gap-3 rounded-md border border-border bg-background p-4 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Telefon / Viber / WhatsApp</p>
                  <p className="text-muted-foreground">+387 62 580 207</p>
                </div>
              </a>
              <a
                href="https://www.bh-assistant.ba"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md border border-border bg-background p-4 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Web portal kompanije</p>
                  <p className="text-muted-foreground">www.bh-assistant.ba</p>
                </div>
              </a>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">Intelektualno vlasništvo i odricanje odgovornosti</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                Sav sadržaj, dizajn, logotipi, programski kod i algoritmi implementirani na web aplikaciji www.bh-konver.com predstavljaju zaštićeno intelektualno vlasništvo. Zabranjena je svaka neovlaštena reprodukcija, distribucija ili eksploatacija u komercijalne svrhe bez prethodne pismene saglasnosti.
              </p>
              <p>
                Konverzije i izračuni na platformi pružaju se sa maksimalnom pažnjom na tačnost. Za specifične finansijske, poreske ili carinske postupke korisnici se upućuju na službene organe i institucije.
              </p>
            </div>
          </section>

          <div className="flex flex-wrap gap-3 pt-2 text-sm">
            <Link to="/uslovi-koristenja" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <FileText className="h-4 w-4" /> Pročitajte Uslove korištenja
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/privatnost" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <Shield className="h-4 w-4" /> Politika privatnosti
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/sigurnost" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              Sigurnosni standardi
            </Link>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
