import React from "react";

interface PokemonInfoGridProps {
  height: string;
  weight: string;
  abilities: string[];
}

export const PokemonInfoGrid: React.FC<PokemonInfoGridProps> = ({
  height,
  weight,
  abilities,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {/* Altura */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-center">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Altura
        </span>
        <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
          {height}
        </span>
      </div>

      {/* Peso */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-center">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Peso
        </span>
        <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
          {weight}
        </span>
      </div>

      {/* Habilidades */}
      <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-center">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Habilidades
        </span>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-0.5 truncate">
          {abilities.length > 0 ? abilities.join(", ") : "Ninguna"}
        </span>
      </div>
    </div>
  );
};
