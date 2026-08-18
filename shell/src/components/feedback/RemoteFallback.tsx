import React from "react";

interface RemoteFallbackProps {
  remoteName: string;
  expectedPort: number;
}

export const RemoteFallback: React.FC<RemoteFallbackProps> = ({
  remoteName,
  expectedPort,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 my-8 max-w-md mx-auto bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-3xl text-center shadow-lg">
      <div className="w-16 h-16 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center text-2xl mb-4">
        🔌
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        Microfrontend No Disponible
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
        No se pudo conectar con el microfrontend{" "}
        <span className="font-semibold text-red-500">{remoteName}</span>.
      </p>
      <div className="bg-slate-200/80 dark:bg-slate-900/80 rounded-xl px-4 py-2 text-xs font-mono text-slate-700 dark:text-slate-400 mb-6">
        Verifica que esté corriendo en:{" "}
        <span className="text-blue-500 font-bold">
          http://localhost:{expectedPort}
        </span>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2.5 bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-red-500/20 transition-all hover:scale-105 active:scale-95"
      >
        Reintentar Conexión
      </button>
    </div>
  );
};
