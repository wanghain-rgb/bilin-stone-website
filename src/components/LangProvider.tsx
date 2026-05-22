"use client";

import { createContext, useContext, useEffect, useState } from "react";
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

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "zh" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    localStorage.setItem("lang", l);
    setLangState(l);
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
