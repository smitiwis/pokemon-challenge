import { useEffect, useState, useCallback } from "react";
import type { LastVisitedPokemon } from "../../../types/pokemon";
import { POKEMON_CONFIG } from "../../../config/pokemon.config";

export const useLastVisitedToast = () => {
  const [lastVisited, setLastVisited] = useState<LastVisitedPokemon | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(POKEMON_CONFIG.STORAGE_KEYS.LAST_VISITED);
      const isDismissed = sessionStorage.getItem(
        POKEMON_CONFIG.STORAGE_KEYS.TOAST_DISMISSED,
      );

      if (stored && !isDismissed) {
        const parsed: LastVisitedPokemon = JSON.parse(stored);
        setLastVisited(parsed);
        setIsVisible(true);
      }
    } catch (e) {
      console.error("Error reading last visited pokemon:", e);
    }
  }, []);

  const dismissToast = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem(POKEMON_CONFIG.STORAGE_KEYS.TOAST_DISMISSED, "true");
  }, []);

  return {
    lastVisited,
    isVisible,
    dismissToast,
  };
};
