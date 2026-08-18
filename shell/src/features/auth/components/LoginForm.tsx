import { useState, type FormEvent, type FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ROUTES } from "../../../config/routes";
import { Input, Button } from "../../../components/ui";

export const LoginForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    ROUTES.HOME;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const clean = username.trim();
    if (!clean) {
      setError("Por favor ingresa un usuario.");
      return;
    }
    if (clean.length < 3) {
      setError("El usuario debe tener al menos 3 caracteres.");
      return;
    }

    login(clean);
    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl">
          {error}
        </div>
      )}

      <Input
        label="Usuario"
        placeholder="Usuario"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          if (error) setError(null);
        }}
        autoFocus
      />

      <Input
        label="Contraseña"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full mt-2"
      >
        Ingresar
      </Button>
    </form>
  );
};
