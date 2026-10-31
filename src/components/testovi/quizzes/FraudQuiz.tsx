import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ShieldAlert, Clock, Check, Eye } from "lucide-react";
import { useQuizTimer } from "@/hooks/useQuizTimer";
import { QuizEndScreen } from "@/components/testovi/QuizEndScreen";

interface FraudScene {
  id: string;
  name: string;
  description: string;
  fraudIndex: number; // 0, 1, 2, or 3
  renderTile: (index: number, isFraud: boolean) => React.ReactNode;
}

const FRAUD_ROUNDS: FraudScene[] = [
  // Round 1: Gears (8 teeth vs 7 teeth)
  {
    id: "gear",
    name: "Mehanički zupčanik",
    description: "Jedan zupčanik ima nedostatak u broju zubaca.",
    fraudIndex: 2,
    renderTile: (_idx, isFraud) => (
      <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
        <circle cx="50" cy="50" r="30" fill="none" stroke="#00C9A7" strokeWidth="4" />
        <circle cx="50" cy="50" r="12" fill="#00C9A7" />
        {/* Teeth */}
        {(isFraud ? [0, 51, 102, 154, 205, 257, 308] : [0, 45, 90, 135, 180, 225, 270, 315]).map((deg, i) => (
          <rect
            key={i}
            x="46"
            y="10"
            width="8"
            height="14"
            rx="2"
            fill="#00C9A7"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </svg>
    ),
  },

  // Round 2: Tech Circuit Matrix (Broken connection trace)
  {
    id: "circuit",
    name: "Elektronska ploča",
    description: "Jedna komponenta ima prekinut vod.",
    fraudIndex: 1,
    renderTile: (_idx, isFraud) => (
      <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
        <rect x="15" y="15" width="70" height="70" rx="8" fill="#0c233c" stroke="#C9A84C" strokeWidth="2" />
        <circle cx="35" cy="35" r="5" fill="#C9A84C" />
        <circle cx="65" cy="35" r="5" fill="#C9A84C" />
        <circle cx="50" cy="65" r="5" fill="#C9A84C" />
        {/* Connection traces */}
        <line x1="35" y1="35" x2="65" y2="35" stroke="#C9A84C" strokeWidth="3" />
        <line x1="35" y1="35" x2="50" y2={isFraud ? "52" : "65"} stroke="#C9A84C" strokeWidth="3" />
        <line x1="65" y1="35" x2="50" y2="65" stroke="#C9A84C" strokeWidth="3" />
      </svg>
    ),
  },

  // Round 3: Radar / Scope Target
  {
    id: "radar",
    name: "Radarski nišan",
    description: "Jedan nišan ima suptilno pomjeren indeks.",
    fraudIndex: 3,
    renderTile: (_idx, isFraud) => (
      <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
        <circle cx="50" cy="50" r="38" fill="none" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="50" y1="8" x2="50" y2="92" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="8" y1="50" x2="92" y2="50" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Blip dot */}
        <circle cx={isFraud ? "68" : "60"} cy="36" r="4" fill="#38bdf8" />
      </svg>
    ),
  },

  // Round 4: 9-Dot Matrix
  {
    id: "dots",
    name: "Kriptografski raster",
    description: "Pronađite raster s promijenjenim geometrijskim oblikom.",
    fraudIndex: 0,
    renderTile: (_idx, isFraud) => (
      <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
        {[25, 50, 75].map((y) =>
          [25, 50, 75].map((x) => {
            const isCenter = x === 50 && y === 50;
            if (isCenter && isFraud) {
              return <rect key={`${x}-${y}`} x="44" y="44" width="12" height="12" rx="1" fill="#f43f5e" />;
            }
            return <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#a855f7" />;
          })
        )}
      </svg>
    ),
  },

  // Round 5: Audio Pulse Waveform
  {
    id: "waveform",
    name: "Akustični signal",
    description: "Jedan spektar ima nesrazmjeran pik frekvencije.",
    fraudIndex: 2,
    renderTile: (_idx, isFraud) => (
      <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
        <rect x="10" y="8" width="80" height="84" rx="8" fill="#08182b" stroke="#334155" strokeWidth="1.5" />
        {[
          { x: 22, h: 20 },
          { x: 34, h: 45 },
          { x: 46, h: isFraud ? 65 : 30 },
          { x: 58, h: 50 },
          { x: 70, h: 25 },
        ].map((bar, i) => (
          <rect
            key={i}
            x={bar.x}
            y={50 - bar.h / 2}
            width="7"
            height={bar.h}
            rx="3"
            fill="#10b981"
          />
        ))}
      </svg>
    ),
  },

  // Round 6: Radial Star Compass
  {
    id: "star",
    name: "Zvjezdani kompas",
    description: "Jedna zvijezda ima asimetričan krak.",
    fraudIndex: 1,
    renderTile: (_idx, isFraud) => (
      <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#64748b" strokeWidth="1" />
        <polygon
          points={isFraud ? "50,10 60,42 94,50 60,58 50,82 40,58 6,50 40,42" : "50,10 60,40 90,50 60,60 50,90 40,60 10,50 40,40"}
          fill="#f59e0b"
        />
      </svg>
    ),
  },
];

export function FraudQuiz() {
  const { t } = useTranslation();
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [correctRounds, setCorrectRounds] = useState<number>(0);
  const [selectedTileIdx, setSelectedTileIdx] = useState<number | null>(null);
  const [roundFeedback, setRoundFeedback] = useState<"correct" | "wrong" | "timeout" | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [roundStartTime] = useState<number>(() => Date.now());

  const currentScene = FRAUD_ROUNDS[currentRoundIdx];

  const handleNextRound = useCallback(() => {
    if (currentRoundIdx + 1 < FRAUD_ROUNDS.length) {
      setCurrentRoundIdx((prev) => prev + 1);
      setSelectedTileIdx(null);
      setRoundFeedback(null);
    } else {
      setIsFinished(true);
    }
  }, [currentRoundIdx]);

  const handleTimeUp = useCallback(() => {
    setRoundFeedback("timeout");
    setTimeout(() => {
      handleNextRound();
    }, 800);
  }, [handleNextRound]);

  const { secondsLeft, reset: resetTimer } = useQuizTimer({
    initialSeconds: 10,
    onTimeUp: handleTimeUp,
    autoStart: true,
  });

  // Reset timer on each round change
  useEffect(() => {
    resetTimer(10);
  }, [currentRoundIdx, resetTimer]);

  const handleTileClick = (tileIdx: number) => {
    if (roundFeedback !== null) return;
    setSelectedTileIdx(tileIdx);

    const isFraud = tileIdx === currentScene.fraudIndex;
    if (isFraud) {
      setCorrectRounds((prev) => prev + 1);
      setRoundFeedback("correct");
    } else {
      setRoundFeedback("wrong");
    }

    setTimeout(() => {
      handleNextRound();
    }, 500);
  };

  const handleRestart = () => {
    setCurrentRoundIdx(0);
    setCorrectRounds(0);
    setSelectedTileIdx(null);
    setRoundFeedback(null);
    setIsFinished(false);
    resetTimer(10);
  };

  if (isFinished) {
    const total = FRAUD_ROUNDS.length;
    const percentage = Math.round((correctRounds / total) * 100);
    const duration = Math.round((Date.now() - roundStartTime) / 1000);

    return (
      <QuizEndScreen
        quizId="fraud"
        quizTitle="Spot the Fraud (Detektor Uljeza)"
        score={percentage}
        scoreDisplay={`${percentage}%`}
        durationSec={duration}
        accuracyOrMetric={`${correctRounds} od ${total} otkrivenih uljeza`}
        metrics={{
          speed: Math.min(100, 75 + correctRounds * 3),
          accuracy: percentage,
          consistency: 85,
          logic: Math.min(100, 70 + correctRounds * 4),
        }}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header with 10s Timer */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0A1628]/90 p-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-[#00C9A7]" />
          <span className="text-sm font-bold text-white">
            {t("testovi.fraudRound", "Runda")} {currentRoundIdx + 1} / {FRAUD_ROUNDS.length}
          </span>
        </div>

        {/* 10s Countdown Bar */}
        <div className="flex items-center gap-2">
          <Clock className={`h-4 w-4 ${secondsLeft <= 3 ? "text-rose-400 animate-ping" : "text-[#00C9A7]"}`} />
          <span className={`text-xl font-mono font-black ${secondsLeft <= 3 ? "text-rose-400" : "text-white"}`}>
            {secondsLeft}s
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
          <Check className="h-3.5 w-3.5 text-emerald-400" />
          <span>{correctRounds} tačnih</span>
        </div>
      </div>

      {/* Main Board */}
      <div className="rounded-3xl border border-slate-800 bg-[#0A1628]/90 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl">
        <h3 className="text-base sm:text-lg font-bold text-white mb-1">
          {currentScene.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-6">
          {currentScene.description} {t("testovi.tapTheOddOne", "Dodirnite uljeza koji se razlikuje!")}
        </p>

        {/* 2x2 Big Tap Targets Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
          {[0, 1, 2, 3].map((tileIdx) => {
            const isFraud = tileIdx === currentScene.fraudIndex;
            const isSelected = selectedTileIdx === tileIdx;

            let tileBorder = "border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-700";
            if (roundFeedback !== null) {
              if (isFraud) {
                tileBorder = "border-emerald-500 bg-emerald-950/60 shadow-[0_0_25px_rgba(16,185,129,0.4)]";
              } else if (isSelected) {
                tileBorder = "border-rose-500 bg-rose-950/60";
              }
            }

            return (
              <button
                key={tileIdx}
                type="button"
                onClick={() => handleTileClick(tileIdx)}
                disabled={roundFeedback !== null}
                className={`aspect-square rounded-2xl border-2 p-3 sm:p-4 flex flex-col items-center justify-center transition-all duration-150 transform active:scale-95 ${tileBorder}`}
              >
                {currentScene.renderTile(tileIdx, isFraud)}
              </button>
            );
          })}
        </div>

        {roundFeedback === "timeout" && (
          <p className="mt-4 text-xs font-bold text-rose-400 animate-pulse">
            {t("testovi.timeOutMsg", "Vrijeme isteklo za ovu rundu!")}
          </p>
        )}
      </div>
    </div>
  );
}
