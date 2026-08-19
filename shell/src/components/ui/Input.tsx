import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, leftIcon, rightIcon, className = "", id, ...props },
    ref,
  ) => {
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full h-10 py-2 px-3 rounded-lg border text-sm outline-none transition-colors bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs ${
              leftIcon ? "pl-9!" : ""
            } ${rightIcon ? "pr-9!" : ""} ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                : "border-slate-300 dark:border-slate-700 focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900/10 dark:focus:ring-white/10"
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 flex items-center">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
