import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AdaptationMode = "auto" | "ios" | "android" | "desktop";
export type PlatformKind = "ios" | "android" | "desktop";

interface DeviceAdaptationContextValue {
  /** User preference: auto-adapt to detected iOS/Android, force iOS/Android, or standard desktop */
  mode: AdaptationMode;
  setMode: (mode: AdaptationMode) => void;
  /** Real hardware/UA platform detected from the browser */
  detectedPlatform: PlatformKind;
  /** Active layout platform resolved from mode + detectedPlatform */
  effectivePlatform: PlatformKind;
  /** True whenever the UI is actively adapted for iOS or Android ergonomics */
  isMobileAdapted: boolean;
  /** True when viewport width < 768px */
  isSmallViewport: boolean;
  /** True when the app is running installed on Home Screen (PWA/Standalone) */
  isStandalone: boolean;
  /** True if the user or OS prefers reduced motion */
  prefersReducedMotion: boolean;
  /** Toggle for the global YouTube ambient video background */
  videoBgEnabled: boolean;
  setVideoBgEnabled: (enabled: boolean) => void;
}

const STORAGE_MODE_KEY = "bh-konver-device-adaptation";
const STORAGE_VIDEO_KEY = "bh-konver-video-bg";

const DeviceAdaptationContext = createContext<DeviceAdaptationContextValue | undefined>(undefined);

function detectHardwarePlatform(): {
  platform: PlatformKind;
  isTouch: boolean;
  isStandalone: boolean;
} {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return { platform: "desktop", isTouch: false, isStandalone: false };
  }

  const ua = navigator.userAgent || "";
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isIOS =
    /iPad|iPhone|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const isStandalone =
    window.matchMedia?.("(display-mode: standalone)")?.matches === true ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone);

  let platform: PlatformKind = "desktop";
  if (isIOS) platform = "ios";
  else if (isAndroid) platform = "android";

  return { platform, isTouch, isStandalone };
}

function readStoredMode(): AdaptationMode {
  if (typeof window === "undefined") return "auto";
  try {
    const raw = window.localStorage.getItem(STORAGE_MODE_KEY);
    if (raw === "auto" || raw === "ios" || raw === "android" || raw === "desktop") {
      return raw;
    }
  } catch {
    // Ignore storage access errors
  }
  return "auto";
}

function readStoredVideoBg(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_VIDEO_KEY);
    if (raw === "false") return false;
    if (raw === "true") return true;
  } catch {
    // Ignore storage access errors
  }
  return true;
}

export const DeviceAdaptationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<AdaptationMode>(readStoredMode);
  const [videoBgEnabled, setVideoBgState] = useState<boolean>(readStoredVideoBg);
  const [isSmallViewport, setIsSmallViewport] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false
  );

  const hardware = useMemo(() => detectHardwarePlatform(), []);

  useEffect(() => {
    const onResize = () => {
      setIsSmallViewport(window.innerWidth < 768);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setMode = (next: AdaptationMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_MODE_KEY, next);
    } catch {
      // Ignore storage errors
    }
  };

  const setVideoBgEnabled = (enabled: boolean) => {
    setVideoBgState(enabled);
    try {
      window.localStorage.setItem(STORAGE_VIDEO_KEY, String(enabled));
    } catch {
      // Ignore storage errors
    }
  };

  const effectivePlatform: PlatformKind = useMemo(() => {
    if (mode === "ios" || mode === "android" || mode === "desktop") {
      return mode;
    }
    if (hardware.platform === "ios") return "ios";
    if (hardware.platform === "android") return "android";
    // When running in a mobile/touch viewport on any browser in "auto" mode, adapt to mobile ergonomics
    if (isSmallViewport && hardware.isTouch) return "android";
    if (isSmallViewport) return "android";
    return "desktop";
  }, [mode, hardware.platform, hardware.isTouch, isSmallViewport]);

  const isMobileAdapted = effectivePlatform === "ios" || effectivePlatform === "android";

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.platform = effectivePlatform;
    root.dataset.adaptiveMode = mode;

    root.classList.toggle("platform-ios", effectivePlatform === "ios");
    root.classList.toggle("platform-android", effectivePlatform === "android");
    root.classList.toggle("platform-mobile-adapted", isMobileAdapted);
    root.classList.toggle("platform-desktop", effectivePlatform === "desktop");
  }, [effectivePlatform, mode, isMobileAdapted]);

  const value = useMemo<DeviceAdaptationContextValue>(
    () => ({
      mode,
      setMode,
      detectedPlatform: hardware.platform,
      effectivePlatform,
      isMobileAdapted,
      isSmallViewport,
      isStandalone: hardware.isStandalone,
      prefersReducedMotion,
      videoBgEnabled,
      setVideoBgEnabled,
    }),
    [
      mode,
      hardware.platform,
      effectivePlatform,
      isMobileAdapted,
      isSmallViewport,
      hardware.isStandalone,
      prefersReducedMotion,
      videoBgEnabled,
    ]
  );

  return (
    <DeviceAdaptationContext.Provider value={value}>
      {children}
    </DeviceAdaptationContext.Provider>
  );
};

export function useDeviceAdaptation(): DeviceAdaptationContextValue {
  const ctx = useContext(DeviceAdaptationContext);
  if (!ctx) {
    return {
      mode: "auto",
      setMode: () => {},
      detectedPlatform: "desktop",
      effectivePlatform: "desktop",
      isMobileAdapted: false,
      isSmallViewport: false,
      isStandalone: false,
      prefersReducedMotion: false,
      videoBgEnabled: true,
      setVideoBgEnabled: () => {},
    };
  }
  return ctx;
}
