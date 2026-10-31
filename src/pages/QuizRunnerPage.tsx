import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/common/BackButton";
import { CategoryLandingSkeleton } from "@/components/skeletons/BrandedSkeletons";
import { QuizProgressBar } from "@/components/testovi/QuizProgressBar";

const MathLogicQuiz = lazy(() =>
  import("@/components/testovi/quizzes/MathLogicQuiz").then((m) => ({ default: m.MathLogicQuiz }))
);
const FlagsQuiz = lazy(() =>
  import("@/components/testovi/quizzes/FlagsQuiz").then((m) => ({ default: m.FlagsQuiz }))
);
const LateralQuiz = lazy(() =>
  import("@/components/testovi/quizzes/LateralQuiz").then((m) => ({ default: m.LateralQuiz }))
);
const FraudQuiz = lazy(() =>
  import("@/components/testovi/quizzes/FraudQuiz").then((m) => ({ default: m.FraudQuiz }))
);
const PatternQuiz = lazy(() =>
  import("@/components/testovi/quizzes/PatternQuiz").then((m) => ({ default: m.PatternQuiz }))
);
const ScriptQuiz = lazy(() =>
  import("@/components/testovi/quizzes/ScriptQuiz").then((m) => ({ default: m.ScriptQuiz }))
);
const IdiomsQuiz = lazy(() =>
  import("@/components/testovi/quizzes/IdiomsQuiz").then((m) => ({ default: m.IdiomsQuiz }))
);

const QUIZ_SEO_CONFIG: Record<string, { title: string; description: string }> = {
  "math-logic": {
    title: "Math & Logic Speed Test (60s) | BH KONVER",
    description: "60 sekundi intenzivnog računanja i logičkih nizova. Pokažite brzinu i upišite se na rang listu BH KONVER-a.",
  },
  flags: {
    title: "Guess the Flag — Zastave Svijeta & Flag King 2027 | BH KONVER",
    description: "Prepoznajte preko 160 nacionalnih zastava. Osvojite 50 tačnih odgovora za počasni certifikat Flag King 2027.",
  },
  lateral: {
    title: "Lateral Thinking Challenge — 5 zamki za logiku | BH KONVER",
    description: "5 zamki za logiku. Koliko ih možeš izbjeći? Riješite klasične misaone zagonetke sa objašnjenjima.",
  },
  fraud: {
    title: "Spot the Fraud — Detektor Uljeza | BH KONVER",
    description: "10-sekundne brze vizuelne runde. Prepoznajte uljeza među geometrijskim uzorcima i elektronskim sklopovima.",
  },
  pattern: {
    title: "Pattern Recognition Gauntlet — Niz Obrazaca | BH KONVER",
    description: "Slomi šifru: niz zagonetki sve težih obrazaca. Numeričke serije, prostorne rotacije i 3x3 matrice.",
  },
  script: {
    title: "Script-Switching / Speed-Typing (Latinica ↔ Ćirilica) | BH KONVER",
    description: "Izmjerite brzinu kucanja (WPM) i tačnost transliteracije između latinice i ćirilice na bosanskom jeziku.",
  },
  idioms: {
    title: "Lost in Translation — Kviz Idioma | BH KONVER",
    description: "Prepoznajte pravo značenje narodnih izreka i idioma kroz 5 jezika: bosanski, engleski, njemački i turski.",
  },
};

export default function QuizRunnerPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const [progress, setProgress] = useState<{ current: number; total: number | null }>(() => {
    const defaultTotals: Record<string, number | null> = {
      lateral: 5,
      fraud: 6,
      pattern: 5,
      idioms: 10,
      script: 10,
      flags: 50,
      "math-logic": null,
    };
    return {
      current: 0,
      total: slug && slug in defaultTotals ? defaultTotals[slug] : null,
    };
  });

  useEffect(() => {
    const defaultTotals: Record<string, number | null> = {
      lateral: 5,
      fraud: 6,
      pattern: 5,
      idioms: 10,
      script: 10,
      flags: 50,
      "math-logic": null,
    };
    setProgress({
      current: 0,
      total: slug && slug in defaultTotals ? defaultTotals[slug] : null,
    });
  }, [slug]);

  const handleProgress = useCallback((current: number, total: number | null) => {
    setProgress({ current, total });
  }, []);

  if (!slug || !QUIZ_SEO_CONFIG[slug]) {
    return <Navigate to="/testovi" replace />;
  }

  const seoInfo = QUIZ_SEO_CONFIG[slug];
  const translationKeyMap: Record<string, string> = {
    "math-logic": "mathLogic",
    flags: "flags",
    lateral: "lateral",
    fraud: "fraud",
    pattern: "pattern",
    script: "script",
    idioms: "idioms",
  };
  const key = translationKeyMap[slug];
  const quizTitle = t(`testovi.quizzes.${key}.title`, seoInfo.title);
  const quizDesc = t(`testovi.quizzes.${key}.desc`, seoInfo.description);

  return (
    <div className="flex min-h-screen flex-col bg-[#0A1628] text-foreground">
      <SEO
        title={`${quizTitle} | BH KONVER`}
        description={quizDesc}
        path={`/testovi/${slug}`}
        jsonLd={{
          "@type": "Quiz",
          name: quizTitle,
          description: quizDesc,
          url: `https://www.bh-konver.com/testovi/${slug}`,
        }}
      />

      <Navbar activeCategory="TESTOVI" />

      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6">
          <BackButton label={t("common.backToTests", "← Svi testovi")} fallbackTo="/testovi" />
        </div>

        {/* Visual Progress Bar Tracking Questions Answered */}
        <div className="mb-6">
          <QuizProgressBar
            current={progress.current}
            total={progress.total}
            quizSlug={slug}
          />
        </div>

        <Suspense fallback={<CategoryLandingSkeleton category="BH KONVER" />}>
          {slug === "math-logic" && <MathLogicQuiz onProgress={handleProgress} />}
          {slug === "flags" && <FlagsQuiz onProgress={handleProgress} />}
          {slug === "lateral" && <LateralQuiz onProgress={handleProgress} />}
          {slug === "fraud" && <FraudQuiz onProgress={handleProgress} />}
          {slug === "pattern" && <PatternQuiz onProgress={handleProgress} />}
          {slug === "script" && <ScriptQuiz onProgress={handleProgress} />}
          {slug === "idioms" && <IdiomsQuiz onProgress={handleProgress} />}
        </Suspense>
      </main>

      <Footer activeCategory="TESTOVI" />
    </div>
  );
}
