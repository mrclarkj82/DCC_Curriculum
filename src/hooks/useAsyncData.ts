import { useEffect, useState } from 'react';
import { firestoreErrorMessage } from '../services/firestoreService';

interface AsyncDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useAsyncData<T>(
  load: () => Promise<T>,
  dependencies: unknown[],
  fallbackError: string,
): AsyncDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let didCancel = false;

    setIsLoading(true);
    setError(null);

    load()
      .then((nextData) => {
        if (!didCancel) {
          setData(nextData);
          setIsLoading(false);
        }
      })
      .catch((loadError: unknown) => {
        if (!didCancel) {
          setData(null);
          setError(firestoreErrorMessage(loadError, fallbackError));
          setIsLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, dependencies);

  return { data, isLoading, error };
}
