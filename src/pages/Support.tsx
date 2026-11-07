import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Mail, MessageCircle, Clock, Globe, Phone } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "Koje sve tačno opcije i alate nudi BH KONVER?",
    answer:
      "BH KONVER objedinjuje četiri ključne grupe modernih digitalnih alata: 1) Konvertori: valute (KM, EUR, USD, CHF, GBP itd.), mjerne jedinice (dužina, masa, površina, zapremina, temperatura), ćirilica/latinica, te brzi PDF alati i konverzija slika; 2) Generatori: QR kodovi za Wi-Fi, tekst i linkove, UUID v4 ključevi, SEO slugovi i linijski barkodovi (CODE128 i EAN); 3) Kalkulatori: potrošnja goriva i putni troškovi, PDV stopa 17% u BiH, kalkulator radnog staža i procjena troškova struje aparata; 4) Testovi: kviz o BiH, saobraćajni propisi za vozače, IQ logički zadaci i test ličnosti.",
  },
  {
    question: "Koje su cijene paketa i kako se vrši plaćanje (PayPal i banka)?",
    answer:
      "Svi osnovni alati dostupni su besplatno u Freemium modelu bez registracije. Za korisnike kojima je potreban neograničeni kapacitet, batch obrada i preuzimanje službenih specifikacija, nudimo povoljne Premium pakete (24h pristup za 2 € (~3.91 BAM), mjesečni ili godišnji). Plaćanje je omogućeno odmah putem PayPal-a (karticom), kao i direktnom uplatom na račun u banci u BiH (putem mobilnog bankarstva ili uplatnice). Za bankovnu uplatu pošaljite potvrdu na alen.jusufovic@proton.me ili podrska@bh-assistant.ba i pristup se aktivira odmah.",
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

export default function Support() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Podrška — BH Konver"
        description="Korisnička podrška za BH Konver. Kontakt e-mail, radno vrijeme i odgovori na česta pitanja."
        path="/support"
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </Button>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">{t('support.title')}</h1>
          
          <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg mb-8">
            <p className="text-lg text-foreground">Imate pitanje, prijedlog za novi konverter ili kalkulator, ili vam je potrebna tehnička podrška? Naš tim vam stoji na raspolaganju.</p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Načini kontakta</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="mailto:podrska@bh-assistant.ba" className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40">
                <span className="flex items-center gap-2 font-semibold text-foreground"><Mail className="h-4 w-4 text-primary" /> Tehnička podrška i prijava grešaka</span>
                <span className="mt-2 block text-sm text-primary">podrska@bh-assistant.ba</span>
              </a>
              <a href="mailto:info@bh-assistant.ba" className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40">
                <span className="flex items-center gap-2 font-semibold text-foreground"><Mail className="h-4 w-4 text-primary" /> Poslovne saradnje i upiti</span>
                <span className="mt-2 block text-sm text-primary">info@bh-assistant.ba</span>
              </a>
              <a href="mailto:alen.jusufovic@proton.me" className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40">
                <span className="flex items-center gap-2 font-semibold text-foreground"><Mail className="h-4 w-4 text-primary" /> Direktni e-mail osnivača</span>
                <span className="mt-2 block text-sm text-primary">alen.jusufovic@proton.me</span>
              </a>
              <a href="tel:+38762580207" className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40">
                <span className="flex items-center gap-2 font-semibold text-foreground"><Phone className="h-4 w-4 text-primary" /> Telefon / Viber</span>
                <span className="mt-2 block text-sm text-primary">+387 62 580 207</span>
              </a>
              <a href="https://www.bh-assistant.ba" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40">
                <span className="flex items-center gap-2 font-semibold text-foreground"><Globe className="h-4 w-4 text-primary" /> Službeni web portal</span>
                <span className="mt-2 block text-sm text-primary">www.bh-assistant.ba</span>
              </a>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-start gap-3 mb-3">
              <MessageCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('support.report.title')}</h3>
                <p className="text-muted-foreground">{t('support.report.description')}</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-start gap-3 mb-3">
              <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('support.response.title')}</h3>
                <p className="text-muted-foreground">Radno vrijeme tima za podršku: ponedjeljak–petak od 08:00 do 17:00 sati. {t('support.response.description')}</p>
              </div>
            </div>
          </section>

          {/* Često postavljana pitanja (FAQ) */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  Često postavljana pitanja (FAQ)
                </p>
                <h2 className="text-2xl font-bold text-foreground">Najčešća pitanja posjetilaca</h2>
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
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
