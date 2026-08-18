import React, { Suspense } from "react";
import { ErrorBoundary } from "../../../components/feedback/ErrorBoundary";
import { RemoteFallback } from "../../../components/feedback/RemoteFallback";
import { DetailSkeleton } from "../../../components/feedback/Skeletons";

const RemoteHistoryApp = React.lazy(() => import("mfHistory/HistoryApp"));

export const RemoteHistoryLoader: React.FC = () => {
  return (
    <ErrorBoundary
      moduleName="Microfrontend de Historial"
      fallback={<RemoteFallback remoteName="mfHistory (Historial)" expectedPort={3002} />}
    >
      <Suspense fallback={<DetailSkeleton />}>
        <RemoteHistoryApp />
      </Suspense>
    </ErrorBoundary>
  );
};
