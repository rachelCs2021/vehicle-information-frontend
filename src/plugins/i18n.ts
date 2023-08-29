import { createI18n } from "vue-i18n";
import he from "../locales/he.json";
import en from "../locales/en.json";

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || "he",
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || "en",
  messages: {
    he,
    en
  }
});

export default i18n;