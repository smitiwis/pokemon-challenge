import { type FC } from "react";
import { usePokemonCatalog } from "../hooks/usePokemonCatalog";
import { CategorySection } from "../components/CategorySection";
import { useSearchStore } from "../../search/store/useSearchStore";
import { Input } from "../../../components/ui";

export const HomePage: FC = () => {
  const { categories } = usePokemonCatalog();
  const openSearch = useSearchStore((s) => s.openModal);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Search Input Trigger (Mockup 2) */}
      <div className="max-w-md">
        <div onClick={openSearch} className="cursor-pointer">
          <Input
            placeholder="Buscar un Pokémon..."
            readOnly
            className="cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 transition-colors shadow-xs"
            leftIcon={<span className="text-sm">🔍</span>}
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-10">
        {categories.map((cat) => (
          <CategorySection key={cat.categoryId} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
