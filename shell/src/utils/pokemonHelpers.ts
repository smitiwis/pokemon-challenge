import type { PokemonTypeVariants } from "../types/pokemon";

/**
 * Extracts numeric Pokemon ID from a PokeAPI resource URL
 * e.g. "https://pokeapi.co/api/v2/pokemon/25/" -> 25
 */
export function extractIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  const idStr = parts[parts.length - 1];
  return parseInt(idStr, 10) || 0;
}

/**
 * Returns the best available high-res SVG or official artwork URL for a given Pokemon ID
 */
export function getPokemonImageUrl(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
}

/**
 * Fallback PNG artwork if SVG is unavailable
 */
export function getPokemonArtworkUrl(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

/**
 * Formats a numeric ID into a standard Pokedex number e.g. #025
 */
export function formatPokemonId(id: number | string): string {
  return `#${String(id).padStart(3, "0")}`;
}

/**
 * Capitalizes the first letter of a Pokemon name or word
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Type-to-color mapping for badges and visual cues
 */
export const POKEMON_TYPE_COLORS: PokemonTypeVariants = {
  fire: {
    bg: "bg-orange-500/15",
    text: "text-orange-500",
    border: "border-orange-500/30",
  },
  water: {
    bg: "bg-blue-500/15",
    text: "text-blue-500",
    border: "border-blue-500/30",
  },
  grass: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-500",
    border: "border-emerald-500/30",
  },
  electric: {
    bg: "bg-amber-400/15",
    text: "text-amber-500",
    border: "border-amber-400/30",
  },
  ice: {
    bg: "bg-cyan-400/15",
    text: "text-cyan-500",
    border: "border-cyan-400/30",
  },
  fighting: {
    bg: "bg-red-700/15",
    text: "text-red-600",
    border: "border-red-700/30",
  },
  poison: {
    bg: "bg-purple-500/15",
    text: "text-purple-500",
    border: "border-purple-500/30",
  },
  ground: {
    bg: "bg-yellow-600/15",
    text: "text-yellow-600",
    border: "border-yellow-600/30",
  },
  flying: {
    bg: "bg-indigo-400/15",
    text: "text-indigo-400",
    border: "border-indigo-400/30",
  },
  psychic: {
    bg: "bg-pink-500/15",
    text: "text-pink-500",
    border: "border-pink-500/30",
  },
  bug: {
    bg: "bg-lime-500/15",
    text: "text-lime-500",
    border: "border-lime-500/30",
  },
  rock: {
    bg: "bg-stone-500/15",
    text: "text-stone-500",
    border: "border-stone-500/30",
  },
  ghost: {
    bg: "bg-violet-700/15",
    text: "text-violet-500",
    border: "border-violet-700/30",
  },
  dragon: {
    bg: "bg-indigo-700/15",
    text: "text-indigo-500",
    border: "border-indigo-700/30",
  },
  dark: {
    bg: "bg-neutral-700/15",
    text: "text-neutral-400",
    border: "border-neutral-700/30",
  },
  steel: {
    bg: "bg-slate-400/15",
    text: "text-slate-400",
    border: "border-slate-400/30",
  },
  fairy: {
    bg: "bg-rose-400/15",
    text: "text-rose-400",
    border: "border-rose-400/30",
  },
  normal: {
    bg: "bg-zinc-400/15",
    text: "text-zinc-500",
    border: "border-zinc-400/30",
  },
};
