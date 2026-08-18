export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  POKEMON_DETAIL: "/pokemon/:id",
  HISTORY: "/history",
} as const;

export const buildPokemonDetailRoute = (id: number | string) => `/pokemon/${id}`;
