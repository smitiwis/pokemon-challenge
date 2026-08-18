import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody } from "./Card";
import { Badge } from "./Badge";
import {
  formatPokemonId,
  capitalize,
  getPokemonArtworkUrl,
} from "../../utils/pokemonHelpers";
import { buildPokemonDetailRoute } from "../../config/routes";

export interface PokemonCardProps {
  id: number | string;
  name: string;
  image: string;
  types?: string[];
  onClick?: () => void;
}

export const PokemonCard: FC<PokemonCardProps> = ({
  id,
  name,
  image,
  types = [],
  onClick,
}) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(image);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(getPokemonArtworkUrl(id));
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(buildPokemonDetailRoute(id));
    }
  };

  const primaryType = types[0]?.toLowerCase();

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      className="group flex flex-col justify-between overflow-hidden relative"
    >
      <CardHeader className="mb-1">
        <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
          {formatPokemonId(id)}
        </span>
        {primaryType && (
          <Badge typeVariant={primaryType} size="sm">
            {primaryType}
          </Badge>
        )}
      </CardHeader>

      <CardBody className="my-2">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          <img
            src={imgSrc}
            alt={name}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="mt-3 text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors truncate max-w-full text-center">
          {capitalize(name)}
        </h3>
      </CardBody>
    </Card>
  );
};
