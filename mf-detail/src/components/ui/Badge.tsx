import { type FC, type HTMLAttributes } from "react";
import { POKEMON_TYPE_COLORS } from "../../utils/pokemonHelpers";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  typeVariant?: string;
  size?: "sm" | "md" | "lg";
}

export const Badge: FC<BadgeProps> = ({
  children,
  typeVariant,
  size = "sm",
  className = "",
  ...props
}) => {
  const typeKey = typeVariant?.toLowerCase() || "";
  const colorStyle = POKEMON_TYPE_COLORS[typeKey];

  const sizeClass =
    size === "sm"
      ? "text-[10px] px-2 py-0.5"
      : size === "md"
        ? "text-xs px-2.5 py-1"
        : "text-sm px-3 py-1.5";

  const colorClass = colorStyle
    ? `${colorStyle.bg} ${colorStyle.text} ${colorStyle.border} border`
    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700";

  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-wider rounded-md font-mono ${sizeClass} ${colorClass} ${className}`}
      {...props}
    >
      {children || typeVariant}
    </span>
  );
};
