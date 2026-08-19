import React, { useState, useEffect } from "react";
import { getPokemonArtworkUrl } from "../../utils/pokemonHelpers";

interface PokemonImageProps {
  id: number | string;
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

export const PokemonImage: React.FC<PokemonImageProps> = ({
  id,
  src,
  fallbackSrc,
  alt,
  className = "",
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc || getPokemonArtworkUrl(id));
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Halo de luz de fondo con efecto glow */}
      <div className="absolute inset-0 bg-radial from-slate-200/50 to-transparent dark:from-slate-700/40 rounded-full blur-2xl pointer-events-none transform scale-90" />

      <img
        src={imgSrc}
        alt={alt}
        onError={handleImageError}
        className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-300 relative z-10"
        loading="eager"
      />
    </div>
  );
};
