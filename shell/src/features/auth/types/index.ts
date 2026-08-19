export interface User {
  username: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => void;
  logout: () => void;
}
