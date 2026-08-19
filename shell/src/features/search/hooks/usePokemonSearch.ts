import { useState, useEffect, useCallback, useRef } from "react";
import type { SearchPokemonItem } from "../types";
import type { Pokemon } from "../../../types/pokemon";
import { POKEMON_CONFIG } from "../../../config/pokemon.config";
import { getPokemonByName, getPokemonList } from "../../../services/pokemonApi";
import { normalizePokemonName } from "../../../helpers";
import { useSearchStore } from "../store/useSearchStore";

export const usePokemonSearch = () => {
  const { isOpen, openModal, closeModal } = useSearchStore();
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState<SearchPokemonItem[]>([]);
  const [exactMatch, setExactMatch] = useState<Pokemon | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const debounceTimerRef = useRef<number | null>(null);

  // Load initial 30 Pokémon when modal opens
  const loadInitialList = useCallback(async () => {
    setIsLoading(true);
    try {
      const { items, hasMore: more } = await getPokemonList(
        0,
        POKEMON_CONFIG.SEARCH_PAGE_SIZE,
      );
      setPokemons(items);
      setOffset(POKEMON_CONFIG.SEARCH_PAGE_SIZE);
      setHasMore(more);
      setNotFound(false);
      setExactMatch(null);
    } catch (err) {
      console.error("Error loading initial search list:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      loadInitialList();
    } else {
      setQuery("");
      setExactMatch(null);
      setNotFound(false);
    }
  }, [isOpen, loadInitialList]);

  // Infinite scroll loader
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || query.trim() !== "") return;

    setIsLoadingMore(true);
    try {
      const { items, hasMore: more } = await getPokemonList(
        offset,
        POKEMON_CONFIG.SEARCH_PAGE_SIZE,
      );
      setPokemons((prev) => [...prev, ...items]);
      setOffset((prev) => prev + POKEMON_CONFIG.SEARCH_PAGE_SIZE);
      setHasMore(more);
    } catch (err) {
      console.error("Error loading more Pokémon:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, offset, query]);

  // Exact match search handler
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const clean = normalizePokemonName(newQuery);
    if (!clean) {
      setExactMatch(null);
      setNotFound(false);
      return;
    }

    debounceTimerRef.current = window.setTimeout(async () => {
      setIsLoading(true);
      const result = await getPokemonByName(clean);
      if (result) {
        setExactMatch(result);
        setNotFound(false);
      } else {
        setExactMatch(null);
        setNotFound(true);
      }
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    query,
    setQuery: handleQueryChange,
    pokemons,
    exactMatch,
    notFound,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
  };
};
