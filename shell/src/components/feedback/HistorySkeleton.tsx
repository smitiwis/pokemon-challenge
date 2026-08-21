import React from "react";
import { Card } from "../ui/Card";

export const HistorySkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse">
      <Card className="p-6 sm:p-8 space-y-6">
        {/* Título y Badge Skeleton */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/80 pb-4">
          <div className="space-y-2">
            <div className="h-7 w-56 bg-slate-200 dark:bg-slate-700/60 rounded-lg" />
            <div className="h-3.5 w-72 bg-slate-200 dark:bg-slate-700/40 rounded" />
          </div>
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700/60 rounded-full" />
        </div>

        {/* Filas del Historial Skeleton (4 items) */}
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Cuadro de la Imagen */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-200 dark:bg-slate-700/60 shrink-0" />

                {/* Info: ID, Fecha y Nombre */}
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-slate-200 dark:bg-slate-700/40 rounded" />
                  <div className="h-5 w-36 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
                </div>
              </div>

              {/* Badge de Visitas */}
              <div className="h-7 w-24 bg-slate-200 dark:bg-slate-700/60 rounded-full shrink-0" />
            </div>
          ))}
        </div>

        {/* Barra de Acciones Inferior Skeleton */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
          <div className="h-10 w-28 bg-slate-200 dark:bg-slate-700/60 rounded-xl w-full sm:w-28" />
          <div className="h-10 w-36 bg-slate-200 dark:bg-slate-700/60 rounded-xl w-full sm:w-36" />
        </div>
      </Card>
    </div>
  );
};
