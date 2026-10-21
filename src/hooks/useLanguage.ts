import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import i18nInstance from "@/i18n/config";

export type Script = "latin" | "cyrillic";

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  short: string;
  script?: Script;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: "bs",
    name: "Bosanski (Latinica)",
    nativeName: "Bosanski",
    short: "BS",
    script: "latin",
  },
  {
    code: "bs-Cyrl",
    name: "Bosanski (Ćirilica)",
    nativeName: "Ћирилица",
    short: "ĆIR",
    script: "cyrillic",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    short: "EN",
  },
  {
    code: "de",
    name: "Deutsch",
    nativeName: "Deutsch",
    short: "DE",
  },
  {
    code: "tr",
    name: "Türkçe",
    nativeName: "Türkçe",
    short: "TR",
  },
];

export const STORAGE_KEYS = {
  LANGUAGE: "language",
  I18NEXT_LNG: "i18nextLng",
  BH_KONVER_LANG: "bh_konver_lang",
  SCRIPT: "script",
} as const;

/**
 * Normalizes input language string (handling Cyrillic aliases, case differences, and locale variants)
 */
export const normalizeLanguageCode = (code?: string | null): string => {
  if (!code) return "bs";
  const trimmed = code.trim();
  const lower = trimmed.toLowerCase();

  if (
    lower === "bs-cyrl" ||
    lower === "bs_cyrl" ||
    lower === "sr" ||
    lower === "sr-cyrl" ||
    lower === "sr_cyrl" ||
    lower === "cyrillic" ||
    trimmed === "bs-Cyrl"
  ) {
    return "bs-Cyrl";
  }
  if (lower.startsWith("en")) return "en";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("tr")) return "tr";
  if (lower.startsWith("bs")) return "bs";
  return trimmed;
};

import {
  detectInitialLanguage,
  getUrlLanguageParam,
  isBalkanRegionLanguage,
  persistLanguage as configPersistLanguage,
} from "@/i18n/config";

export { detectInitialLanguage, getUrlLanguageParam, isBalkanRegionLanguage };

/**
 * Safely retrieve the stored user language preference from localStorage or auto-detection
 */
export const getStoredLanguage = (): string => {
  return detectInitialLanguage();
};

/**
 * Persist the selected language to localStorage across all lookup keys
 */
export const persistLanguage = (code: string): void => {
  configPersistLanguage(code);
};

/**
 * Custom React hook for language state management.
 * - Stores language preference in localStorage
 * - Automatically retrieves and synchronizes language on reload, direct URL links (?lang=en, /en/), and cross-tab storage changes
 * - Guarantees consistent UI language state across the entire application
 */
export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  // Internal reactive state initialized from URL param, storage or auto-detection
  const [language, setLanguageState] = useState<string>(() => {
    const detected = detectInitialLanguage();
    const current = normalizeLanguageCode(i18n.language || detected);
    return current;
  });

  // Function to change language and persist to storage
  const setLanguage = useCallback(
    (code: string) => {
      const normalized = normalizeLanguageCode(code);
      persistLanguage(normalized);
      setLanguageState(normalized);

      // Trigger i18next change
      i18n.changeLanguage(normalized);

      // Notify any listeners
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("languagechange"));
        window.dispatchEvent(new Event("scriptchange"));
      }
    },
    [i18n]
  );

  // Sync with i18n events and retrieve stored/URL language on application reload & navigation
  useEffect(() => {
    // 1. Check direct URL parameter first (?lang=en) or detected language
    const urlParam = getUrlLanguageParam();
    const targetLang = urlParam || detectInitialLanguage();
    const active = normalizeLanguageCode(i18n.language);

    if (targetLang && targetLang !== active) {
      setLanguageState(targetLang);
      i18n.changeLanguage(targetLang);
      persistLanguage(targetLang);
    } else if (active) {
      setLanguageState((prev) => (prev !== active ? active : prev));
      persistLanguage(active);
    }

    // 2. React to i18n languageChanged event
    const handleLanguageChanged = (lng: string) => {
      const normalized = normalizeLanguageCode(lng);
      setLanguageState((prev) => (prev !== normalized ? normalized : prev));
      persistLanguage(normalized);
    };

    // 3. React to cross-tab/window storage updates
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === STORAGE_KEYS.LANGUAGE ||
        e.key === STORAGE_KEYS.BH_KONVER_LANG ||
        e.key === STORAGE_KEYS.I18NEXT_LNG
      ) {
        if (e.newValue) {
          const normalized = normalizeLanguageCode(e.newValue);
          setLanguageState(normalized);
          i18n.changeLanguage(normalized);
        }
      }
    };

    i18n.on("languageChanged", handleLanguageChanged);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [i18n]);

  const activeOption = useMemo(() => {
    return (
      SUPPORTED_LANGUAGES.find((opt) => opt.code === language) ||
      SUPPORTED_LANGUAGES[0]
    );
  }, [language]);

  const isCyrillic = language === "bs-Cyrl";

  return {
    language,
    currentLanguage: language,
    activeOption,
    supportedLanguages: SUPPORTED_LANGUAGES,
    setLanguage,
    changeLanguage: setLanguage,
    isCyrillic,
    t,
    i18n,
  };
};

export default useLanguage;
