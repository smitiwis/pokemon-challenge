import { STORAGE_KEYS } from "../config/constants";
import type { HistoryItem, LastVisitedPokemon } from "../types/history";

/**
 * Estrategia de Persistencia de Historial:
 * 1. Guarda cada Pokémon visitado en localStorage bajo 'pokemon-visit-history'.
 * 2. Si ya existe en la lista, incrementa su contador 'visits' y actualiza su fecha 'lastVisited',
 *    moviéndolo a la primera posición (orden cronológico inverso).
 * 3. Evita duplicados identificando por ID o por nombre normalizado.
 * 4. Actualiza 'last-visited-pokemon' con el último Pokémon visto para el Toast del Shell.
 * 5. Remueve 'toast-dismissed' de sessionStorage para que, al existir una nueva visita,
 *    el Toast vuelva a activarse en la próxima recarga como exige el requisito 9.
 */

export const getVisitHistory = (): HistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VISIT_HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error leyendo historial de visitas:", error);
    return [];
  }
};

export const recordPokemonVisit = (pokemon: {
  id: number | string;
  name: string;
  image: string;
}): HistoryItem[] => {
  try {
    const history = getVisitHistory();
    const cleanName = pokemon.name.toLowerCase().trim();
    const nowIso = new Date().toISOString();

    const existingIndex = history.findIndex(
      (item) =>
        String(item.id) === String(pokemon.id) ||
        item.name.toLowerCase().trim() === cleanName,
    );

    let updatedHistory: HistoryItem[];

    if (existingIndex !== -1) {
      const existing = history[existingIndex];
      const updatedItem: HistoryItem = {
        ...existing,
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image || existing.image,
        visits: (existing.visits || 0) + 1,
        lastVisited: nowIso,
      };

      // Remover de su posición previa y colocarlo al inicio
      const rest = history.filter((_, idx) => idx !== existingIndex);
      updatedHistory = [updatedItem, ...rest];
    } else {
      const newItem: HistoryItem = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        visits: 1,
        lastVisited: nowIso,
      };
      updatedHistory = [newItem, ...history];
    }

    // 1. Guardar Historial Completo
    localStorage.setItem(
      STORAGE_KEYS.VISIT_HISTORY,
      JSON.stringify(updatedHistory),
    );

    // 2. Guardar Último Pokémon Visitado para el Toast del Shell
    const lastVisitedData: LastVisitedPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      visitedAt: nowIso,
    };
    localStorage.setItem(
      STORAGE_KEYS.LAST_VISITED,
      JSON.stringify(lastVisitedData),
    );

    // 3. Reactivar el Toast para la próxima recarga según el requerimiento 9
    sessionStorage.removeItem(STORAGE_KEYS.TOAST_DISMISSED);

    return updatedHistory;
  } catch (error) {
    console.error("Error guardando visita en historial:", error);
    return [];
  }
};
