import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./resources/en";

const resources = {
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const getTranslated = (key: string) => {
  return i18n.t(key);
};
export default i18n;
