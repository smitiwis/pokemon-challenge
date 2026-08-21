import React from "react";
import { useNavigate } from "react-router-dom";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import { useRecordVisit } from "../../hooks/useRecordVisit";
import { PokemonHeader } from "../../components/ui/PokemonHeader";
import { PokemonImage } from "../../components/ui/PokemonImage";
import { PokemonInfoGrid } from "../../components/ui/PokemonInfoGrid";
import { PokemonStatsCard } from "../../components/ui/PokemonStatsCard";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { DetailSkeleton } from "../../components/feedback/DetailSkeleton";
import { DetailError } from "../../components/feedback/DetailError";

export interface PokemonDetailViewProps {
  pokemonId?: string | number;
}

export const PokemonDetailView: React.FC<PokemonDetailViewProps> = ({
  pokemonId = "1",
}) => {
  const navigate = useNavigate();
  const { pokemon, loading, error, refetch } = usePokemonDetail(pokemonId);

  // Registrar visita en historial (Persistencia y Toast del Shell)
  useRecordVisit(pokemon);

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error || !pokemon) {
    return (
      <DetailError
        message={error || "No se encontraron datos del Pokémon."}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="w-full">
      <Card className="p-6 sm:p-8 space-y-6">
        {/* Cabecera: ID, Nombre, Categoría y Badges de Tipo */}
        <PokemonHeader
          idFormatted={pokemon.formattedId}
          name={pokemon.name}
          category={pokemon.category}
          types={pokemon.types}
        />

        {/* Bloque Superior: Imagen Grande del Pokémon (según Wireframe) */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-10 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
          <PokemonImage
            id={pokemon.id}
            src={pokemon.image}
            fallbackSrc={pokemon.fallbackImage}
            alt={pokemon.name}
            className="w-52 h-52 sm:w-64 sm:h-64"
          />
        </div>

        {/* Bloque de Información: Descripción Relevante (según Wireframe) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
            Descripción Relevante
          </span>
          <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 italic">
            "{pokemon.description}"
          </p>
        </div>

        {/* Dimensiones y Habilidades */}
        <PokemonInfoGrid
          height={pokemon.heightFormatted}
          weight={pokemon.weightFormatted}
          abilities={pokemon.abilities}
        />

        {/* Estadísticas Base */}
        <PokemonStatsCard
          stats={pokemon.stats}
          totalStats={pokemon.totalStats}
        />

        {/* Botón de Regresar Centrado (según Wireframe) */}
        <div className="flex justify-center pt-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleBack}
            className="px-8 font-bold"
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            }
          >
            Regresar
          </Button>
        </div>
      </Card>
    </div>
  );
};
