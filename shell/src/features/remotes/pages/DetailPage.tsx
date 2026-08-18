import React from "react";
import { Link } from "react-router-dom";
import { RemoteDetailLoader } from "../components/RemoteDetailLoader";
import { ROUTES } from "../../../config/routes";

export const DetailPage: React.FC = () => {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
        >
          ← Volver a Categorías
        </Link>
      </div>

      <RemoteDetailLoader />
    </div>
  );
};

export default DetailPage;
