import React, { useEffect, type ReactNode } from "react";
import { Header } from "./Header/Header";
import { useThemeStore } from "../../store/useThemeStore";
import { SearchModal } from "../../features/search/components/SearchModal";
import { LastVisitedToast } from "../../features/last-visited/components/LastVisitedToast";
import { usePokemonSearch } from "../../features/search/hooks/usePokemonSearch";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const initTheme = useThemeStore((s) => s.initTheme);

  const { openModal } = usePokemonSearch();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      <Header onOpenSearch={openModal} />

      <main className="flex-1">{children}</main>

      {/* Global Fullscreen Search Modal */}
      <SearchModal />

      {/* Toast on reload for last visited Pokémon */}
      <LastVisitedToast />
    </div>
  );
};
