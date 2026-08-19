import React from "react";
import { useNavigate } from "react-router-dom";

interface DetailErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const DetailError: React.FC<DetailErrorProps> = ({
  message = "No pudimos cargar los detalles del Pokémon.",
  onRetry,
}) => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate("/");
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 text-center my-10">
      <div className="p-8 rounded-3xl bg-red-50/80 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 shadow-sm flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-3xl text-red-500 mb-4">
          ⚠️
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          ¡Ups! Algo salió mal
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
          {message}
        </p>

        <div className="flex items-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm shadow-sm hover:shadow transition-all"
            >
              Reintentar
            </button>
          )}
          <button
            onClick={onBack}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};
