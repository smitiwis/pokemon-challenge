import React, { useState } from "react";
import type { HistoryItem } from "../../types/history";
import {
  capitalize,
  formatPokemonId,
  formatLastVisitedDate,
  getPokemonArtworkUrl,
} from "../../utils/formatters";

interface HistoryItemCardProps {
  item: HistoryItem;
  onClick?: (id: number | string) => void;
}

export const HistoryItemCard: React.FC<HistoryItemCardProps> = ({
  item,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(item.image);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(getPokemonArtworkUrl(item.id));
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(item.id);
    } else {
      window.location.href = `/pokemon/${item.id}`;
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 hover:border-red-400 dark:hover:border-red-500/60 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-4 sm:gap-5 min-w-0">
        {/* Recuadro de la Imagen (según Wireframe) */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <img
            src={imgSrc}
            alt={item.name}
            onError={handleImageError}
            className="w-full h-full object-contain filter drop-shadow-sm"
            loading="lazy"
          />
        </div>

        {/* Información del Pokémon */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
              {formatPokemonId(item.id)}
            </span>
            {item.lastVisited && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline">
                • {formatLastVisitedDate(item.lastVisited)}
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors truncate capitalize mt-0.5">
            {capitalize(item.name)}
          </h3>
        </div>
      </div>

      {/* Contador de Visitas */}
      <div className="flex items-center gap-3 shrink-0 ml-2">
        <div className="flex flex-col items-end">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40 font-mono">
            <span>👁️</span>
            <span>{item.visits} {item.visits === 1 ? "visita" : "visitas"}</span>
          </span>
        </div>

        {/* Flecha indicadora */}
        <span className="text-slate-300 dark:text-slate-600 group-hover:text-red-500 dark:group-hover:text-red-400 group-hover:translate-x-0.5 transition-all text-sm font-bold hidden sm:inline">
          →
        </span>
      </div>
    </div>
  );
};
