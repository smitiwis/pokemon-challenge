import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, Credentials } from "../types";
import { POKEMON_CONFIG } from "../../../config/pokemon.config";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: ({ username, password }: Credentials) => {
        if (!username || !password) return;
        set({ user: { username }, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: POKEMON_CONFIG.STORAGE_KEYS.AUTH },
  ),
);
