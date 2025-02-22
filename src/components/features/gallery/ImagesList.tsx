import { HtmlHTMLAttributes } from 'react';
import { Image } from '../../../types/api';
import { ImageCard } from './ImageCard';
import InfiniteList from '../../common/InfiniteList';
import { ApolloError } from '@apollo/client';
import { ImagesListSkeleton } from './ImageCardSkeleton';

interface ImagesListProps extends HtmlHTMLAttributes<HTMLDListElement> {
  items: Image[];
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  error?: ApolloError | null;
}

const ImagesList = ({
  items,
  isLoading,
  onLoadMore,
  hasMore,
  error,
}: ImagesListProps) => {
  return (
    <div>
      <InfiniteList
        data={items}
        renderItem={(item) => <ImageCard key={item.id} {...item} />}
        keyExtractor={(item) => item.id}
        onEndReached={onLoadMore}
        isLoading={isLoading}
        classNameItemsContainer="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center"
        error={error}
        onRetry={onLoadMore}
        ListErrorComponent={({ error, onRetry }) => (
          <div className="text-center p-4">
            <p className="text-red-500">
              ¡Ups! Algo salió mal: {error.message}
            </p>
            <button onClick={onRetry}>Intentar de nuevo</button>
          </div>
        )}
        ListEmptyComponent={
          <div className="text-center p-4">
            <p>
              No se encontraron imágenes. Intenta con otro término de búsqueda.
            </p>
          </div>
        }
        ListFooterComponent={
          !hasMore && !isLoading && !error ? (
            <div className="text-center p-4">
              <p>
                Eso es todo por ahora. Muchas gracias por visitar nuestra
                galería. ❤️
              </p>
            </div>
          ) : !error &&(
            <ImagesListSkeleton length={3} />
          )
        }
      />
    </div>
  );
};

export default ImagesList;
