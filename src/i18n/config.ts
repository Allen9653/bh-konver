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

// Retrieve stored language or default safely across all common keys
export const getStoredLanguage = (): string => {
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
  return 'bs';
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

const initialLang = getStoredLanguage();

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
    fallbackLng: 'bs',
    lng: initialLang,
    postProcess: ['cyrillicTranslit'],
    detection: {
      order: ['localStorage', 'navigator'],
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
