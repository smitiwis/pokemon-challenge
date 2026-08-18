import type { Pokemon } from "../../../types/pokemon";

export interface SearchPokemonItem {
  id: number;
  name: string;
  url: string;
  image: string;
}

export interface SearchState {
  isOpen: boolean;
  query: string;
  pokemons: SearchPokemonItem[];
  exactMatch: Pokemon | null;
  notFound: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  offset: number;
}
