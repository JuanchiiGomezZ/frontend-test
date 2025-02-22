import { useEffect, useMemo, useRef } from 'react';

// Usamos ReturnType<typeof setTimeout> en lugar de NodeJS.Timeout
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  timeout: number
) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

export const useDebounce = <T extends () => void>(
  callback: T,
  timeout: number = 1000
) => {
  const ref = useRef<T>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, timeout);
  }, [timeout]);
};

export default useDebounce;
