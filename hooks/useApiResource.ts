import React from 'react';

interface UseApiResourceOptions<T> {
  initialData?: T | null;
  load: (signal: AbortSignal) => Promise<T>;
}

export function useApiResource<T>({ initialData = null, load }: UseApiResourceOptions<T>) {
  const [data, setData] = React.useState<T | null>(initialData);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const next = await load(controller.signal);
        if (!controller.signal.aborted) {
          setData(next);
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError' && !controller.signal.aborted) {
          setLoadError(error instanceof Error ? error.message : 'Unable to load resource.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    run();

    return () => controller.abort();
  }, [load]);

  return {
    data,
    isLoading,
    loadError,
    setData,
  };
}
