import { HistoryView } from "./feature/history/HistoryView";

export interface HistoryAppProps {
  onSelectPokemon?: (id: number | string) => void;
}

export default function App({ onSelectPokemon }: HistoryAppProps) {
  return (
    <div className="w-full min-h-full py-2 flex flex-col items-center">
      <HistoryView onSelectPokemon={onSelectPokemon} />
    </div>
  );
}
