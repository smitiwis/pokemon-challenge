import { useState, useEffect } from "react";
import { PokemonDetailView } from "./feature/detail/PokemonDetailView";

export interface DetailAppProps {
  pokemonId: string | number;
}

export default function App({ pokemonId: propPokemonId }: DetailAppProps) {
  const [standaloneId, setStandaloneId] = useState(propPokemonId);

  const activeId = propPokemonId ? String(propPokemonId) : standaloneId;

  useEffect(() => {
    if (propPokemonId) {
      setStandaloneId(propPokemonId);
    }
  }, [propPokemonId]);

  return (
    <div className="w-full min-h-full py-2 px-2 sm:px-4 flex flex-col items-center">
      <PokemonDetailView pokemonId={activeId} />
    </div>
  );
}
