export interface CategoryPokemonItem {
  id: number;
  name: string;
  url: string;
  image: string;
  types?: string[];
}

export interface CategoryData {
  categoryId: string;
  categoryLabel: string;
  color: string;
  pokemons: CategoryPokemonItem[];
  loading: boolean;
  error: string | null;
}
