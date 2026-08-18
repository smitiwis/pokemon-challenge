import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { ROUTES } from "../../../config/routes";
import { UserDropdown } from "../../../features/auth/components/UserDropdown";

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: FC<HeaderProps> = () => {
  const location = useLocation();
  const isHistory = location.pathname === ROUTES.HISTORY;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to={ROUTES.HOME}
          className="font-black text-xl sm:text-2xl tracking-wider text-slate-900 dark:text-white uppercase hover:opacity-80 transition-opacity"
        >
          POKEDEX
        </Link>

        {/* Right Controls: Theme Toggle + Ver historial + User Dropdown */}
        <div className="flex items-center gap-3 sm:gap-5">
          <ThemeToggle />

          <Link
            to={ROUTES.HISTORY}
            className={`text-xs sm:text-sm font-semibold transition-colors ${
              isHistory
                ? "text-slate-900 dark:text-white underline underline-offset-4"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Ver historial
          </Link>

          <UserDropdown />
        </div>
      </div>
    </header>
  );
};
