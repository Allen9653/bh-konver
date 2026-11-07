import { useState, useEffect, useRef, useCallback } from "react";

export interface UseQuizTimerOptions {
  initialSeconds: number;
  onTimeUp?: () => void;
  autoStart?: boolean;
}

export function useQuizTimer({
  initialSeconds,
  onTimeUp,
  autoStart = true,
}: UseQuizTimerOptions) {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);

  // Accurate timing refs
  const lastTimestampRef = useRef<number>(performance.now());
  const elapsedMsRef = useRef<number>(0);
  const totalMsRef = useRef<number>(initialSeconds * 1000);
  const isRunningRef = useRef<boolean>(autoStart);
  const onTimeUpRef = useRef(onTimeUp);
  const hasTriggeredTimeUpRef = useRef<boolean>(false);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  const pause = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;
  }, []);

  const resume = useCallback(() => {
    lastTimestampRef.current = performance.now();
    setIsRunning(true);
    isRunningRef.current = true;
  }, []);

  const reset = useCallback((newSeconds?: number) => {
    const s = newSeconds ?? initialSeconds;
    totalMsRef.current = s * 1000;
    elapsedMsRef.current = 0;
    lastTimestampRef.current = performance.now();
    hasTriggeredTimeUpRef.current = false;
    setSecondsLeft(s);
    setIsRunning(autoStart);
    isRunningRef.current = autoStart;
  }, [initialSeconds, autoStart]);

  // Main animation / interval loop using performance.now() delta
  useEffect(() => {
    lastTimestampRef.current = performance.now();

    const intervalId = setInterval(() => {
      if (!isRunningRef.current) return;

      const now = performance.now();
      const deltaMs = now - lastTimestampRef.current;
      lastTimestampRef.current = now;

      elapsedMsRef.current += deltaMs;
      const remainingMs = Math.max(0, totalMsRef.current - elapsedMsRef.current);
      const remainingSec = Math.ceil(remainingMs / 1000);

      setSecondsLeft(remainingSec);

      if (remainingMs <= 0 && !hasTriggeredTimeUpRef.current) {
        hasTriggeredTimeUpRef.current = true;
        isRunningRef.current = false;
        setIsRunning(false);
        if (onTimeUpRef.current) {
          onTimeUpRef.current();
        }
      }
    }, 100);

    // Tab visibility handling: when hidden, pause delta accumulation so timers don't glitch or jump
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab went hidden
      } else {
        // Tab became visible again: reset baseline timestamp so we only measure active visible time
        lastTimestampRef.current = performance.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const formatTime = (seconds: number = secondsLeft): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return {
    secondsLeft,
    isRunning,
    start: resume,
    pause,
    resume,
    reset,
    formattedTime: formatTime(secondsLeft),
    elapsedSeconds: Math.floor(elapsedMsRef.current / 1000),
  };
}
