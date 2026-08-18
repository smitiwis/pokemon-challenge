/**
 * Limpia y normaliza el nombre de un Pokémon según las reglas de PokeAPI:
 * - minúsculas
 * - sin espacios al inicio/final
 * - sin acentos / tildes
 */
export const normalizePokemonName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
