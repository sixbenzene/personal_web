"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "zh";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType | null>(null);

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be inside LangProvider");
  return ctx;
}

// Flat dictionary access with dot notation: "hero.title"
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // fallback to key
    }
  }
  return typeof current === "string" ? current : path;
}

export function LangProvider({ children, dict }: { children: ReactNode; dict: { en: Record<string, unknown>; zh: Record<string, unknown> } }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string): string => {
    return getNestedValue(dict[lang] as Record<string, unknown>, key);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}
