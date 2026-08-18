import { pokeApi, type CustomApiError } from "../api/axios";
import type {
  Pokemon,
  PokemonListResponse,
  PokemonTypeResponse,
} from "../types/pokemon";
import type { CategoryPokemonItem } from "../features/catalog/types";
import type { SearchPokemonItem } from "../features/search/types";
import { extractIdFromUrl, getPokemonImageUrl } from "../utils/pokemonHelpers";
import { POKEMON_CONFIG } from "../config/pokemon.config";
import { normalizePokemonName } from "../helpers";

/**
 * Obtiene los Pokémon pertenecientes a una categoría/tipo (ej. "fire", "water")
 * @param type Nombre del tipo en minúsculas
 * @param limit Cantidad de Pokémon a retornar (por defecto 10 para Home)
 * @returns Lista formateada y limpia de Pokémon listos para renderizar
 */
export const getPokemonByCategory = async (
  type: string,
  limit: number = POKEMON_CONFIG.HOME_LIMIT_PER_CATEGORY,
): Promise<CategoryPokemonItem[]> => {
  try {
    const cleanType = normalizePokemonName(type);
    const response = await pokeApi.get<PokemonTypeResponse>(
      `/type/${cleanType}`,
    );
    const list = response.data.pokemon.slice(0, limit);

    return list.map((item) => {
      const id = extractIdFromUrl(item.pokemon.url);
      return {
        id,
        name: item.pokemon.name,
        url: item.pokemon.url,
        image: getPokemonImageUrl(id),
        types: [cleanType],
      };
    });
  } catch (error) {
    const apiError = error as CustomApiError;
    console.error(
      `[pokemonApi.getPokemonByCategory] Error al obtener tipo "${type}":`,
      apiError?.message || error,
    );
    return [];
  }
};

/**
 * Obtiene el listado general paginado de Pokémon para el buscador y scroll infinito
 * @param offset Posición de inicio (por defecto 0)
 * @param limit Cantidad por página (por defecto 30)
 * @returns Objeto limpio con items formateados y bandera hasMore
 */
export const getPokemonList = async (
  offset: number = 0,
  limit: number = POKEMON_CONFIG.SEARCH_PAGE_SIZE,
): Promise<{ items: SearchPokemonItem[]; hasMore: boolean }> => {
  try {
    const response = await pokeApi.get<PokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`,
    );

    const items = response.data.results.map((item) => {
      const id = extractIdFromUrl(item.url);
      return {
        id,
        name: item.name,
        url: item.url,
        image: getPokemonImageUrl(id),
      };
    });

    return {
      items,
      hasMore: Boolean(response.data.next),
    };
  } catch (error) {
    const apiError = error as CustomApiError;
    console.error(
      `[pokemonApi.getPokemonList] Error al obtener listado offset ${offset}:`,
      apiError?.message || error,
    );
    return {
      items: [],
      hasMore: false,
    };
  }
};

/**
 * Busca un Pokémon por nombre exacto (Exact match)
 * @param name Nombre exacto del Pokémon
 * @returns Objeto Pokemon si existe, o null si no se encuentra (404) o falla
 */
export const getPokemonByName = async (
  name: string,
): Promise<Pokemon | null> => {
  const cleanName = normalizePokemonName(name);
  if (!cleanName) return null;

  try {
    const response = await pokeApi.get<Pokemon>(`/pokemon/${cleanName}`);
    return response.data;
  } catch (error) {
    const apiError = error as CustomApiError;
    if (apiError?.isNotFound) {
      return null;
    }
    console.error(
      `[pokemonApi.getPokemonByName] Error al buscar "${cleanName}":`,
      apiError?.message || error,
    );
    return null;
  }
};

/**
 * Obtiene los detalles completos de un Pokémon por su ID numérico
 * @param id ID numérico o string del Pokémon
 * @returns Objeto Pokemon con stats, tipos e imágenes
 */
export const getPokemonById = async (
  id: number | string,
): Promise<Pokemon | null> => {
  const cleanId = String(id).trim();
  if (!cleanId) return null;

  try {
    const response = await pokeApi.get<Pokemon>(`/pokemon/${cleanId}`);
    return response.data;
  } catch (error) {
    const apiError = error as CustomApiError;
    console.error(
      `[pokemonApi.getPokemonById] Error al obtener ID ${id}:`,
      apiError?.message || error,
    );
    return null;
  }
};
