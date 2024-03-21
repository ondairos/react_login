export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
  email: string | null;
  password: string | null;
}
