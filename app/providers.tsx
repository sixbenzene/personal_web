"use client";

import { ReactNode } from "react";
import { LangProvider } from "./i18n/context";
import { dict } from "./i18n/dict";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider dict={dict}>
      {children}
    </LangProvider>
  );
}
