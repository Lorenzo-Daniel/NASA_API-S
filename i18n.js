// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './public/locales/en';
import es from './public/locales/es';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: 'en', // idioma por defecto
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
