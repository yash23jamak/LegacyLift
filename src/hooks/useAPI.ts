import { useCallback, useState } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIInterceptor } from '@/lib/axiosInterceptor';

// Define a simple stateful hook for API requests
export function useApi<T = any, R = AxiosResponse<T>>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // apiCall: returns a function for making an API call
  const apiCall = useCallback(
    async (config: AxiosRequestConfig): Promise<R | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await APIInterceptor.request<T, R>(config);
        console.log('response: ', response);
        return response;
      } catch (err) {
        setError(err as Error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { apiCall, loading, error };
}
