import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useLastVisitedToast } from "../hooks/useLastVisitedToast";
import { capitalize, getPokemonImageUrl } from "../../../utils/pokemonHelpers";
import { buildPokemonDetailRoute } from "../../../config/routes";

export const LastVisitedToast: FC = () => {
  const { lastVisited, isVisible, dismissToast } = useLastVisitedToast();
  const navigate = useNavigate();

  if (!isVisible || !lastVisited) return null;

  const imageSrc = lastVisited.image || getPokemonImageUrl(lastVisited.id);

  const handleNavigate = () => {
    navigate(buildPokemonDetailRoute(lastVisited.id));
  };

  return (
    <aside
      role="status"
      aria-label="Último Pokémon visitado"
      className="fixed bottom-6 right-6 z-50 max-w-xs sm:max-w-sm w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-2xl shadow-slate-300/30 dark:shadow-black/60 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div
        onClick={handleNavigate}
        className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-1.5 border border-slate-200 dark:border-slate-700 shrink-0">
          <img
            src={imageSrc}
            alt={lastVisited.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
            Último visitado
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-500 transition-colors truncate">
            {capitalize(lastVisited.name)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={dismissToast}
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-sm font-bold"
          title="Cerrar notificación"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </aside>
  );
};
