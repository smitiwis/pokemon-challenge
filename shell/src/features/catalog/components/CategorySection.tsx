import { type FC } from "react";
import type { CategoryData } from "../types";
import { PokemonCard } from "../../../components/ui";
import { CategoryGridSkeleton } from "../../../components/feedback/Skeletons";

interface CategorySectionProps {
  category: CategoryData;
}

export const CategorySection: FC<CategorySectionProps> = ({ category }) => {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            {category.categoryLabel}
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium border border-slate-200 dark:border-slate-700">
            {category.pokemons.length} Pokémon
          </span>
        </div>
      </div>

      {category.loading && <CategoryGridSkeleton count={10} />}
      {category.error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-xs text-red-600 dark:text-red-400">
          No se pudieron cargar los Pokémon de esta categoría ({category.error}
          ).
        </div>
      )}
      {category.pokemons && category.pokemons.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {category.pokemons.map((pokemon) => (
            <PokemonCard
              key={`${category.categoryId}-${pokemon.id}`}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-xs text-red-600 dark:text-red-400">
          No se encontraron Pokémon en esta categoría.
        </div>
      )}
    </section>
  );
};
