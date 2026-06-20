"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { type Lang, translations, type Translations } from "@/lib/i18n";

type LangContextType = {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  t: translations.en,
  setLang: () => {},
});

const LANG_STORAGE_KEY = "lang";
const LANG_CHANGE_EVENT = "bilin-stone-lang-change";

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
  return stored === "zh" || stored === "en" ? stored : "en";
}

function subscribeToLangChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LANG_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LANG_CHANGE_EVENT, onStoreChange);
  };
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore<Lang>(subscribeToLangChanges, readStoredLang, () => "en");

  const setLang = (l: Lang) => {
    window.localStorage.setItem(LANG_STORAGE_KEY, l);
    window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang] as Translations, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
