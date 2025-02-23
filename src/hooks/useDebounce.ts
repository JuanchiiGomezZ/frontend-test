import { useEffect, useMemo, useRef } from 'react';

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  timeout: number
) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): ReturnType<T> => {
    clearTimeout(timer);
    return new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        try {
          // Ya que func puede devolver una Promise, usamos Promise.resolve
          // para manejar tanto valores síncronos como asíncronos
          Promise.resolve(func(...args))
            .then(resolve)
            .catch(reject);
        } catch (error) {
          reject(error);
        }
      }, timeout);
    }) as ReturnType<T>;
  };
};

export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  timeout: number = 1000
) => {
  const ref = useRef<T>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useMemo(() => {
    const func = (...args: Parameters<T>): ReturnType<T> => {
      return ref.current?.(...args);
    };

    return debounce(func, timeout);
  }, [timeout]);
};

export default useDebounce;
