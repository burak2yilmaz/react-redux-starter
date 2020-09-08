import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const languageDetector = new LanguageDetector(null, {
    lookupLocalStorage: 'lng'
});

import EN from './translations/en.json'
import TR from './translations/tr.json'

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            "tr-TR": {
                translations: TR
            },
            "en-US": {
                translations: EN
            }
        },
        fallbackLng: "tr-TR",
        debug: false,
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: ".",
        nsSeparator: ":",
        languages: ['en-US', 'tr-TR'],
        interpolation: {
            escapeValue: false,
            formatSeparator: ","
        },
        react: {
            wait: true
        }
});

export default i18n;