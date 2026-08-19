import { useState, useEffect, useCallback } from "react";
import type { HistoryItem } from "../types/history";
import { STORAGE_KEYS } from "../types/history";

export const useVisitHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadHistory = useCallback(() => {
    try {
      setLoading(true);
      const raw = localStorage.getItem(STORAGE_KEYS.VISIT_HISTORY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
          return;
        }
      }
      setHistory([]);
    } catch (error) {
      console.error("Error cargando historial de visitas:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();

    // Sincronizar si cambia el storage en otra pestaña
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.VISIT_HISTORY) {
        loadHistory();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadHistory]);

  const clearHistory = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.VISIT_HISTORY);
      localStorage.removeItem(STORAGE_KEYS.LAST_VISITED);
      setHistory([]);
    } catch (error) {
      console.error("Error limpiando historial:", error);
    }
  }, []);

  return {
    history,
    loading,
    clearHistory,
    refreshHistory: loadHistory,
  };
};
