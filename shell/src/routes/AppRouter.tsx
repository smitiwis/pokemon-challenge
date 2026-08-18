import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../config/routes";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path={ROUTES.LOGIN} element={<div>Page Login</div>} />

      {/* Protected Routes inside MainLayout */}
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <MainLayout>
              <div>Page Home</div>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.POKEMON_DETAIL}
        element={
          <ProtectedRoute>
            <MainLayout>
              <div>Page Detail</div>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.HISTORY}
        element={
          <ProtectedRoute>
            <MainLayout>
              <div>Page History</div>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};
