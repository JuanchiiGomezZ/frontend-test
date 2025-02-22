// hooks/useImagesQuery.ts
import { useQuery, NetworkStatus } from '@apollo/client';
import { GET_IMAGES } from '../graphql/queries';
import type { ImagesQueryResponse } from '../types/api';
import { useCallback, useMemo } from 'react';

const ITEMS_PER_PAGE = 24;
export const useGetImages = () => {
  const { loading, error, data, fetchMore, networkStatus } =
    useQuery<ImagesQueryResponse>(GET_IMAGES, {
      variables: {
        first: ITEMS_PER_PAGE,
        after: null,
      },
      notifyOnNetworkStatusChange: true,
    });

  const isLoading = useMemo(() => {
    const isFetchingMore = networkStatus === NetworkStatus.fetchMore;
    return loading || isFetchingMore;
  }, [loading, networkStatus]);

  const hasMore = useMemo(() => {
    return !!data?.images.pageInfo?.hasNextPage;
  }, [data?.images.pageInfo?.hasNextPage]);

  const items = useMemo(() => {
    return data?.images.nodes || [];
  }, [data?.images.nodes]);

  const totalImages = useMemo(() => {
    return data?.images.nodes.length || 0;
  }, [data?.images.nodes]);

  const handleLoadMore = useCallback(() => {
    if (data?.images.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          first: ITEMS_PER_PAGE,
          after: data.images.pageInfo.endCursor,
        },
      });
    }
  }, [data?.images.pageInfo, fetchMore]);

  return {
    items,
    isLoading,
    error,
    hasMore,
    onLoadMore: handleLoadMore,
    totalImages,
  };
};
