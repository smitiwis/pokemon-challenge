export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonTypeEntry {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonStatEntry {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    dream_world?: {
      front_default: string | null;
    };
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonTypeEntry[];
  stats: PokemonStatEntry[];
}

export interface PokemonTypeResponse {
  id: number;
  name: string;
  pokemon: {
    pokemon: NamedAPIResource;
    slot: number;
  }[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface LastVisitedPokemon {
  id: number | string;
  name: string;
  image?: string;
  visitedAt: string;
}

export interface PokemonTypeColors {
  bg: string;
  text: string;
  border: string;
}

export interface PokemonTypeVariants extends Record<
  string,
  PokemonTypeColors
> {}
