import { useState, useEffect } from "react";

type UseFetchData<T> = {
  data: T | null;
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
};

const cache = new Map<string, any>();

export default function useFetch<T>(url: string): UseFetchData<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const hasData = cache.has(url);

    if (hasData) {
      setData(cache.get(url));
    }

    const fetchData = async (refetch: boolean = false) => {
      if (refetch) {
        setIsRefetching(true);
      } else {
        setIsLoading(true);
      }

      const res = await fetch(url, { signal: controller.signal });
      if (res.ok) {
        const data = await res.json();
        setData(data);
      } else {
        setError(new Error("Error fetching data", { cause: res.statusText }));
      }

      if (refetch) {
        setIsRefetching(false);
      } else {
        setIsLoading(false);
      }
    };

    const refetch = () => fetchData(true);

    window.addEventListener("focus", refetch);

    fetchData();
    return () => {
      controller.abort();
      setIsLoading(false);
      window.removeEventListener("focus", refetch);
    };
  }, [url]);

  return {
    data,
    isLoading,
    isRefetching,
    error,
  };
}
