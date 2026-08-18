import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export interface CustomApiError {
  message: string;
  statusCode?: number;
  isNotFound: boolean;
  isNetworkError: boolean;
  rawError?: unknown;
}

export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ==========================================
// 🚀 REQUEST INTERCEPTORS
// ==========================================
pokeApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Normalizar URLs y paths si es necesario
    if (import.meta.env.DEV) {
      console.debug(`[PokeAPI Request] -> ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("[PokeAPI Request Error]:", error);
    return Promise.reject(error);
  },
);

// ==========================================
// 🛡️ RESPONSE INTERCEPTORS
// ==========================================
pokeApi.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.debug(`[PokeAPI Response] <- ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error: AxiosError): Promise<never> => {
    const isNetworkError = !error.response && Boolean(error.request);
    const statusCode = error.response?.status;
    const isNotFound = statusCode === 404;

    let friendlyMessage = "Ocurrió un error inesperado al consultar PokeAPI.";

    if (isNotFound) {
      friendlyMessage = "El recurso o Pokémon solicitado no fue encontrado.";
    } else if (isNetworkError) {
      friendlyMessage = "Error de conexión. Verifica tu conexión a internet.";
    } else if (error.code === "ECONNABORTED") {
      friendlyMessage = "La petición tardó demasiado tiempo en responder (Timeout).";
    } else if (statusCode && statusCode >= 500) {
      friendlyMessage = "El servidor de PokeAPI está experimentando problemas.";
    }

    const customError: CustomApiError = {
      message: friendlyMessage,
      statusCode,
      isNotFound,
      isNetworkError,
      rawError: error,
    };

    console.warn(`[PokeAPI Error ${statusCode || "Network"}]:`, customError.message);
    return Promise.reject(customError);
  },
);
