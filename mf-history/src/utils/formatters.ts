/**
 * Formatea el ID de un Pokémon a formato Pokedex (ej: #004, #025)
 */
export function formatPokemonId(id: number | string): string {
  const num = Number(id);
  if (isNaN(num)) return `#${id}`;
  return `#${String(num).padStart(3, "0")}`;
}

/**
 * Capitaliza palabras y nombres de Pokémon
 */
export function capitalize(str?: string): string {
  if (!str) return "";
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Retorna URL de fallback para artwork oficial
 */
export function getPokemonArtworkUrl(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

/**
 * Formatea fechas a formato legible relativo o fecha/hora
 */
export function formatLastVisitedDate(isoString?: string): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}
