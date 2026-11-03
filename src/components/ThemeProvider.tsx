"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "light" | "dark";
export type PaletteMode = "indigo" | "vermilion" | "jade" | "cobalt";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  palette: PaletteMode;
  setPalette: (palette: PaletteMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  palette: "indigo",
  setPalette: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [palette, setPaletteState] = useState<PaletteMode>("indigo");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme | null;
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      requestAnimationFrame(() => {
        setTheme("dark");
      });
    } else {
      document.documentElement.classList.remove("dark");
    }

    const savedPalette = (localStorage.getItem("portfolio-palette") as PaletteMode | null) || "indigo";
    document.documentElement.setAttribute("data-palette", savedPalette);
    requestAnimationFrame(() => {
      setPaletteState(savedPalette);
    });
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const setPalette = (next: PaletteMode) => {
    setPaletteState(next);
    localStorage.setItem("portfolio-palette", next);
    document.documentElement.setAttribute("data-palette", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, palette, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
