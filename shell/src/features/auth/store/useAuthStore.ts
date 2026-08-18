import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "../types";
import { POKEMON_CONFIG } from "../../../config/pokemon.config";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (username: string) => {
        const cleanUsername = username.trim();
        if (!cleanUsername) return;
        set({ user: { username: cleanUsername }, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: POKEMON_CONFIG.STORAGE_KEYS.AUTH },
  ),
);
