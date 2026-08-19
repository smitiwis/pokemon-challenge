import { useState, useEffect } from "react";
import { PokemonDetailView } from "./feature/detail/PokemonDetailView";

export interface DetailAppProps {
  pokemonId?: string | number;
  onBack?: () => void;
}

export default function App({
  pokemonId: propPokemonId,
  onBack,
}: DetailAppProps) {
  const [standaloneId, setStandaloneId] = useState<string>(() => {
    if (propPokemonId) return String(propPokemonId);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const queryId = urlParams.get("id");
      if (queryId) return queryId;

      const match = window.location.pathname.match(/\/pokemon\/([^/]+)/);
      if (match && match[1]) return match[1];
    }
    return "1";
  });

  const activeId = propPokemonId ? String(propPokemonId) : standaloneId;

  useEffect(() => {
    if (propPokemonId) {
      setStandaloneId(String(propPokemonId));
    }
  }, [propPokemonId]);

  return (
    <div className="w-full min-h-full py-2 px-2 sm:px-4 flex flex-col items-center">
      <PokemonDetailView pokemonId={activeId} onBack={onBack} />
    </div>
  );
}
