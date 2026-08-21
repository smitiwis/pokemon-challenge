import { useEffect, useState, useCallback } from "react";
import type { LastVisitedPokemon } from "../../../types/pokemon";
import { POKEMON_CONFIG } from "../../../config/pokemon.config";
import { useLocation } from "react-router-dom";

export const useLastVisitedToast = () => {
  // DETECTAREN QUE PAGE ESTOY
  const location = useLocation();

  const [lastVisited, setLastVisited] = useState<LastVisitedPokemon | null>(
    null,
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        POKEMON_CONFIG.STORAGE_KEYS.LAST_VISITED,
      );
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

  useEffect(() => {
    const isPathDetail = location.pathname.includes("/pokemon/");
    setIsVisible(!isPathDetail);
  }, [location.pathname]);

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
