import React from "react";
import type { FormattedStat } from "../../types/pokemon";

interface StatBarProps {
  stat: FormattedStat;
}

export const StatBar: React.FC<StatBarProps> = ({ stat }) => {
  return (
    <div className="flex flex-col gap-1 sm:grid sm:grid-cols-12 sm:items-center sm:gap-3 py-1">
      <span className="sm:col-span-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
        {stat.label}
      </span>
      <span className="sm:col-span-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 text-right sm:text-left">
        {stat.value}
      </span>
      <div className="sm:col-span-7 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${stat.colorClass.split(" ")[0]}`}
          style={{ width: `${stat.percentage}%` }}
        />
      </div>
    </div>
  );
};
