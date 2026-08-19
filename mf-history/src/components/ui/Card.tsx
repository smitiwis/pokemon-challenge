import { type FC, type HTMLAttributes, type ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  children: ReactNode;
}

export const Card: FC<CardProps> = ({
  children,
  hoverable = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 transition-all duration-200 ${
        hoverable
          ? "hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5 cursor-pointer"
          : "shadow-xs"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
