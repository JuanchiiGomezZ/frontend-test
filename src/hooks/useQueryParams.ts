// src/hooks/useQueryParams.ts
import { useState, useCallback } from 'react';

type QueryParams = {
  [key: string]: string;
};

export const useQueryParams = () => {
  // Get initial params from URL
  const getParams = useCallback((): QueryParams => {
    const params = new URLSearchParams(window.location.search);
    const queryParams: QueryParams = {};

    params.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }, []);

  const [params, setParams] = useState<QueryParams>(getParams);

  const updateParams = useCallback(
    (updates: QueryParams) => {
      const currentParams = new URLSearchParams(window.location.search);

      // Update or remove params
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          currentParams.delete(key);
        } else {
          currentParams.set(key, value);
        }
      });

      // Update URL
      const newUrl = `${window.location.pathname}${currentParams.toString() ? `?${currentParams.toString()}` : ''}`;
      window.history.pushState({}, '', newUrl);

      // Update state
      setParams(getParams());
    },
    [getParams]
  );

  // Get a single param value
  const getParam = useCallback(
    (key: string): string => {
      return params[key] || '';
    },
    [params]
  );

  return {
    params,
    getParam,
    updateParams,
  };
};
