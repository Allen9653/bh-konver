import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Calculator, Flame, Clock, Check, X, ArrowRight } from "lucide-react";
import { useQuizTimer } from "@/hooks/useQuizTimer";
import { QuizEndScreen } from "@/components/testovi/QuizEndScreen";

interface QuestionItem {
  prompt: string;
  expected: number;
  type: "math" | "logic";
}

function generateQuestion(streak: number): QuestionItem {
  const isLogic = streak >= 5 && Math.random() > 0.6;

  if (isLogic) {
    // Logic puzzle
    const puzzleType = Math.floor(Math.random() * 3);
    if (puzzleType === 0) {
      // Step +3 or +4
      const step = Math.floor(Math.random() * 4) + 2;
      const start = Math.floor(Math.random() * 10) + 1;
      const a = start;
      const b = a + step;
      const c = b + step;
      const d = c + step;
      return {
        prompt: `${a}, ${b}, ${c}, ?`,
        expected: d,
        type: "logic",
      };
    } else if (puzzleType === 1) {
      // Doubling sequence
      const start = Math.floor(Math.random() * 5) + 2;
      return {
        prompt: `${start}, ${start * 2}, ${start * 4}, ?`,
        expected: start * 8,
        type: "logic",
      };
    } else {
      // Squares
      const n = Math.floor(Math.random() * 4) + 2;
      return {
        prompt: `${n * n}, ${(n + 1) * (n + 1)}, ${(n + 2) * (n + 2)}, ?`,
        expected: (n + 3) * (n + 3),
        type: "logic",
      };
    }
  }

  // Arithmetic
  if (streak < 3) {
    // Easy addition / subtraction
    const a = Math.floor(Math.random() * 40) + 5;
    const b = Math.floor(Math.random() * 30) + 3;
    if (Math.random() > 0.5) {
      return { prompt: `${a} + ${b}`, expected: a + b, type: "math" };
    } else {
      const sum = a + b;
      return { prompt: `${sum} - ${a}`, expected: b, type: "math" };
    }
  } else if (streak < 7) {
    // Multiplication & division
    const a = Math.floor(Math.random() * 10) + 3;
    const b = Math.floor(Math.random() * 9) + 2;
    if (Math.random() > 0.4) {
      return { prompt: `${a} × ${b}`, expected: a * b, type: "math" };
    } else {
      const prod = a * b;
      return { prompt: `${prod} ÷ ${a}`, expected: b, type: "math" };
    }
  } else {
    // Mixed arithmetic with streak ramp-up
    const a = Math.floor(Math.random() * 15) + 6;
    const b = Math.floor(Math.random() * 8) + 2;
    const c = Math.floor(Math.random() * 20) + 5;
    return { prompt: `${a} × ${b} + ${c}`, expected: a * b + c, type: "math" };
  }
}

export interface MathLogicQuizProps {
  onProgress?: (current: number, total: number | null) => void;
}

export function MathLogicQuiz({ onProgress }: MathLogicQuizProps = {}) {
  const { t } = useTranslation();
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem>(() => generateQuestion(0));
  const [userInput, setUserInput] = useState<string>("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    onProgress?.(totalAttempts, null);
  }, [totalAttempts, onProgress]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleTimeUp = useCallback(() => {
    setIsFinished(true);
  }, []);

  const { secondsLeft, formattedTime, reset: resetTimer } = useQuizTimer({
    initialSeconds: 60,
    onTimeUp: handleTimeUp,
    autoStart: true,
  });

  useEffect(() => {
    if (!isFinished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFinished, currentQuestion]);

  const handleRestart = () => {
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setTotalAttempts(0);
    setCurrentQuestion(generateQuestion(0));
    setUserInput("");
    setFeedback(null);
    setIsFinished(false);
    resetTimer(60);
  };

  const submitAnswer = (val: string) => {
    const num = parseInt(val.trim(), 10);
    if (isNaN(num)) return;

    setTotalAttempts((prev) => prev + 1);

    if (num === currentQuestion.expected) {
      // Correct!
      setCorrectCount((prev) => prev + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
      setFeedback("correct");
      setUserInput("");
      setTimeout(() => {
        setFeedback(null);
        setCurrentQuestion(generateQuestion(nextStreak));
      }, 150);
    } else {
      // Wrong!
      setStreak(0);
      setFeedback("wrong");
      setUserInput("");
      setTimeout(() => {
        setFeedback(null);
        setCurrentQuestion(generateQuestion(0));
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitAnswer(userInput);
    }
  };

  if (isFinished) {
    const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;
    return (
      <QuizEndScreen
        quizId="math-logic"
        quizTitle="Math & Logic Speed Test"
        score={correctCount}
        scoreDisplay={`${correctCount}`}
        durationSec={60}
        accuracyOrMetric={`${accuracy}% tačnost (Streak: ${maxStreak})`}
        metrics={{
          speed: Math.min(100, correctCount * 4),
          accuracy,
          consistency: Math.min(100, maxStreak * 10),
          logic: Math.min(100, 60 + correctCount * 2),
        }}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0A1628]/90 p-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Clock className={`h-5 w-5 ${secondsLeft <= 10 ? "text-rose-400 animate-pulse" : "text-[#00C9A7]"}`} />
          <span className={`text-xl font-black font-mono ${secondsLeft <= 10 ? "text-rose-400" : "text-white"}`}>
            {formattedTime}
          </span>
        </div>

        {/* Streak indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Flame className="h-4 w-4" />
          <span>Streak: {streak}</span>
        </div>

        {/* Score count */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-bold">
          <Check className="h-4 w-4" />
          <span>{correctCount} {t("testovi.correct", "tačnih")}</span>
        </div>
      </div>

      {/* Main Question Card */}
      <div
        className={`relative overflow-hidden rounded-3xl border p-8 sm:p-12 text-center transition-all duration-200 ${
          feedback === "correct"
            ? "border-emerald-500 bg-emerald-950/30 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
            : feedback === "wrong"
            ? "border-rose-500 bg-rose-950/30 shadow-[0_0_40px_rgba(244,63,94,0.3)] animate-shake"
            : "border-slate-800 bg-[#0A1628]/90 shadow-2xl"
        }`}
      >
        <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block mb-4">
          {currentQuestion.type === "logic"
            ? t("testovi.logicPatternPrompt", "Dopuni niz brojeva")
            : t("testovi.mathPrompt", "Riješi izraz")}
        </span>

        <div className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tight my-4">
          {currentQuestion.prompt}
        </div>

        {/* Input Field */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9\-]*"
              value={userInput}
              onChange={(e) => {
                const val = e.target.value;
                setUserInput(val);
                // Instant check if single digit answer matches
                if (val.trim() === String(currentQuestion.expected)) {
                  submitAnswer(val);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Unesi broj..."
              className="w-full text-center text-3xl font-black font-mono rounded-2xl border-2 border-slate-700 bg-slate-950/80 px-4 py-3 text-white placeholder-slate-600 focus:border-[#00C9A7] focus:outline-none transition-colors"
              autoFocus
            />
          </div>

          <button
            type="button"
            onClick={() => submitAnswer(userInput)}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00C9A7] hover:bg-[#00C9A7]/90 text-slate-950 font-bold py-2.5 transition-colors"
          >
            <span>{t("common.confirm", "Potvrdi (Enter)")}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
