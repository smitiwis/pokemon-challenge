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
          ? "hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-1 cursor-pointer"
          : "shadow-xs"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`mb-3 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`my-2 flex flex-col items-center ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);
