import { lazy, Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/common/BackButton";
import { CategoryLandingSkeleton } from "@/components/skeletons/BrandedSkeletons";

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

  if (!slug || !QUIZ_SEO_CONFIG[slug]) {
    return <Navigate to="/testovi" replace />;
  }

  const seoInfo = QUIZ_SEO_CONFIG[slug];

  return (
    <div className="flex min-h-screen flex-col bg-[#0A1628] text-foreground">
      <SEO
        title={seoInfo.title}
        description={seoInfo.description}
        path={`/testovi/${slug}`}
        jsonLd={{
          "@type": "Quiz",
          name: seoInfo.title,
          description: seoInfo.description,
          url: `https://www.bh-konver.com/testovi/${slug}`,
        }}
      />

      <Navbar activeCategory="TESTOVI" />

      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6">
          <BackButton label={t("common.backToTests", "← Svi testovi")} fallbackTo="/testovi" />
        </div>

        <Suspense fallback={<CategoryLandingSkeleton category="BH KONVER" />}>
          {slug === "math-logic" && <MathLogicQuiz />}
          {slug === "flags" && <FlagsQuiz />}
          {slug === "lateral" && <LateralQuiz />}
          {slug === "fraud" && <FraudQuiz />}
          {slug === "pattern" && <PatternQuiz />}
          {slug === "script" && <ScriptQuiz />}
          {slug === "idioms" && <IdiomsQuiz />}
        </Suspense>
      </main>

      <Footer activeCategory="TESTOVI" />
    </div>
  );
}
