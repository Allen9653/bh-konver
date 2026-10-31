import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Clock, Check, Sparkles, RefreshCw } from "lucide-react";
import { useQuizTimer } from "@/hooks/useQuizTimer";
import { QuizEndScreen } from "@/components/testovi/QuizEndScreen";
import {
  latinToCyrillic,
  cyrillicToLatin,
  normalizeScriptText,
} from "@/utils/transliteration";

interface ScriptSentence {
  latin: string;
  cyrillic: string;
}

const SAMPLE_SENTENCES: ScriptSentence[] = [
  { latin: "Sarajevo je glavni grad Bosne i Hercegovine.", cyrillic: "Сарајево је главни град Босне и Херцеговине." },
  { latin: "Stari most u Mostaru spaja dvije obale rijeke Neretve.", cyrillic: "Стари мост у Мостару спаја двије обале ријеке Неретве." },
  { latin: "Banjaluka je poznata po zelenilu i rijeci Vrbas.", cyrillic: "Бањалука је позната по зеленилу и ријеци Врбас." },
  { latin: "Tuzla ima jedinstvena slana panonska jezera.", cyrillic: "Тузла има јединствена слана панонска језера." },
  { latin: "Brzi voz povezuje gradove kroz prelijepe planinske pejzaže.", cyrillic: "Брзи воз повезује градове кроз прелијепе планинске пејзаже." },
  { latin: "Kraljevski grad Jajce ima prelijep vodopad u centru.", cyrillic: "Краљевски град Јајце има прелијеп водопад у центру." },
  { latin: "Planine Bjelašnica i Jahorina pružaju odlično skijanje.", cyrillic: "Планине Бјелашница и Јахорина пружају одлично скијање." },
  { latin: "Džamije i crkve svjedoče o bogatoj historiji ove zemlje.", cyrillic: "Џамије и цркве свједоче о богатој историји ове земље." },
  { latin: "Ljubav i zajedništvo grade trajnu budućnost.", cyrillic: "Љубав и заједништво граде трајну будућност." },
  { latin: "Njegoševa poezija i književnost nadahnjuju generacije.", cyrillic: "Његошева поезија и књижевност надахњују генерације." },
];

// Special characters helper bar for users without physical Cyrillic keyboard layout
const CYRILLIC_SPECIAL_CHARS = ["џ", "љ", "њ", "ђ", "ћ", "ж", "ч", "ш", "Џ", "Љ", "Њ", "Ђ", "Ћ", "Ж", "Ч", "Ш"];

export interface ScriptQuizProps {
  onProgress?: (current: number, total: number | null) => void;
}

export function ScriptQuiz({ onProgress }: ScriptQuizProps = {}) {
  const { t } = useTranslation();
  const [direction, setDirection] = useState<"latin-to-cyrillic" | "cyrillic-to-latin">("latin-to-cyrillic");
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);
  const [typedInput, setTypedInput] = useState<string>("");
  const [completedWordsCount, setCompletedWordsCount] = useState<number>(0);
  const [totalTypedChars, setTotalTypedChars] = useState<number>(0);
  const [correctTypedChars, setCorrectTypedChars] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    onProgress?.(sentenceIndex, SAMPLE_SENTENCES.length);
  }, [sentenceIndex, onProgress]);

  useEffect(() => {
    if (isFinished) {
      onProgress?.(Math.min(sentenceIndex, SAMPLE_SENTENCES.length), SAMPLE_SENTENCES.length);
    }
  }, [isFinished, sentenceIndex, onProgress]);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentSentence = SAMPLE_SENTENCES[sentenceIndex % SAMPLE_SENTENCES.length];
  const sourceText = direction === "latin-to-cyrillic" ? currentSentence.latin : currentSentence.cyrillic;
  const targetText = direction === "latin-to-cyrillic" ? currentSentence.cyrillic : currentSentence.latin;

  const handleTimeUp = useCallback(() => {
    setIsFinished(true);
  }, []);

  const { secondsLeft, formattedTime, reset: resetTimer, elapsedSeconds } = useQuizTimer({
    initialSeconds: 60,
    onTimeUp: handleTimeUp,
    autoStart: true,
  });

  useEffect(() => {
    if (!isFinished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFinished, sentenceIndex]);

  // Live WPM: Standard definition (words per minute) based on correct characters / 5 / minutes
  const activeElapsedMin = Math.max(0.1, (60 - secondsLeft) / 60);
  const liveWpm = Math.round((correctTypedChars / 5) / activeElapsedMin);
  const liveAccuracy = totalTypedChars > 0 ? Math.min(100, Math.round((correctTypedChars / totalTypedChars) * 100)) : 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const addedChars = Math.max(0, val.length - typedInput.length);
    setTotalTypedChars((prev) => prev + addedChars);

    // Calculate prefix match
    let correctChars = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) {
        correctChars++;
      }
    }
    setCorrectTypedChars((prev) => Math.max(prev, correctChars));
    setTypedInput(val);

    // If completely matches current sentence
    if (normalizeScriptText(val) === normalizeScriptText(targetText)) {
      const wordsInSentence = targetText.split(/\s+/).length;
      setCompletedWordsCount((prev) => prev + wordsInSentence);
      setTypedInput("");
      setSentenceIndex((prev) => prev + 1);
      // Alternate direction
      setDirection((prev) => (prev === "latin-to-cyrillic" ? "cyrillic-to-latin" : "latin-to-cyrillic"));
    }
  };

  const insertSpecialChar = (char: string) => {
    setTypedInput((prev) => prev + char);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRestart = () => {
    setDirection("latin-to-cyrillic");
    setSentenceIndex(0);
    setTypedInput("");
    setCompletedWordsCount(0);
    setTotalTypedChars(0);
    setCorrectTypedChars(0);
    setIsFinished(false);
    resetTimer(60);
  };

  if (isFinished) {
    /**
     * Score Calculation:
     * Defined as: Total correct words completed + partial WPM bonus.
     * Ensures fairness for fast typists.
     */
    const finalScore = Math.max(completedWordsCount, liveWpm);

    return (
      <QuizEndScreen
        quizId="script"
        quizTitle="Script-Switching / Speed-Typing"
        score={finalScore}
        scoreDisplay={`${finalScore} WPM`}
        durationSec={60}
        accuracyOrMetric={`${liveAccuracy}% tačnost (${completedWordsCount} završenih riječi)`}
        metrics={{
          speed: Math.min(100, Math.round((finalScore / 60) * 100)),
          accuracy: liveAccuracy,
          consistency: 90,
          logic: 85,
        }}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Status Bar with WPM & Accuracy */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0A1628]/90 p-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Clock className={`h-5 w-5 ${secondsLeft <= 10 ? "text-rose-400 animate-pulse" : "text-[#00C9A7]"}`} />
          <span className={`text-xl font-mono font-black ${secondsLeft <= 10 ? "text-rose-400" : "text-white"}`}>
            {formattedTime}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{liveWpm} WPM</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            <span>{liveAccuracy}% tačnost</span>
          </div>
        </div>
      </div>

      {/* Main Typing Card */}
      <div className="rounded-3xl border border-slate-800 bg-[#0A1628]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase font-bold tracking-wider text-[#00C9A7]">
            {direction === "latin-to-cyrillic" ? "Latinica ➔ Prekucaj u Ćirilicu" : "Ћирилица ➔ Prekucaj u Latinicu"}
          </span>
          <span className="text-xs text-muted-foreground font-semibold">
            {t("testovi.sentenceNumber", "Rečenica")} #{sentenceIndex + 1}
          </span>
        </div>

        {/* Source Text to Transliterate */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 my-4 text-left">
          <p className="text-lg sm:text-xl font-bold text-white tracking-wide leading-relaxed">
            {sourceText}
          </p>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            Ciljni tekst: <span className="text-[#C9A84C]">{targetText}</span>
          </p>
        </div>

        {/* Typing Input */}
        <div className="mt-6">
          <input
            ref={inputRef}
            type="text"
            value={typedInput}
            onChange={handleInputChange}
            placeholder={direction === "latin-to-cyrillic" ? "Kucaj ovdje na ćirilici..." : "Kucaj ovdje na latinici..."}
            className="w-full text-base sm:text-lg font-mono rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3.5 text-white placeholder-slate-600 focus:border-[#00C9A7] focus:outline-none transition-colors"
            autoFocus
          />
        </div>

        {/* Cyrillic Digraphs & Letters Quick Palette */}
        {direction === "latin-to-cyrillic" && (
          <div className="mt-4 text-left">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Brze tipke za specifična slova (kliknite za unos):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CYRILLIC_SPECIAL_CHARS.map((char) => (
                <button
                  key={char}
                  type="button"
                  onClick={() => insertSpecialChar(char)}
                  className="h-8 px-2.5 rounded-lg border border-slate-700 bg-slate-900 text-sm font-bold text-white hover:bg-[#00C9A7]/20 hover:border-[#00C9A7] transition-colors"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
