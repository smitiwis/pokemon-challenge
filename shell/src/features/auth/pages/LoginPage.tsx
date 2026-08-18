import { type FC } from "react";
import { LoginForm } from "../components/LoginForm";
import { ThemeToggle } from "../../../layouts/Header/ThemeToggle";

export const LoginPage: FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50 relative flex flex-col items-center">
        {/* Top bar with Theme Toggle */}
        <div className="w-full flex justify-end mb-2">
          <ThemeToggle />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 text-2xl mb-3">
            ⚡
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-slate-900 dark:text-white uppercase">
            POKÉDEX
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ingresa tu usuario para comenzar
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Minimal Footer */}
        <p className="mt-8 text-[11px] text-slate-400 dark:text-slate-600">
          Reto Técnico Microfrontends • React + Vite
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
