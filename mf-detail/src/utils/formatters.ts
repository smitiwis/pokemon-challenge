import type { PokemonSpecies, PokemonSprites } from "../types/pokemon";

/**
 * Formatea el ID de un Pokémon con ceros a la izquierda (ej: #001, #025, #1000)
 */
export const formatPokemonId = (id: number | string): string => {
  const num = Number(id);
  if (isNaN(num)) return `#${id}`;
  return `#${num.toString().padStart(3, "0")}`;
};

/**
 * Capitaliza palabras, manejando guiones y espacios (ej: "tapu-koko" -> "Tapu Koko")
 */
export const capitalize = (str?: string): string => {
  if (!str) return "";
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Convierte altura de decímetros a metros (ej: 7 -> "0.7 m")
 */
export const formatHeight = (heightInDecimeters?: number): string => {
  if (heightInDecimeters === undefined || heightInDecimeters === null) return "--";
  const meters = heightInDecimeters / 10;
  return `${meters.toFixed(1)} m`;
};

/**
 * Convierte peso de hectogramos a kilogramos (ej: 69 -> "6.9 kg")
 */
export const formatWeight = (weightInHectograms?: number): string => {
  if (weightInHectograms === undefined || weightInHectograms === null) return "--";
  const kg = weightInHectograms / 10;
  return `${kg.toFixed(1)} kg`;
};

/**
 * Obtiene la mejor imagen disponible dando prioridad a SVG sin fondo (Dream World),
 * con fallback a Official Artwork, Home y sprite frontal.
 */
export const getBestPokemonImage = (
  sprites?: PokemonSprites,
  id?: number | string,
): { primary: string; fallback: string } => {
  const dreamWorldSvg = sprites?.other?.dream_world?.front_default;
  const officialArtwork = sprites?.other?.["official-artwork"]?.front_default;
  const homeArtwork = sprites?.other?.home?.front_default;
  const frontDefault = sprites?.front_default;

  const fallbackUrl =
    officialArtwork ||
    homeArtwork ||
    frontDefault ||
    (id
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      : "");

  // Prioridad 1: SVG de Dream World (si existe)
  const primaryUrl = dreamWorldSvg || fallbackUrl;

  return {
    primary: primaryUrl,
    fallback: fallbackUrl,
  };
};

/**
 * Extrae la descripción oficial (flavor text) priorizando español, luego inglés.
 */
export const extractFlavorText = (species: PokemonSpecies | null): string => {
  if (!species?.flavor_text_entries?.length) {
    return "No hay información descriptiva disponible para este Pokémon.";
  }

  // Buscar en español ('es')
  const spanishEntry = species.flavor_text_entries.find(
    (entry) => entry.language.name === "es",
  );
  if (spanishEntry) {
    return cleanFlavorText(spanishEntry.flavor_text);
  }

  // Fallback a inglés ('en')
  const englishEntry = species.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  );
  if (englishEntry) {
    return cleanFlavorText(englishEntry.flavor_text);
  }

  return cleanFlavorText(species.flavor_text_entries[0].flavor_text);
};

/**
 * Extrae la categoría/género del Pokémon (ej: "Pokémon Ratón")
 */
export const extractCategory = (species: PokemonSpecies | null): string => {
  if (!species?.genera?.length) return "Pokémon";

  const spanishGenus = species.genera.find(
    (genus) => genus.language.name === "es",
  );
  if (spanishGenus) return spanishGenus.genus;

  const englishGenus = species.genera.find(
    (genus) => genus.language.name === "en",
  );
  if (englishGenus) return englishGenus.genus;

  return species.genera[0].genus || "Pokémon";
};

/**
 * Limpia saltos de línea molestos y caracteres especiales que vienen en la PokeAPI
 */
const cleanFlavorText = (text: string): string => {
  return text
    .replace(/[\n\f\r]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};
