export const POKEAPI_CONFIG = {
  BASE_URL: "https://pokeapi.co/api/v2",
  TIMEOUT: 10000,
} as const;

export const STORAGE_KEYS = {
  VISIT_HISTORY: "pokemon-visit-history",
  LAST_VISITED: "last-visited-pokemon",
  TOAST_DISMISSED: "toast-dismissed",
} as const;

export const STAT_MAP: Record<
  string,
  { label: string; max: number; colorClass: string }
> = {
  hp: { label: "HP", max: 255, colorClass: "bg-emerald-500 text-emerald-500" },
  attack: { label: "Ataque", max: 200, colorClass: "bg-red-500 text-red-500" },
  defense: { label: "Defensa", max: 250, colorClass: "bg-blue-500 text-blue-500" },
  "special-attack": {
    label: "Atq. Esp.",
    max: 200,
    colorClass: "bg-amber-500 text-amber-500",
  },
  "special-defense": {
    label: "Def. Esp.",
    max: 250,
    colorClass: "bg-indigo-500 text-indigo-500",
  },
  speed: { label: "Velocidad", max: 200, colorClass: "bg-pink-500 text-pink-500" },
};

export const TYPE_COLOR_MAP: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
    accent: string;
  }
> = {
  normal: {
    bg: "bg-stone-500/10",
    text: "text-stone-700 dark:text-stone-300",
    border: "border-stone-400/30",
    badgeBg: "bg-stone-500",
    badgeText: "text-white",
    gradient: "from-stone-500/20 to-stone-600/5",
    accent: "#a8a878",
  },
  fire: {
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-400/30",
    badgeBg: "bg-gradient-to-r from-orange-500 to-red-500",
    badgeText: "text-white",
    gradient: "from-orange-500/25 to-red-500/10",
    accent: "#f08030",
  },
  water: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-400/30",
    badgeBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
    badgeText: "text-white",
    gradient: "from-blue-500/25 to-cyan-500/10",
    accent: "#6890f0",
  },
  grass: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-400/30",
    badgeBg: "bg-gradient-to-r from-emerald-500 to-green-600",
    badgeText: "text-white",
    gradient: "from-emerald-500/25 to-green-500/10",
    accent: "#78c850",
  },
  electric: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-400/30",
    badgeBg: "bg-gradient-to-r from-yellow-400 to-amber-500",
    badgeText: "text-slate-900 font-bold",
    gradient: "from-yellow-400/25 to-amber-500/10",
    accent: "#f8d030",
  },
  ice: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-400/30",
    badgeBg: "bg-gradient-to-r from-cyan-400 to-teal-500",
    badgeText: "text-slate-900 font-bold",
    gradient: "from-cyan-400/25 to-teal-500/10",
    accent: "#98d8d8",
  },
  fighting: {
    bg: "bg-red-700/10",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-600/30",
    badgeBg: "bg-gradient-to-r from-red-600 to-rose-700",
    badgeText: "text-white",
    gradient: "from-red-600/25 to-rose-700/10",
    accent: "#c03028",
  },
  poison: {
    bg: "bg-purple-600/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-400/30",
    badgeBg: "bg-gradient-to-r from-purple-600 to-fuchsia-600",
    badgeText: "text-white",
    gradient: "from-purple-600/25 to-fuchsia-600/10",
    accent: "#a040a0",
  },
  ground: {
    bg: "bg-amber-600/10",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-500/30",
    badgeBg: "bg-gradient-to-r from-amber-600 to-yellow-600",
    badgeText: "text-white",
    gradient: "from-amber-600/25 to-yellow-600/10",
    accent: "#e0c068",
  },
  flying: {
    bg: "bg-indigo-400/10",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-300/30",
    badgeBg: "bg-gradient-to-r from-indigo-400 to-sky-400",
    badgeText: "text-white",
    gradient: "from-indigo-400/25 to-sky-400/10",
    accent: "#a890f0",
  },
  psychic: {
    bg: "bg-pink-500/10",
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-400/30",
    badgeBg: "bg-gradient-to-r from-pink-500 to-rose-500",
    badgeText: "text-white",
    gradient: "from-pink-500/25 to-rose-500/10",
    accent: "#f85888",
  },
  bug: {
    bg: "bg-lime-600/10",
    text: "text-lime-700 dark:text-lime-400",
    border: "border-lime-500/30",
    badgeBg: "bg-gradient-to-r from-lime-600 to-green-600",
    badgeText: "text-white",
    gradient: "from-lime-600/25 to-green-600/10",
    accent: "#a8b820",
  },
  rock: {
    bg: "bg-amber-800/10",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-700/30",
    badgeBg: "bg-gradient-to-r from-amber-700 to-stone-700",
    badgeText: "text-white",
    gradient: "from-amber-700/25 to-stone-700/10",
    accent: "#b8a038",
  },
  ghost: {
    bg: "bg-violet-700/10",
    text: "text-violet-600 dark:text-violet-300",
    border: "border-violet-500/30",
    badgeBg: "bg-gradient-to-r from-violet-700 to-indigo-800",
    badgeText: "text-white",
    gradient: "from-violet-700/25 to-indigo-800/10",
    accent: "#705898",
  },
  dragon: {
    bg: "bg-indigo-600/10",
    text: "text-indigo-600 dark:text-indigo-300",
    border: "border-indigo-500/30",
    badgeBg: "bg-gradient-to-r from-indigo-600 to-violet-700",
    badgeText: "text-white",
    gradient: "from-indigo-600/25 to-violet-700/10",
    accent: "#7038f8",
  },
  dark: {
    bg: "bg-neutral-800/10",
    text: "text-neutral-800 dark:text-neutral-200",
    border: "border-neutral-700/30",
    badgeBg: "bg-gradient-to-r from-neutral-800 to-stone-900",
    badgeText: "text-white",
    gradient: "from-neutral-800/25 to-stone-900/10",
    accent: "#705848",
  },
  steel: {
    bg: "bg-slate-400/10",
    text: "text-slate-600 dark:text-slate-300",
    border: "border-slate-400/30",
    badgeBg: "bg-gradient-to-r from-slate-500 to-gray-600",
    badgeText: "text-white",
    gradient: "from-slate-500/25 to-gray-600/10",
    accent: "#b8b8d0",
  },
  fairy: {
    bg: "bg-pink-400/10",
    text: "text-pink-600 dark:text-pink-300",
    border: "border-pink-300/30",
    badgeBg: "bg-gradient-to-r from-pink-400 to-rose-400",
    badgeText: "text-white",
    gradient: "from-pink-400/25 to-rose-400/10",
    accent: "#ee99ac",
  },
};
