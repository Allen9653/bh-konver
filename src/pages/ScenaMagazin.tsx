import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PremiumFooter } from "@/components/PremiumFooter";
import { SEO, SITE_URL } from "@/components/SEO";
import { UniversalToolHub } from "@/components/home/UniversalToolHub";
import { AdSenseSlot } from "@/components/AdSenseSlot";

export default function ScenaMagazin() {
  const { t } = useTranslation();

  const magazineFeatures = [
    {
      title: "Digitalna pismenost",
      description: "Vodiči kroz moderne digitalne formate i alate za svaki dan.",
      icon: BookOpen,
    },
    {
      title: "SCENA+ Rubrike",
      description: "Kultura, umetnost i kreativna industrija u Bosni i Hercegovini.",
      icon: Sparkles,
    },
    {
      title: "Edukativni sadržaj",
      description: "Praktični savjeti i uputstva za korisnike BH KONVER platforme.",
      icon: ArrowRight,
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <SEO
        title="SCENA+ Magazin | Digitalna pismenost i kulturna scena BH"
        description="SCENA+ magazin – digitalna pismenost, kultura i kreativna industrija. Pregledajte vodiče, članne i alate BH KONVER-a."
        path="/scena-magazin"
        image={`${SITE_URL}/icon-512.png`}
      />

      <main className="relative flex-1 overflow-hidden">
        {/* Hero section */}
        <section className="relative z-10 px-4 pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>SCENA+ MAGAZIN · DIGITALNA PISMENOST</span>
            </div>

            <h1 className="mx-auto mt-4 max-w-4xl font-display text-3xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.1]">
              <span className="text-foreground">
                {t("home.heroTitleLead", "ŠTA JE ")}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-400 bg-clip-text text-transparent">
                SCENA+ MAGAZIN
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-300/90 sm:text-lg">
              SCENA+ je magazin posvećen digitalnoj pismenosti, kulturi i kreativnoj industrijи. Otkrijte vodiče, alate i sadržaje koji vam pomažu da sve bolje shvatite svet digitalnih formata.
            </p>

            <div className="mx-auto mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
              {magazineFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:border-primary/50 transition-all"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vizuelni Mozaik Magazina SCENA+ */}
        <section className="relative z-10 px-4 py-10 sm:py-14 border-t border-border/60 bg-muted/20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  SCENA+ MAGAZIN
                </p>
                <h2 className="font-display text-2xl font-black text-foreground sm:text-3xl">
                  Vizuelni Mozaik Magazina SCENA+
                </h2>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline self-start sm:self-auto"
              >
                <span>Povratak na početnu</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {magazineFeatures.map((feature, idx) => (
                <article
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-sm hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                      Rubrika {idx + 1}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {feature.description}
                  </p>
                  <div className="mt-5 border-t border-border/50 pt-3 flex items-center justify-between text-xs">
                    <Link
                      to="/"
                      className="font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Otvori rubriku</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Brza pretraga alata – premještena sa Homepage-a */}
        <UniversalToolHub />

        {/* AdSense slot */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-3">
          <AdSenseSlot slotId="scena-magazin-after-tools" />
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
