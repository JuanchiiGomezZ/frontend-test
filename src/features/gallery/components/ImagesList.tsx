import { HtmlHTMLAttributes } from 'react';
import { Image } from '../../../types/api';
import { ImageCard } from './index';
import { ApolloError } from '@apollo/client';
import { ListEmpty, ListError, ListFooter } from './list';
import { useLikeImage } from '../hooks/useLikeImage';
import InfiniteScrollList from '../../../components/common/InfiniteScrollList';

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
  const { likeImage } = useLikeImage();

  return (
    <div>
      <InfiniteScrollList
        data={items}
        renderItem={(item) => (
          <ImageCard key={item.id} {...item} onLike={likeImage} />
        )}
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
          <ListFooter
            isLoading={isLoading}
            hasMore={hasMore}
            hasResults={items.length > 0}
          />
        }
      />
    </div>
  );
};

ImagesList.displayName = 'ImagesList';
