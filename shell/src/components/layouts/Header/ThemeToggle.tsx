import React from "react";
import { useThemeStore } from "../../../store/useThemeStore";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-amber-400 transition-all duration-200 active:scale-95 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-red-500/50"
      title={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
      aria-label={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
    >
      <div className="w-5 h-5 flex items-center justify-center transition-transform duration-300">
        {isDark ? (
          // Sun Icon with warm glow for dark mode (click to switch to light)
          <svg
            className="w-5 h-5 text-amber-400 transform rotate-0 hover:rotate-45 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          // Moon Icon for light mode (click to switch to dark)
          <svg
            className="w-5 h-5 text-slate-700 transform rotate-0 hover:-rotate-12 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </div>
    </button>
  );
};
