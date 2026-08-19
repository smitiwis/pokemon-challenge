import axios from "axios";
import { POKEAPI_CONFIG } from "../config/constants";
import type { Pokemon, PokemonSpecies } from "../types/pokemon";

const apiClient = axios.create({
  baseURL: POKEAPI_CONFIG.BASE_URL,
  timeout: POKEAPI_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const pokemonService = {
  /**
   * Obtiene la información principal de un Pokémon por ID o nombre.
   * GET https://pokeapi.co/api/v2/pokemon/{id_or_name}
   */
  async getPokemon(idOrName: string | number): Promise<Pokemon> {
    const cleanParam = String(idOrName).trim().toLowerCase();
    const response = await apiClient.get<Pokemon>(`/pokemon/${cleanParam}`);
    return response.data;
  },

  /**
   * Obtiene la información de especie (descripciones, categoría) por ID o nombre.
   * GET https://pokeapi.co/api/v2/pokemon-species/{id_or_name}
   */
  async getSpecies(idOrName: string | number): Promise<PokemonSpecies | null> {
    try {
      const cleanParam = String(idOrName).trim().toLowerCase();
      const response = await apiClient.get<PokemonSpecies>(
        `/pokemon-species/${cleanParam}`,
      );
      return response.data;
    } catch {
      // Algunas formas o Pokémon pueden no tener species o fallar, retornamos null de forma segura
      return null;
    }
  },
};
