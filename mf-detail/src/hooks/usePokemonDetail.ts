import { useState, useEffect, useCallback } from "react";
import { pokemonService } from "../services/pokemonService";
import {
  formatPokemonId,
  formatHeight,
  formatWeight,
  getBestPokemonImage,
  extractFlavorText,
  extractCategory,
  capitalize,
} from "../utils/formatters";
import { STAT_MAP } from "../config/constants";
import type {
  Pokemon,
  PokemonSpecies,
  PokemonDetailData,
  FormattedStat,
} from "../types/pokemon";

interface UsePokemonDetailResult {
  pokemon: PokemonDetailData | null;
  rawPokemon: Pokemon | null;
  species: PokemonSpecies | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const usePokemonDetail = (
  idOrName?: string | number,
): UsePokemonDetailResult => {
  const [pokemon, setPokemon] = useState<PokemonDetailData | null>(null);
  const [rawPokemon, setRawPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonDetail = useCallback(async () => {
    if (!idOrName) {
      setLoading(false);
      setError("No se proporcionó un ID o nombre de Pokémon.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Obtener datos de Pokémon y Species en paralelo
      const [pokemonRes, speciesRes] = await Promise.allSettled([
        pokemonService.getPokemon(idOrName),
        pokemonService.getSpecies(idOrName),
      ]);

      if (pokemonRes.status === "rejected") {
        throw new Error(
          `No se pudo encontrar información para el Pokémon "${idOrName}".`,
        );
      }

      const raw = pokemonRes.value;
      const speciesData =
        speciesRes.status === "fulfilled" ? speciesRes.value : null;

      setRawPokemon(raw);
      setSpecies(speciesData);

      // 2. Procesar imágenes (priorizando SVG Dream World sin fondo)
      const images = getBestPokemonImage(raw.sprites, raw.id);

      // 3. Procesar tipos
      const types = raw.types.map((t) => t.type.name.toLowerCase());
      const primaryType = types[0] || "normal";

      // 4. Procesar estadísticas base
      const formattedStats: FormattedStat[] = raw.stats.map((statItem) => {
        const statKey = statItem.stat.name;
        const config = STAT_MAP[statKey] || {
          label: capitalize(statKey),
          max: 200,
          colorClass: "bg-blue-500 text-blue-500",
        };

        const val = statItem.base_stat;
        const percentage = Math.min(
          100,
          Math.round((val / config.max) * 100),
        );

        return {
          name: statKey,
          label: config.label,
          value: val,
          max: config.max,
          percentage,
          colorClass: config.colorClass,
        };
      });

      const totalStats = raw.stats.reduce(
        (acc, curr) => acc + curr.base_stat,
        0,
      );

      // 5. Procesar habilidades
      const abilities = raw.abilities.map((a) =>
        capitalize(a.ability.name) + (a.is_hidden ? " (Oculta)" : ""),
      );

      // 6. Ensamblar modelo de datos procesado
      const processedData: PokemonDetailData = {
        id: raw.id,
        name: raw.name,
        formattedId: formatPokemonId(raw.id),
        image: images.primary,
        fallbackImage: images.fallback,
        types,
        primaryType,
        heightFormatted: formatHeight(raw.height),
        weightFormatted: formatWeight(raw.weight),
        abilities,
        description: extractFlavorText(speciesData),
        category: extractCategory(speciesData),
        stats: formattedStats,
        totalStats,
      };

      setPokemon(processedData);
    } catch (err: unknown) {
      console.error("Error cargando detalle de Pokémon:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Ocurrió un error al cargar el Pokémon.";
      setError(msg);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }, [idOrName]);

  useEffect(() => {
    fetchPokemonDetail();
  }, [fetchPokemonDetail]);

  return {
    pokemon,
    rawPokemon,
    species,
    loading,
    error,
    refetch: fetchPokemonDetail,
  };
};
