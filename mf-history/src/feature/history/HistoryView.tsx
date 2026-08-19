import React from "react";
import { useNavigate } from "react-router-dom";
import { useVisitHistory } from "../../hooks/useVisitHistory";
import { HistoryItemCard } from "../../components/ui/HistoryItemCard";
import { HistoryEmptyState } from "../../components/feedback/HistoryEmptyState";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export interface HistoryViewProps {
  onSelectPokemon?: (id: number | string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  onSelectPokemon,
}) => {
  const navigate = useNavigate();
  const { history, clearHistory } = useVisitHistory();

  const onBack = () => {
    navigate("/");
  };

  const handleSelect = (id: number | string) => {
    if (onSelectPokemon) {
      onSelectPokemon(id);
    } else {
      navigate(`/pokemon/${id}`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-2">
      <Card className="p-6 sm:p-8 space-y-6">
        {/* Título: Vistos recientemente (según Wireframe) */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/80 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
              Vistos recientemente
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Registro cronológico de Pokémon consultados y conteo de visitas
            </p>
          </div>

          {history.length > 0 && (
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
              {history.length} {history.length === 1 ? "Pokémon" : "Pokémon"}
            </span>
          )}
        </div>

        {/* Lista de Elementos del Historial (según Wireframe) */}
        {history.length === 0 ? (
          <HistoryEmptyState />
        ) : (
          <div className="space-y-3 max-h-130 overflow-y-auto pr-1 py-1">
            {history.map((item) => (
              <HistoryItemCard
                key={`${item.id}-${item.name}`}
                item={item}
                onClick={handleSelect}
              />
            ))}
          </div>
        )}

        {/* Barra de Acciones Inferior: Regresar y Limpiar Historial (según Wireframe) */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
          <Button
            variant="secondary"
            size="md"
            onClick={onBack}
            className="w-full sm:w-auto px-6 font-semibold"
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

          {history.length > 0 && (
            <Button
              variant="dark"
              size="md"
              onClick={clearHistory}
              className="w-full sm:w-auto px-6"
              leftIcon={<span>🗑️</span>}
            >
              Limpiar historial
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
