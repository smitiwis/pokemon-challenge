export interface HistoryItem {
  id: number | string;
  name: string;
  image: string;
  visits: number;
  lastVisited: string; // ISO string
}

export interface LastVisitedPokemon {
  id: number | string;
  name: string;
  image?: string;
  visitedAt: string;
}
