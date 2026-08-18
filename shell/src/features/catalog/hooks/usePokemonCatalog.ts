import { useState, useEffect } from "react";
import type { CategoryData } from "../types";
import { DEFAULT_HOME_CATEGORIES } from "../../../config/pokemon.config";
import { getPokemonByCategory } from "../../../services/pokemonApi";

export const usePokemonCatalog = () => {
  const [categories, setCategories] = useState<CategoryData[]>(() =>
    DEFAULT_HOME_CATEGORIES.map((cat) => ({
      categoryId: cat.id,
      categoryLabel: cat.label,
      color: cat.color,
      pokemons: [],
      loading: true,
      error: null,
    })),
  );

  const [isLoadingAll, setIsLoadingAll] = useState(true);

  const fetchCategoryData = async () => {
    setIsLoadingAll(true);
    const promises = DEFAULT_HOME_CATEGORIES.map(async (cat) => {
      try {
        const pokemons = await getPokemonByCategory(cat.id);
        return {
          categoryId: cat.id,
          categoryLabel: cat.label,
          color: cat.color,
          pokemons,
          loading: false,
          error: null,
        };
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al cargar categoría";
        return {
          categoryId: cat.id,
          categoryLabel: cat.label,
          color: cat.color,
          pokemons: [],
          loading: false,
          error: errorMessage,
        };
      }
    });

    const results = await Promise.all(promises);
    setCategories(results);
    setIsLoadingAll(false);
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return {
    categories,
    isLoadingAll,
    refetch: fetchCategoryData,
  };
};
