import { useTitle } from "src/composables/UseTitle";
import { LOCAL_STORAGE } from "src/constants/Keys";
import { App } from "vue";
import { createI18n } from "vue-i18n";

import type { Locale } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "",
  fallbackLocale: localStorage.getItem(LOCAL_STORAGE.LANG) || 'en',
  messages: {},
});

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob("../locales/**/*.ts")).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.ts$/)?.[1],
    loadLocale,
  ])
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>;

const languagesLabels: Record<string,string> = {
  en: 'English',
  // ADD LANG LABEL AND FILES IN locales FOLDER
}

export const availableLocales = Object.keys(localesMap).map((lang) => ({ value: lang, label: languagesLabels[lang]}))

const loadedLanguages: string[] = [];

function setI18nLanguage(lang: Locale) {
  const title = useTitle();

  i18n.global.locale.value = lang;
  localStorage.setItem(LOCAL_STORAGE.LANG, lang);
  if (typeof document !== "undefined") {
    document.querySelector("html")?.setAttribute("lang", lang);
    title.setTitle();
  }
  return lang;
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  if (i18n.global.locale.value === lang) {
    return setI18nLanguage(lang);
  }

  if (loadedLanguages.includes(lang)) {
    return setI18nLanguage(lang);
  }

  const messages = await localesMap[lang]();
  i18n.global.setLocaleMessage(lang, messages.default);
  loadedLanguages.push(lang);
  return setI18nLanguage(lang);
}

export const installI18n = (app: App) => {
  app.use(i18n);
  loadLanguageAsync(localStorage.getItem('lang') || 'en');
};

const { t } = i18n.global;

export { t };
