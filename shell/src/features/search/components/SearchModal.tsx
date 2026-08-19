import { useEffect, useRef, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonCard, Modal, Input } from "../../../components/ui";
import { buildPokemonDetailRoute } from "../../../config/routes";
import { getPokemonImageUrl } from "../../../utils/pokemonHelpers";
import { usePokemonSearch } from "../hooks/usePokemonSearch";

export const SearchModal: FC = () => {
  const navigate = useNavigate();
  const observerTargetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isOpen,
    closeModal,
    query,
    setQuery,
    pokemons,
    exactMatch,
    notFound,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
  } = usePokemonSearch();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Infinite scroll intersection observer
  useEffect(() => {
    if (!isOpen || query.trim() !== "" || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTargetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [isOpen, query, hasMore, loadMore]);

  const handleSelectPokemon = (id: number | string) => {
    closeModal();
    navigate(buildPokemonDetailRoute(id));
  };

  const handleSearchChange = (search: string) => {
    setQuery(search);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} fullscreen>
      {/* Top Header / Close Button on top right (Mockup 3) */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 flex flex-col items-center shadow-xs transition-colors">
        <div className="w-full max-w-5xl flex justify-end mb-2">
          <button
            onClick={closeModal}
            className="text-2xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white p-1.5 transition-colors cursor-pointer"
            title="Cerrar modal (ESC)"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Centered Search Bar (Mockup 3) */}
        <div className="w-full max-w-lg">
          <Input
            ref={inputRef}
            placeholder="Buscar un Pokémon"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            leftIcon={<span className="text-base">🔍</span>}
            rightIcon={
              query ? (
                <button
                  onClick={() => setQuery("")}
                  className="flex items-center justify-center text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-white px-2 py-1 rounded cursor-pointer"
                  title="Limpiar búsqueda"
                  aria-label="Limpiar búsqueda"
                >
                  ✕
                </button>
              ) : null
            }
          />
        </div>
      </div>

      {/* Main Results Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Buscando Pokémon...
            </p>
          </div>
        )}

        {/* Exact Match State */}
        {!isLoading && exactMatch && (
          <div className="flex flex-col items-center py-6">
            <div className="inline-block px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full mb-4">
              ✓ Coincidencia Exacta Encontrada
            </div>
            <div className="w-full max-w-xs">
              <PokemonCard
                id={exactMatch.id}
                name={exactMatch.name}
                image={getPokemonImageUrl(exactMatch.id)}
                types={exactMatch.types.map((t) => t.type.name)}
                onClick={() => handleSelectPokemon(exactMatch.id)}
              />
            </div>
          </div>
        )}

        {/* Not Found State */}
        {!isLoading && notFound && (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="text-5xl mb-4">🔍❌</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              No encontrado
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No existe ningún Pokémon con el nombre exacto{" "}
              <span className="text-red-500 font-semibold font-mono">
                "{query}"
              </span>
              .
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              Recuerda escribir el nombre completo en minúsculas y sin acentos
              según las reglas de PokeAPI.
            </p>
          </div>
        )}

        {/* Default View: Initial 30 Pokémon + Infinite Scroll */}
        {!isLoading && !query && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  onClick={() => handleSelectPokemon(pokemon.id)}
                />
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            <div ref={observerTargetRef} className="py-8 flex justify-center">
              {isLoadingMore && (
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  <span>Cargando más Pokémon (+30)...</span>
                </div>
              )}
              {!hasMore && pokemons.length > 0 && (
                <p className="text-xs text-slate-500 font-medium">
                  Has llegado al final de la Pokédex.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
