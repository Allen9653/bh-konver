import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Calculator,
  Flag,
  HelpCircle,
  Eye,
  Cpu,
  Keyboard,
  Languages,
  ArrowRight,
  Trophy,
  Sparkles,
  Zap,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/common/BackButton";
import { LiveLeaderboard } from "@/components/testovi/LiveLeaderboard";
import { useLanguage } from "@/hooks/useLanguage";

export type QuizCategory = "all" | "logic" | "math" | "linguistics" | "general";
export type QuizDifficulty = "all" | "beginner" | "intermediate" | "advanced";

interface QuizCardItem {
  slug: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  badge: string;
  color: string;
  categories: QuizCategory[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface CategoryFilterOption {
  id: QuizCategory;
  labelKey: string;
  defaultLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DifficultyFilterOption {
  id: QuizDifficulty;
  labelKey: string;
  defaultLabel: string;
}

export default function Testovi() {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const currentLang = language || i18n.language || "bs";
  const [activeLang, setActiveLang] = useState<string>(currentLang);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty>("all");

  // Synchronize state immediately whenever language context or i18n event changes
  useEffect(() => {
    setActiveLang(currentLang);
  }, [currentLang]);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setActiveLang(lng);
    };
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const categoriesList: CategoryFilterOption[] = useMemo(() => [
    {
      id: "all",
      labelKey: "testovi.categories.all",
      defaultLabel: "Svi kvizovi",
      icon: Sparkles,
    },
    {
      id: "logic",
      labelKey: "testovi.categories.logic",
      defaultLabel: "Logika & Mozgalice",
      icon: HelpCircle,
    },
    {
      id: "math",
      labelKey: "testovi.categories.math",
      defaultLabel: "Matematika & Brzina",
      icon: Calculator,
    },
    {
      id: "linguistics",
      labelKey: "testovi.categories.linguistics",
      defaultLabel: "Lingvistika & Jezici",
      icon: Languages,
    },
    {
      id: "general",
      labelKey: "testovi.categories.general",
      defaultLabel: "Opšte znanje & Zastave",
      icon: Flag,
    },
  ], []);

  const difficultyList: DifficultyFilterOption[] = useMemo(() => [
    {
      id: "all",
      labelKey: "testovi.difficulty.all",
      defaultLabel: "Sve težine",
    },
    {
      id: "beginner",
      labelKey: "testovi.difficulty.beginner",
      defaultLabel: "Početni",
    },
    {
      id: "intermediate",
      labelKey: "testovi.difficulty.intermediate",
      defaultLabel: "Srednji",
    },
    {
      id: "advanced",
      labelKey: "testovi.difficulty.advanced",
      defaultLabel: "Napredni",
    },
  ], []);

  const quizzes = useMemo<QuizCardItem[]>(() => {
    // Explicitly reference activeLang so card translations re-evaluate when language updates
    void activeLang;
    return [
      {
        slug: "math-logic",
        title: t("testovi.quizzes.mathLogic.title", "Math & Logic Speed Test"),
        description: t("testovi.quizzes.mathLogic.desc", "60 sekundi intenzivnog računanja i logičkih nizova. Težina se progresivno povećava sa svakim uzastopnim tačnim odgovorom."),
        icon: Calculator,
        tag: t("testovi.quizzes.mathLogic.tag", "60s Speed Run"),
        badge: t("testovi.freeBadge", "100% Besplatno"),
        color: "from-cyan-500/20 to-teal-500/5",
        categories: ["math", "logic"],
        difficulty: "intermediate",
      },
      {
        slug: "flags",
        title: t("testovi.quizzes.flags.title", "Guess the Flag (Zastave Svijeta)"),
        description: t("testovi.quizzes.flags.desc", "Baza od preko 160 svjetskih zastava. Osvojite 50 tačnih odgovora i otključajte počasni certifikat 'FLAG KING 2027'."),
        icon: Flag,
        tag: t("testovi.quizzes.flags.tag", "Geografija & Flag King"),
        badge: t("testovi.freeBadge", "100% Besplatno"),
        color: "from-amber-500/20 to-yellow-500/5",
        categories: ["general"],
        difficulty: "beginner",
      },
      {
        slug: "lateral",
        title: t("testovi.quizzes.lateral.title", "Lateral Thinking Challenge"),
        description: t("testovi.quizzes.lateral.desc", "5 zamki za logiku. Koliko ih možeš izbjeći? Klasične misaone zagonetke sa detaljnim objašnjenjima psiholoških zamki."),
        icon: HelpCircle,
        tag: t("testovi.quizzes.lateral.tag", "5 Zagonetki"),
        badge: t("testovi.freeBadge", "100% Besplatno"),
        color: "from-emerald-500/20 to-teal-500/5",
        categories: ["logic"],
        difficulty: "intermediate",
      },
      {
        slug: "fraud",
        title: t("testovi.quizzes.fraud.title", "Spot the Fraud (Detektor Uljeza)"),
        description: t("testovi.quizzes.fraud.desc", "Brze runde od po 10 sekundi. Prepoznajte suptilno izmijenjenu geometrijsku komponentu među identičnim elementima."),
        icon: Eye,
        tag: t("testovi.quizzes.fraud.tag", "10s Rapid Fire"),
        badge: t("testovi.freeBadge", "100% Besplatno"),
        color: "from-rose-500/20 to-pink-500/5",
        categories: ["logic"],
        difficulty: "advanced",
      },
      {
        slug: "pattern",
        title: t("testovi.quizzes.pattern.title", "Pattern Recognition Gauntlet"),
        description: t("testovi.quizzes.pattern.desc", "Slomi šifru: niz zagonetki sve težih obrazaca. Numeričke serije, prostorne rotacije i 3x3 matrice bez lažnih tvrdnji."),
        icon: Cpu,
        tag: t("testovi.quizzes.pattern.tag", "Gauntlet Obrazaca"),
        badge: t("testovi.freeBadge", "100% Besplatno"),
        color: "from-purple-500/20 to-indigo-500/5",
        categories: ["logic", "math"],
        difficulty: "advanced",
      },
      {
        slug: "script",
        title: t("testovi.quizzes.script.title", "Script-Switching / Speed-Typing"),
        description: t("testovi.quizzes.script.desc", "Transliteracija i brzo kucanje na vrijeme. Prekucajte tekst iz latinice u ćirilicu (i obrnuto) uz mjerenje tačnosti i WPM brzine."),
        icon: Keyboard,
        tag: t("testovi.quizzes.script.tag", "Latinica ↔ Ćirilica"),
        badge: t("testovi.freeBadge", "100% Besplatno"),
        color: "from-blue-500/20 to-cyan-500/5",
        categories: ["linguistics"],
        difficulty: "intermediate",
      },
      {
        slug: "idioms",
        title: t("testovi.quizzes.idioms.title", "Lost in Translation — Kviz Idioma"),
        description: t("testovi.quizzes.idioms.desc", "Prepoznajte pravo značenje narodnih izreka i idioma kroz 5 jezika: bosanski (latinica & ćirilica), engleski, njemački i turski."),
        icon: Languages,
        tag: t("testovi.quizzes.idioms.tag", "5 Jezika"),
        badge: t("testovi.freeBadge", "100% Besplatno"),
        color: "from-teal-500/20 to-emerald-500/5",
        categories: ["linguistics", "general"],
        difficulty: "beginner",
      },
    ];
  }, [t, activeLang]);

  // Compute quiz count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<QuizCategory, number> = {
      all: quizzes.length,
      logic: 0,
      math: 0,
      linguistics: 0,
      general: 0,
    };
    quizzes.forEach((q) => {
      q.categories.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return counts;
  }, [quizzes]);

  // Compute quiz count per difficulty within active category
  const difficultyCounts = useMemo(() => {
    const inCategory = selectedCategory === "all"
      ? quizzes
      : quizzes.filter((q) => q.categories.includes(selectedCategory));

    const counts: Record<QuizDifficulty, number> = {
      all: inCategory.length,
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };
    inCategory.forEach((q) => {
      counts[q.difficulty] = (counts[q.difficulty] || 0) + 1;
    });
    return counts;
  }, [quizzes, selectedCategory]);

  // Filter quizzes according to active category and difficulty filters
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => {
      const matchesCategory = selectedCategory === "all" || q.categories.includes(selectedCategory);
      const matchesDifficulty = selectedDifficulty === "all" || q.difficulty === selectedDifficulty;
      return matchesCategory && matchesDifficulty;
    });
  }, [quizzes, selectedCategory, selectedDifficulty]);

  const pageTitle = t("testovi.seoTitle", "Digitalni testovi uma i kvizovi znanja | BH KONVER");
  const pageDescription = t(
    "testovi.seoDesc",
    "Testiraj um. Podijeli rezultat. 7 besplatnih interaktivnih testova: matematika, zastave svijeta, lateralno razmišljanje, detektor uljeza, obrasci, transliteracija i idiomi."
  );

  return (
    <div key={activeLang} className="flex min-h-screen flex-col bg-transparent text-foreground">
      <SEO
        title={pageTitle}
        description={pageDescription}
        path="/testovi"
        jsonLd={{
          "@type": "CollectionPage",
          name: pageTitle,
          description: pageDescription,
          url: "https://www.bh-konver.com/testovi",
        }}
      />

      <Navbar activeCategory="TESTOVI" />

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <BackButton label={t("common.backToHome", "← Povratak na početnu")} fallbackTo="/" />
        </div>

        {/* Hero Section */}
        <header className="relative mb-10 overflow-hidden rounded-3xl border border-[#00C9A7]/30 bg-gradient-to-br from-[#0A1628]/75 via-[#0d1d33]/70 to-[#0A1628]/75 p-6 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Ambient Background Watermark Logo */}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-80 sm:w-[480px] md:w-[600px] h-full pointer-events-none overflow-hidden select-none opacity-15 sm:opacity-20 flex items-center justify-end">
            <img
              src="/categories/testovi.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto max-h-[140%] object-contain filter drop-shadow-[0_0_60px_rgba(0,201,167,0.5)] transform translate-x-10 scale-110"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/40 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C9A7]/40 bg-[#00C9A7]/15 px-3.5 py-1 text-xs font-bold text-[#00C9A7] mb-3 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t("testovi.heroEyebrow", "BH KONVER · DIGITALNI TESTOVI")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight">
              {t("testovi.heroTitle", "Testiraj um. Podijeli rezultat.")}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] sm:text-base">
              {t(
                "testovi.heroDesc",
                "7 modernih kognitivnih izazova i lingvističkih provjera. Besplatno za sve posjetioce, s praćenjem rezultata, preuzimanjem infografika i zvaničnom rang listom."
              )}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-semibold text-slate-300">
                <Zap className="h-3.5 w-3.5 text-[#00C9A7]" /> {t("testovi.freeBadge", "100% Besplatno igranje")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-semibold text-slate-300">
                <Trophy className="h-3.5 w-3.5 text-[#C9A84C]" /> {t("testovi.leaderboardBadge", "Zvanična rang lista")}
              </span>
            </div>
          </div>

          {/* Branded Section Badge Tile */}
          <div className="relative z-10 shrink-0 flex items-center justify-center p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-[#00C9A7]/30 shadow-[0_0_35px_rgba(0,201,167,0.25)] backdrop-blur-xl group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00C9A7]/25 via-[#C9A84C]/15 to-transparent rounded-3xl opacity-80 blur-xl pointer-events-none group-hover:opacity-100 transition-opacity" />
            <img
              src="/categories/testovi.png"
              alt="Testovi"
              className="relative z-10 h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>
        </header>

        {/* Category Filter Tabs Bar */}
        <section aria-label="Filtriranje testova po kategoriji" className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#00C9A7]" />
                <span>{t("testovi.availableQuizzes", "Dostupni Kvizovi i Izazovi")}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-[#00C9A7] border border-slate-700">
                  {filteredQuizzes.length}
                </span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("testovi.filterSubtitle", "Filtrirajte izazove po kognitivnoj ili tematskoj kategoriji")}
              </p>
            </div>

            <span className="text-xs text-muted-foreground hidden sm:block">
              {t("testovi.allFreeNote", "Svi testovi su besplatni")}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categoriesList.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const label = t(cat.labelKey, cat.defaultLabel);
              const count = categoryCounts[cat.id];

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? "bg-[#00C9A7] text-slate-950 font-black shadow-[0_0_18px_rgba(0,201,167,0.35)]"
                      : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-slate-950" : "text-[#00C9A7]"}`} />
                  <span>{label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      isSelected
                        ? "bg-slate-950/20 text-slate-950"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Difficulty Level Filter Bar */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#00C9A7]" />
              <span>{t("testovi.difficulty.label", "Nivo težine:")}</span>
            </span>

            {difficultyList.map((diff) => {
              const isSelected = selectedDifficulty === diff.id;
              const label = t(diff.labelKey, diff.defaultLabel);
              const count = difficultyCounts[diff.id];

              let selectedStyle = "bg-[#00C9A7] text-slate-950 font-black shadow-[0_0_15px_rgba(0,201,167,0.35)]";
              if (diff.id === "beginner") {
                selectedStyle = "bg-emerald-500 text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.35)]";
              } else if (diff.id === "intermediate") {
                selectedStyle = "bg-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.35)]";
              } else if (diff.id === "advanced") {
                selectedStyle = "bg-rose-500 text-slate-950 font-black shadow-[0_0_15px_rgba(244,63,94,0.35)]";
              }

              return (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? selectedStyle
                      : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
                  }`}
                  aria-pressed={isSelected}
                >
                  {diff.id !== "all" && (
                    <span
                      className={`h-2 w-2 rounded-full ${
                        diff.id === "beginner"
                          ? "bg-emerald-400"
                          : diff.id === "intermediate"
                          ? "bg-amber-400"
                          : "bg-rose-400"
                      }`}
                    />
                  )}
                  <span>{label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isSelected
                        ? "bg-slate-950/20 text-slate-950"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Quizzes Card Grid */}
        <section aria-label="Kvizovi kartice" className="mb-14">
          {filteredQuizzes.length === 0 ? (
            <div className="py-12 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8">
              <Sparkles className="h-10 w-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300">
                {t("testovi.noQuizzesFound", "Nema kvizova u odabranoj kategoriji ili nivou težine.")}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedDifficulty("all");
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#00C9A7] px-4 py-2 text-xs font-bold text-slate-950 hover:bg-[#00C9A7]/90 transition-all shadow-[0_0_15px_rgba(0,201,167,0.3)]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t("testovi.resetFilter", "Prikaži sve kvizove")}</span>
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredQuizzes.map((quiz) => {
                const Icon = quiz.icon;
                return (
                  <div
                    key={quiz.slug}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#00C9A7]/50 hover:bg-slate-900/90 hover:shadow-[0_10px_30px_rgba(0,201,167,0.15)] hover:-translate-y-1"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${quiz.color} opacity-40 pointer-events-none`} />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7] group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6" />
                        </span>
                        <div className="flex items-center gap-1.5">
                          {/* Difficulty Level Badge */}
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border ${
                              quiz.difficulty === "beginner"
                                ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-300"
                                : quiz.difficulty === "intermediate"
                                ? "bg-amber-500/15 border-amber-500/35 text-amber-300"
                                : "bg-rose-500/15 border-rose-500/35 text-rose-300"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                quiz.difficulty === "beginner"
                                  ? "bg-emerald-400"
                                  : quiz.difficulty === "intermediate"
                                  ? "bg-amber-400"
                                  : "bg-rose-400"
                              }`}
                            />
                            {t(`testovi.difficultyBadges.${quiz.difficulty}`, quiz.difficulty)}
                          </span>

                          <span className="rounded-full bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300">
                            {quiz.tag}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-black text-white group-hover:text-[#00C9A7] transition-colors">
                        {quiz.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">
                        {quiz.badge}
                      </span>
                      <Link
                        to={`/testovi/${quiz.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#00C9A7] px-4 py-2 text-xs font-black text-slate-950 hover:bg-[#00C9A7]/90 transition-all active:scale-95 shadow-[0_0_15px_rgba(0,201,167,0.3)]"
                      >
                        {t("testovi.startBtn", "Započni test")} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Persistent 'Top Scorers' Real-Time Leaderboard Component */}
        <section aria-label="Zvanična rang lista" className="mb-10">
          <LiveLeaderboard key={activeLang} initialQuizId="all" />
        </section>
      </main>

      <Footer activeCategory="TESTOVI" />
    </div>
  );
}
