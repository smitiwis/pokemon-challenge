import React from "react";
import { StatBar } from "./StatBar";
import type { FormattedStat } from "../../types/pokemon";

interface PokemonStatsCardProps {
  stats: FormattedStat[];
  totalStats: number;
}

export const PokemonStatsCard: React.FC<PokemonStatsCardProps> = ({
  stats,
  totalStats,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 dark:border-slate-700/60 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
          Estadísticas Base
        </h3>
        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
          Total: <span className="text-red-500 font-extrabold">{totalStats}</span>
        </span>
      </div>

      <div className="space-y-1.5">
        {stats.map((stat) => (
          <StatBar key={stat.name} stat={stat} />
        ))}
      </div>
    </div>
  );
};
