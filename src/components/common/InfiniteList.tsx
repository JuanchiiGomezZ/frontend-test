import { useEffect, useRef, Fragment } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { ApolloError } from '@apollo/client';

interface InfiniteScrollListProps<T> {
  // Props existentes
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;

  // Props de componentes
  ListEmptyComponent?: React.ReactNode;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  ListLoaderComponent?: React.ReactNode;
  ItemSeparatorComponent?: React.ReactNode;

  // Nuevos props para manejo de errores
  error?: ApolloError | null;
  ListErrorComponent?:
    | React.ReactNode
    | (({
        error,
        onRetry,
      }: {
        error: Error;
        onRetry?: () => void;
      }) => React.ReactNode);
  onRetry?: () => void;

  // Props de configuración
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  className?: string;
  isLoading?: boolean;
  classNameItemsContainer?: string;
}

export default function InfiniteScrollList<T>({
  data,
  renderItem,
  keyExtractor,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  ListLoaderComponent,
  ItemSeparatorComponent,
  error,
  ListErrorComponent,
  onRetry,
  onEndReached,
  onEndReachedThreshold = 0.8,
  className = '',
  isLoading,
  classNameItemsContainer,
}: InfiniteScrollListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const onEndReachedCalledRef = useRef(false);

  const handleScroll = () => {
    if (!listRef.current || !onEndReached) return;

    try {
      const rect = listRef.current.getBoundingClientRect();
      const listBottom = rect.bottom;
      const windowHeight = window.innerHeight;
      const distanceFromBottom = listBottom - windowHeight;
      const threshold = windowHeight * (1 - onEndReachedThreshold);

      if (distanceFromBottom <= threshold && !onEndReachedCalledRef.current) {
        onEndReachedCalledRef.current = true;
        onEndReached();
      } else if (distanceFromBottom > threshold) {
        onEndReachedCalledRef.current = false;
      }
    } catch (err) {
      console.error('Error en el scroll handler:', err);
    }
  };

  const debouncedHandleScroll = useDebounce(handleScroll, 150);

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    window.addEventListener('resize', debouncedHandleScroll);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      window.removeEventListener('resize', debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  // Componente por defecto para errores
  const DefaultErrorComponent = ({
    error,
    onRetry,
  }: {
    error: Error;
    onRetry?: () => void;
  }) => (
    <div className="w-full p-4 text-center">
      <p className="text-red-600 mb-2">Error: {error.message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reintentar
        </button>
      )}
    </div>
  );

  // Manejo de estados
  if (error) {
    return (
      <div className={`w-full ${className}`}>
        {ListHeaderComponent}
        {typeof ListErrorComponent === 'function'
          ? ListErrorComponent({ error, onRetry })
          : ListErrorComponent || (
              <DefaultErrorComponent error={error} onRetry={onRetry} />
            )}
        {ListFooterComponent}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        {ListHeaderComponent}
        {ListLoaderComponent}
        {ListFooterComponent}
      </div>
    );
  }

  if (data.length === 0 && ListEmptyComponent) {
    return (
      <div className={`w-full ${className}`}>
        {ListHeaderComponent}
        {ListEmptyComponent}
        {ListFooterComponent}
      </div>
    );
  }

  return (
    <div ref={listRef} className={`w-full ${className}`}>
      {ListHeaderComponent}
      <div className={`w-full ${classNameItemsContainer}`}>
        {data.map((item, index) => (
          <Fragment key={keyExtractor(item, index)}>
            {index > 0 && ItemSeparatorComponent}
            {renderItem(item, index)}
          </Fragment>
        ))}
      </div>
      {ListFooterComponent}
    </div>
  );
}
