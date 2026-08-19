import { create } from "zustand";
import { persist } from "zustand/middleware";
import { POKEMON_CONFIG } from "../config/pokemon.config";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

const applyThemeToDOM = (theme: Theme) => {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () => {
        const next: Theme = get().theme === "light" ? "dark" : "light";
        applyThemeToDOM(next);
        set({ theme: next });
      },
      setTheme: (theme: Theme) => {
        applyThemeToDOM(theme);
        set({ theme });
      },
      initTheme: () => {
        const currentTheme = get().theme;
        applyThemeToDOM(currentTheme);
      },
    }),
    {
      name: POKEMON_CONFIG.STORAGE_KEYS.THEME,
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyThemeToDOM(state.theme);
        }
      },
    },
  ),
);
