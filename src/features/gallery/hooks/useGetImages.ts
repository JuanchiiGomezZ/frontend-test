// hooks/useImagesQuery.ts
import { useQuery, NetworkStatus } from '@apollo/client';
import { GET_IMAGES } from '../../../graphql/queries';
import type { ImagesQueryResponse } from '../../../types/api';
import { useCallback, useEffect, useMemo } from 'react';
import { useQueryParams } from '../../../hooks/useQueryParams';

const ITEMS_PER_PAGE = 24;
export const useGetImages = () => {
  const { getParam } = useQueryParams();
  const searchTerm = getParam('q');
  const { loading, error, data, fetchMore, networkStatus, refetch } =
    useQuery<ImagesQueryResponse>(GET_IMAGES, {
      variables: {
        first: ITEMS_PER_PAGE,
        after: null,
        title: searchTerm || undefined,
      },
      notifyOnNetworkStatusChange: true,
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    });

  useEffect(() => {
    refetch({
      first: ITEMS_PER_PAGE,
      after: null,
      title: searchTerm || undefined,
    });
  }, [searchTerm, refetch]);

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
          title: searchTerm || undefined,
        },
      });
    }
  }, [data?.images.pageInfo, fetchMore, searchTerm]);

  return {
    items,
    isLoading,
    error,
    hasMore,
    onLoadMore: handleLoadMore,
    totalImages,
  };
};
