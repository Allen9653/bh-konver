import { lazy, Suspense, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Sparkles,
  Crown,
  Building2,
  BookOpen,
} from "lucide-react";
import { PremiumHeader } from "@/components/PremiumHeader";
import { PremiumFooter } from "@/components/PremiumFooter";
import { CompactHeroConverter } from "@/components/home/CompactHeroConverter";
import { TrustSignalsBar } from "@/components/common/TrustSignalsBar";
import { EthnoFuturaBackground } from "@/components/home/EthnoFuturaBackground";
import { SEO, SITE_URL } from "@/components/SEO";
import { AdSenseSlot } from "@/components/AdSenseSlot";
import { FreemiumPaywallModal } from "@/components/free-tools/FreemiumPaywallModal";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useSubscription } from "@/hooks/useSubscription";

const PayPalPaymentModal = lazy(() =>
  import("@/components/PayPalPaymentModal").then((module) => ({ default: module.PayPalPaymentModal }))
);

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
            TRUST SIGNALS: PRIVATNOST, LOKALNA OBRADA I ZVANIČNI STANDARDI
        ======================================================== */}
        <section className="relative z-10 px-4 py-4" aria-label="Sigurnost i privatnost">
          <div className="mx-auto max-w-6xl">
            <TrustSignalsBar variant="full" />
          </div>
        </section>

        {/* ========================================================
            ODVOJENI EDUKATIVNI SADRŽAJ (VODIČI & DIGITALNA PISMENOST)
            Jasno odvojena editorial sekcija s povezanim alatima i idućim koracima
        ======================================================== */}
        <section className="relative z-10 px-4 py-10 sm:py-14 border-t border-border/60 bg-muted/20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {t("home.editorialEyebrow", "EDUKACIJA & VODIČI")}
                </p>
                <h2 className="font-display text-2xl font-black text-foreground sm:text-3xl">
                  {t("home.editorialTitle", "Digitalna pismenost i savjeti za formate")}
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline self-start sm:self-auto"
              >
                <span>{t("home.viewAllArticles", "Pregledaj sve vodiče na Blogu")}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Article 1 */}
              <article className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-sm hover:border-cyan-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="font-semibold text-cyan-400">Video formati</span>
                    <span>5 min čitanja</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                    <Link to="/blog/razlika-mp4-i-mkv">
                      MP4 vs MKV: Koji format odabrati za video zapise?
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Detaljno objašnjenje kontejnera, kodeka (H.264, HEVC) i kompatibilnosti na televizorima, telefonima i playerima.
                  </p>
                </div>
                <div className="mt-5 border-t border-border/50 pt-3 flex items-center justify-between text-xs">
                  <Link
                    to="/modul/video"
                    className="font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Povezani alat: Video konverter</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>

              {/* Article 2 */}
              <article className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-sm hover:border-cyan-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="font-semibold text-cyan-400">Dokumenti</span>
                    <span>4 min čitanja</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                    <Link to="/blog/kako-otvoriti-docx-fajl">
                      Kako otvoriti i uređivati DOCX dokumente bez Worda
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Praktična uputstva za besplatno otvaranje Word datoteka na mobilnom telefonu ili računaru, bez Office licence.
                  </p>
                </div>
                <div className="mt-5 border-t border-border/50 pt-3 flex items-center justify-between text-xs">
                  <Link
                    to="/alati/pdf-to-word"
                    className="font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Povezani alat: PDF u Word</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>

              {/* Article 3 */}
              <article className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-sm hover:border-cyan-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="font-semibold text-cyan-400">Slike & Foto</span>
                    <span>3 min čitanja</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                    <Link to="/blog/heic-u-jpg-konverzija">
                      Zašto iPhone snima u HEIC formatu i kako ga pretvoriti u JPG
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Vodič za rješavanje problema kada računar ili aplikacija ne prepoznaje fotografije sa iPhone uređaja.
                  </p>
                </div>
                <div className="mt-5 border-t border-border/50 pt-3 flex items-center justify-between text-xs">
                  <Link
                    to="/slika-pdf"
                    className="font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Povezani alat: Slika u PDF</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
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