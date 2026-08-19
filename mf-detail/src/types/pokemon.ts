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

export interface PokemonAbilityEntry {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    dream_world?: {
      front_default: string | null;
      front_female?: string | null;
    };
    "official-artwork"?: {
      front_default: string | null;
      front_shiny?: string | null;
    };
    home?: {
      front_default: string | null;
      front_shiny?: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience?: number;
  sprites: PokemonSprites;
  types: PokemonTypeEntry[];
  stats: PokemonStatEntry[];
  abilities: PokemonAbilityEntry[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface GenusEntry {
  genus: string;
  language: NamedAPIResource;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: FlavorTextEntry[];
  genera: GenusEntry[];
  color?: NamedAPIResource;
  habitat?: NamedAPIResource;
}

export interface FormattedStat {
  name: string;
  label: string;
  value: number;
  max: number;
  percentage: number;
  colorClass: string;
}

export interface PokemonDetailData {
  id: number;
  name: string;
  formattedId: string;
  image: string;
  fallbackImage: string;
  types: string[];
  primaryType: string;
  heightFormatted: string; // ej: "0.7 m"
  weightFormatted: string; // ej: "6.9 kg"
  abilities: string[];
  description: string;
  category: string;
  stats: FormattedStat[];
  totalStats: number;
}
