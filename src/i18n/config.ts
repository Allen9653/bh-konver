import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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

// Retrieve stored language or default safely
const getInitialLanguage = (): string => {
  try {
    const stored = localStorage.getItem('language');
    if (stored) {
      if (stored === 'bs-cyrl' || stored === 'sr') return 'bs-Cyrl';
      return stored;
    }
  } catch {
    // ignore
  }
  return 'bs';
};

const initialLang = getInitialLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'bs',
    lng: initialLang,
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
  try {
    const normalized = lng === 'bs-cyrl' || lng === 'sr' ? 'bs-Cyrl' : lng;
    localStorage.setItem('language', normalized);
    if (normalized === 'bs-Cyrl') {
      localStorage.setItem('script', 'cyrillic');
    } else if (normalized === 'bs') {
      localStorage.setItem('script', 'latin');
    }
  } catch {
    // Storage may be unavailable (private mode) — ignore.
  }
});

export default i18n;
