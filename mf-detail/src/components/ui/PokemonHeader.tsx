import React from "react";
import { Badge } from "./Badge";
import { capitalize } from "../../utils/pokemonHelpers";

interface PokemonHeaderProps {
  idFormatted: string;
  name: string;
  category: string;
  types: string[];
}

export const PokemonHeader: React.FC<PokemonHeaderProps> = ({
  idFormatted,
  name,
  category,
  types,
}) => {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700/80 pb-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
            {idFormatted}
          </span>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            • {category}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 capitalize mt-0.5">
          {capitalize(name)}
        </h1>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {types.map((type) => (
          <Badge key={type} typeVariant={type} size="md" />
        ))}
      </div>
    </div>
  );
};
