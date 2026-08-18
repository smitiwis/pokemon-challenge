import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "../../../components/feedback/ErrorBoundary";
import { RemoteFallback } from "../../../components/feedback/RemoteFallback";
import { DetailSkeleton } from "../../../components/feedback/Skeletons";

const RemoteDetailApp = React.lazy(() => import("mfDetail/DetailApp"));

export const RemoteDetailLoader: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <ErrorBoundary
      moduleName="Microfrontend de Detalle"
      fallback={<RemoteFallback remoteName="mfDetail (Detalle)" expectedPort={3001} />}
    >
      <Suspense fallback={<DetailSkeleton />}>
        <RemoteDetailApp pokemonId={id} />
      </Suspense>
    </ErrorBoundary>
  );
};
