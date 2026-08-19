import { useEffect, useRef } from "react";
import { recordPokemonVisit } from "../utils/historyStorage";
import type { PokemonDetailData } from "../types/pokemon";

/**
 * Hook que registra la visita del Pokémon una sola vez por render/cambio de ID
 */
export const useRecordVisit = (pokemon: PokemonDetailData | null) => {
  const recordedIdRef = useRef<number | string | null>(null);

  useEffect(() => {
    if (!pokemon) return;

    // Evitar registrar múltiples veces el mismo Pokémon en re-renders
    if (recordedIdRef.current === pokemon.id) return;

    recordedIdRef.current = pokemon.id;

    recordPokemonVisit({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image || pokemon.fallbackImage,
    });
  }, [pokemon]);
};
