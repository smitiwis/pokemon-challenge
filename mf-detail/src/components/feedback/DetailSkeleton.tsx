import React from "react";
import { Card } from "../ui/Card";

export const DetailSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse">
      <Card className="p-6 sm:p-8 space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-700/80">
          <div className="space-y-2">
            <div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-700/60 rounded" />
            <div className="h-7 w-44 bg-slate-200 dark:bg-slate-700/60 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
          </div>
        </div>

        {/* Image Box Skeleton */}
        <div className="flex items-center justify-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 h-56 sm:h-64">
          <div className="w-40 h-40 bg-slate-200 dark:bg-slate-700/60 rounded-full" />
        </div>

        {/* Description Skeleton */}
        <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 space-y-2 border border-slate-200/60 dark:border-slate-700/60">
          <div className="h-3 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-700/80 rounded" />
          <div className="h-3.5 w-4/5 bg-slate-200 dark:bg-slate-700/80 rounded" />
        </div>

        {/* Info Grid Skeleton */}
        <div className="grid grid-cols-3 gap-3">
          <div className="h-16 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl" />
          <div className="h-16 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl" />
          <div className="h-16 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl" />
        </div>

        {/* Stats Skeleton */}
        <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/80 space-y-3 border border-slate-200 dark:border-slate-700/80">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700/60 rounded" />
              <div className="h-3 w-8 bg-slate-200 dark:bg-slate-700/60 rounded" />
              <div className="h-2.5 flex-1 bg-slate-200 dark:bg-slate-700/60 rounded-full" />
            </div>
          ))}
        </div>

        {/* Back Button Skeleton */}
        <div className="flex justify-center pt-2">
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
      </Card>
    </div>
  );
};
