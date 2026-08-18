import React, { useEffect, type ReactNode } from "react";
import { Header } from "./Header/Header";
import { useThemeStore } from "../../store/useThemeStore";
import { usePokemonSearch } from "../../features/search/hooks/usePokemonSearch";
import { SearchModal } from "../../features/search/components/SearchModal";
import { LastVisitedToast } from "../../features/last-visited/components/LastVisitedToast";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const initTheme = useThemeStore((s) => s.initTheme);
  const search = usePokemonSearch();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      <Header onOpenSearch={search.openModal} />

      <main className="flex-1">{children}</main>

      {/* Global Fullscreen Search Modal */}
      <SearchModal
        isOpen={search.isOpen}
        onClose={search.closeModal}
        query={search.query}
        onQueryChange={search.setQuery}
        pokemons={search.pokemons}
        exactMatch={search.exactMatch}
        notFound={search.notFound}
        isLoading={search.isLoading}
        isLoadingMore={search.isLoadingMore}
        hasMore={search.hasMore}
        onLoadMore={search.loadMore}
      />

      {/* Toast on reload for last visited Pokémon */}
      <LastVisitedToast />
    </div>
  );
};
