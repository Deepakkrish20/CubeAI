import { Suspense } from 'react';
import AppRoutes from '@/routes';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import WakandaBackground from '@/components/common/WakandaBackground';

function App() {
  return (
    <ErrorBoundary>
      <WakandaBackground />
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <AppRoutes />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

