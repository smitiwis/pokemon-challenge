import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ROUTES } from "../../../config/routes";

export const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate(ROUTES.LOGIN);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="w-7 h-7 rounded-full bg-linear-to-tr from-red-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <span className="text-xs font-medium text-slate-700 dark:text-slate-200 hidden sm:inline max-w-30 truncate">
          {user.username}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
            <p className="text-[10px] uppercase font-semibold text-slate-400">
              Entrenador Activo
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
              {user.username}
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate(ROUTES.HISTORY);
            }}
            className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
          >
            <span>📜</span> Ver Historial
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 font-medium"
          >
            <span>🚪</span> Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};
