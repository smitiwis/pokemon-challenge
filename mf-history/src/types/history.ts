export interface HistoryItem {
  id: number | string;
  name: string;
  image: string;
  visits: number;
  lastVisited: string; // ISO string
}

export const STORAGE_KEYS = {
  VISIT_HISTORY: "pokemon-visit-history",
  LAST_VISITED: "last-visited-pokemon",
  TOAST_DISMISSED: "toast-dismissed",
} as const;
