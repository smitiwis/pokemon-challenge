import { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "debounce";
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

  const debouncedSearch = useMemo(
    () =>
      debounce(async (cleanName: string) => {
        setIsLoading(true);
        try {
          const result = await getPokemonByName(cleanName);
          if (result) {
            setExactMatch(result);
            setNotFound(false);
          } else {
            setExactMatch(null);
            setNotFound(true);
          }
        } catch (error) {
          console.error("Error buscando Pokémon:", error);
          setExactMatch(null);
          setNotFound(true);
        } finally {
          setIsLoading(false);
        }
      }, 500),
    [],
  );

  // Exact match search handler
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);

    const cleanQuery = normalizePokemonName(newQuery);
    if (!cleanQuery) {
      debouncedSearch.clear();
      setExactMatch(null);
      setNotFound(false);
      setIsLoading(false);
      return;
    }

    debouncedSearch(cleanQuery);
  };

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      loadInitialList();
    } else {
      setQuery("");
      setExactMatch(null);
      setNotFound(false);
      debouncedSearch.clear();
    }
  }, [isOpen, loadInitialList, debouncedSearch]);

  useEffect(() => {
    return () => {
      debouncedSearch.clear();
    };
  }, [debouncedSearch]);

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
