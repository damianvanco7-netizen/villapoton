import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import sk from './locales/sk.json';
import hu from './locales/hu.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sk: { translation: sk },
      hu: { translation: hu },
      en: { translation: en },
    },
    supportedLngs: ['sk', 'hu', 'en'],
    fallbackLng: 'sk',
    nonExplicitSupportedLngs: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      convertDetectedLanguage: (lng: string) => {
        const base = lng.split('-')[0].toLowerCase();
        if (base === 'sk' || base === 'cs') return 'sk';
        if (base === 'hu') return 'hu';
        return 'en';
      },
    },
  });

export default i18n;
