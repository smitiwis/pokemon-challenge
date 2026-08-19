import { TYPE_COLOR_MAP } from "../config/constants";

export const getTypeColors = (type?: string) => {
  const normalizedType = type?.toLowerCase().trim() || "normal";
  return (
    TYPE_COLOR_MAP[normalizedType] || {
      bg: "bg-slate-500/10",
      text: "text-slate-700 dark:text-slate-300",
      border: "border-slate-400/30",
      badgeBg: "bg-slate-500",
      badgeText: "text-white",
      gradient: "from-slate-500/20 to-slate-600/5",
      accent: "#64748b",
    }
  );
};
