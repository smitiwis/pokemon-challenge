import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { ProtectedAuthRoute } from "../features/auth/components/ProtectedAuthRoute";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { HomePage } from "../features/catalog/pages/HomePage";
import { DetailPage } from "../features/remotes/pages/DetailPage";
import { HistoryPage } from "../features/remotes/pages/HistoryPage";
import { MainLayout } from "../components/layouts/MainLayout";
import { ROUTES } from "../config/routes";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Route: Redirige al Home si ya está autenticado */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <ProtectedAuthRoute>
            <LoginPage />
          </ProtectedAuthRoute>
        }
      />

      {/* Protected Routes inside MainLayout */}
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.POKEMON_DETAIL}
        element={
          <ProtectedRoute>
            <MainLayout>
              <DetailPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.HISTORY}
        element={
          <ProtectedRoute>
            <MainLayout>
              <HistoryPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};
