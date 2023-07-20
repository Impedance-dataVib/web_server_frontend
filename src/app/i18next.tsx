import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import fr from "./translations/fr.json";
import dashboardEn from "./translations/dashboard/en.json";
import dashboardFr from "./translations/dashboard/fr.json";

i18n
  //   .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },

    resources: {
      en: {
        root: {
          ...en,
        },
        dashboard: {
          ...dashboardEn,
        },
      },
      fr: {
        root: {
          ...fr,
        },
        dashboard: {
          ...dashboardFr,
        },
      },
    },
  });

export default i18n;
