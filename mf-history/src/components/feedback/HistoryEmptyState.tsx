import { type FC } from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

interface HistoryEmptyStateProps {}

export const HistoryEmptyState: FC<HistoryEmptyStateProps> = () => {
  const navigate = useNavigate();

  const onExplore = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center my-6 rounded-3xl bg-slate-50/60 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-700/80">
      <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl mb-4 shadow-inner">
        📜
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
        Sin historial de visitas
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        Aún no has explorado ningún Pokémon. Los Pokémon que visites en el
        inicio o buscador aparecerán listados aquí.
      </p>

      <Button variant="primary" onClick={onExplore} className="px-6 font-bold">
        Explorar Pokémon
      </Button>
    </div>
  );
};
