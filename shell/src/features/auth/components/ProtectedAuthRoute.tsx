import { type FC, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ROUTES } from "../../../config/routes";

interface ProtectedAuthRouteProps {
  children: ReactNode;
}

export const ProtectedAuthRoute: FC<ProtectedAuthRouteProps> = ({
  children,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
