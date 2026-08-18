export const DEFAULT_HOME_CATEGORIES = [
  { id: "fire", label: "Fuego 🔥", color: "from-orange-500/20 to-red-500/10" },
  { id: "water", label: "Agua 💧", color: "from-blue-500/20 to-cyan-500/10" },
  {
    id: "grass",
    label: "Planta 🌿",
    color: "from-emerald-500/20 to-green-500/10",
  },
  {
    id: "electric",
    label: "Eléctrico ⚡",
    color: "from-yellow-500/20 to-amber-500/10",
  },
  {
    id: "psychic",
    label: "Psíquico 🔮",
    color: "from-pink-500/20 to-purple-500/10",
  },
  {
    id: "dragon",
    label: "Dragón 🐉",
    color: "from-indigo-500/20 to-violet-500/10",
  },
];

export const POKEMON_CONFIG = {
  HOME_LIMIT_PER_CATEGORY: 10,
  SEARCH_INITIAL_LIMIT: 30,
  SEARCH_PAGE_SIZE: 30,
  STORAGE_KEYS: {
    LAST_VISITED: "last-visited-pokemon",
    TOAST_DISMISSED: "toast-dismissed",
    AUTH: "auth-storage",
    THEME: "theme-storage",
    VISIT_HISTORY: "pokemon-visit-history",
  },
} as const;
