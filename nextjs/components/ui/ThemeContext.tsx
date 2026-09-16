"use client";

import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext({ isDark: false, toggle: () => {} });
export const useDarkModeContext = () => useContext(DarkModeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Dark is the signature look — default on unless the user picked light.
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") setIsDark(false);
    else setIsDark(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle: () => setIsDark((p) => !p) }}>
      {children}
    </DarkModeContext.Provider>
  );
}
