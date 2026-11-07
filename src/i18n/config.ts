import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { latinToCyrillic } from '@/utils/scriptText';

import bs from './locales/bs.json';
import bsCyrl from './locales/bs-Cyrl.json';
import en from './locales/en.json';
import de from './locales/de.json';
import tr from './locales/tr.json';

const resources = {
  bs: { translation: bs },
  'bs-Latn': { translation: bs },
  'bs-Cyrl': { translation: bsCyrl },
  'bs-cyrl': { translation: bsCyrl },
  sr: { translation: bsCyrl },
  en: { translation: en },
  de: { translation: de },
  tr: { translation: tr },
};

/** Normalize language codes to supported values */
export const normalizeLanguageCode = (code?: string | null): string => {
  if (!code) return 'bs';
  const trimmed = code.trim();
  const lower = trimmed.toLowerCase();

  if (
    lower === 'bs-cyrl' ||
    lower === 'bs_cyrl' ||
    lower === 'sr' ||
    lower === 'sr-cyrl' ||
    lower === 'sr_cyrl' ||
    lower === 'cyrillic' ||
    trimmed === 'bs-Cyrl'
  ) {
    return 'bs-Cyrl';
  }
  if (lower.startsWith('en')) return 'en';
  if (lower.startsWith('de')) return 'de';
  if (lower.startsWith('tr')) return 'tr';
  if (lower.startsWith('bs')) return 'bs';
  return trimmed;
};

/**
 * Checks whether a language or locale code belongs to the Balkan region
 * (Bosnian, Croatian, Serbian, Montenegrin).
 */
export const isBalkanRegionLanguage = (locale?: string | null): boolean => {
  if (!locale) return false;
  const l = locale.toLowerCase().trim();
  return (
    l.startsWith('bs') ||
    l.startsWith('hr') ||
    l.startsWith('sr') ||
    l.startsWith('cnr') ||
    l.startsWith('sh') ||
    l.includes('-ba') ||
    l.includes('-me') ||
    l.includes('-rs') ||
    l.includes('-hr')
  );
};

/**
 * Checks URL query param (?lang= or ?lng=) or URL pathname (/en or /en/...)
 */
export const getUrlLanguageParam = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const param = params.get('lang') || params.get('lng');
    if (param) {
      return normalizeLanguageCode(param);
    }

    const pathname = window.location.pathname.toLowerCase();
    if (pathname === '/en' || pathname === '/en/' || pathname.startsWith('/en/')) {
      return 'en';
    }
  } catch {
    // Ignore URL parse errors
  }
  return null;
};

// Retrieve stored language or default safely across all common keys
export const getStoredLanguage = (): string | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored =
        localStorage.getItem('language') ||
        localStorage.getItem('bh_konver_lang') ||
        localStorage.getItem('i18nextLng');

      if (stored) {
        return normalizeLanguageCode(stored);
      }
    }
  } catch {
    // Ignore restricted storage
  }
  return null;
};

export const persistLanguage = (lng: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const normalized = normalizeLanguageCode(lng);
      localStorage.setItem('language', normalized);
      localStorage.setItem('bh_konver_lang', normalized);
      localStorage.setItem('i18nextLng', normalized);

      if (normalized === 'bs-Cyrl') {
        localStorage.setItem('script', 'cyrillic');
      } else if (normalized === 'bs') {
        localStorage.setItem('script', 'latin');
      }

      if (document?.documentElement) {
        document.documentElement.lang = normalized === 'bs-Cyrl' ? 'bs' : normalized;
        document.documentElement.setAttribute('data-language', normalized);
      }
    }
  } catch {
    // Storage may be unavailable in private mode
  }
};

/**
 * Automatically determines initial language:
 * 1. Explicit direct link parameter (?lang=en or /en/) takes highest precedence.
 * 2. User's manually saved preference in localStorage (if they previously selected a language).
 * 3. Browser locale auto-detection:
 *    - If user is in/from our language area (bs, hr, sr, cnr) -> 'bs' (or 'bs-Cyrl').
 *    - If German (de) -> 'de'.
 *    - If Turkish (tr) -> 'tr'.
 *    - For ANYONE outside our language area (all international users/moderators) -> IMMEDIATELY 'en' (English).
 */
export const detectInitialLanguage = (): string => {
  // 1. Direct URL query param or direct /en path
  const urlLang = getUrlLanguageParam();
  if (urlLang) {
    persistLanguage(urlLang);
    return urlLang;
  }

  // 2. Previously saved user selection from localStorage
  const stored = getStoredLanguage();
  if (stored) {
    return stored;
  }

  // 3. Automatic browser locale detection
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    const candidateLocales: string[] = [];
    if (Array.isArray(navigator.languages)) {
      candidateLocales.push(...navigator.languages);
    }
    if (navigator.language) {
      candidateLocales.push(navigator.language);
    }
    const legacyNav = navigator as { userLanguage?: string };
    if (legacyNav.userLanguage) {
      candidateLocales.push(legacyNav.userLanguage);
    }

    for (const loc of candidateLocales) {
      if (!loc) continue;
      const lower = loc.toLowerCase().trim();

      // Check if user is from our local Balkan language area
      if (isBalkanRegionLanguage(lower)) {
        if (lower.includes('cyrl') || lower === 'sr' || lower.startsWith('sr-')) {
          persistLanguage('bs-Cyrl');
          return 'bs-Cyrl';
        }
        persistLanguage('bs');
        return 'bs';
      }

      // Specific regional matches
      if (lower.startsWith('de')) {
        persistLanguage('de');
        return 'de';
      }
      if (lower.startsWith('tr')) {
        persistLanguage('tr');
        return 'tr';
      }

      // Any visitor from anywhere else outside our language area:
      // Immediately serve English!
      persistLanguage('en');
      return 'en';
    }
  }

  // Default international fallback is English
  persistLanguage('en');
  return 'en';
};

const initialLang = detectInitialLanguage();

// PostProcessor to guarantee 100% Cyrillic coverage for bs-Cyrl locale
const cyrillicPostProcessor = {
  type: 'postProcessor' as const,
  name: 'cyrillicTranslit',
  process(value: string) {
    const currentLng = normalizeLanguageCode(i18n.language);
    if (currentLng === 'bs-Cyrl' && typeof value === 'string') {
      return latinToCyrillic(value);
    }
    return value;
  },
};

i18n
  .use(cyrillicPostProcessor)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: initialLang,
    postProcess: ['cyrillicTranslit'],
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Persist every language change so the locale is restored after
// authentication redirects and full page reloads.
i18n.on('languageChanged', (lng) => {
  persistLanguage(lng);
});

export default i18n;
