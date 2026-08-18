import React from "react";

export const PokemonCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-4 flex flex-col items-center gap-3">
      <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700/60 rounded-xl" />
      <div className="w-16 h-3 bg-slate-200 dark:bg-slate-700/60 rounded-full" />
      <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700/60 rounded-full" />
      <div className="flex gap-1.5 w-full justify-center">
        <div className="w-12 h-4 bg-slate-200 dark:bg-slate-700/60 rounded-full" />
        <div className="w-12 h-4 bg-slate-200 dark:bg-slate-700/60 rounded-full" />
      </div>
    </div>
  );
};

export const CategoryGridSkeleton: React.FC<{ count?: number }> = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const DetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/60 dark:bg-slate-800/60 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-700/60">
        <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-24 w-full bg-slate-200 dark:bg-slate-700 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
