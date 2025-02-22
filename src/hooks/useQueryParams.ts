// src/hooks/useQueryParams.ts
import { useState, useEffect, useCallback } from 'react';

const URL_CHANGE_EVENT = 'urlChange';

// Modificar pushState para emitir evento personalizado
const originalPushState = window.history.pushState;
window.history.pushState = function (...args) {
  originalPushState.apply(this, args);
  window.dispatchEvent(new Event(URL_CHANGE_EVENT));
};

export const useQueryParams = () => {
  const [params, setParams] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(searchParams.entries());
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const searchParams = new URLSearchParams(window.location.search);
      setParams(Object.fromEntries(searchParams.entries()));
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener(URL_CHANGE_EVENT, handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener(URL_CHANGE_EVENT, handleUrlChange);
    };
  }, []);

  const getParam = useCallback((key: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key) || '';
  }, []);

  const updateParams = useCallback((updates: Record<string, string>) => {
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });

    const newUrl = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    window.history.pushState({}, '', newUrl);
  }, []);

  return {
    params,
    getParam,
    updateParams,
  };
};
