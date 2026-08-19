import { HistoryView } from "./feature/history/HistoryView";

export interface HistoryAppProps {
  onBack?: () => void;
  onSelectPokemon?: (id: number | string) => void;
}

export default function App({ onBack, onSelectPokemon }: HistoryAppProps) {
  return (
    <div className="w-full min-h-full py-2 px-2 sm:px-4 flex flex-col items-center">
      <HistoryView onBack={onBack} onSelectPokemon={onSelectPokemon} />
    </div>
  );
}
