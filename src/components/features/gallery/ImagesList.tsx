import { HtmlHTMLAttributes } from 'react';
import { Image } from '../../../types/api';
import { ImageCard } from './index';
import InfiniteList from '../../common/InfiniteList';
import { ApolloError } from '@apollo/client';
import { ListEmpty, ListError, ListFooter } from './list';

interface ImagesListProps extends HtmlHTMLAttributes<HTMLDListElement> {
  items: Image[];
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  error?: ApolloError | null;
}

export const ImagesList = ({
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
          <ListError error={error} onRetry={onRetry} />
        )}
        ListEmptyComponent={<ListEmpty message="No se encontraron imágenes" />}
        ListFooterComponent={
          <ListFooter isLoading={isLoading} hasMore={hasMore} />
        }
      />
    </div>
  );
};

ImagesList.displayName = 'ImagesList';
