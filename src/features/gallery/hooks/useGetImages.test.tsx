import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET_IMAGES } from '../../../graphql/queries';
import { useGetImages } from './useGetImages';

describe('useGetImages', () => {
  // Separar los mocks en una sección clara
  const mockData = {
    nodes: [
      { id: '1', title: 'Image 1' },
      { id: '2', title: 'Image 2' },
    ],
    pageInfo: {
      hasNextPage: true,
      endCursor: 'cursor123',
    },
  };

  const mocks = [
    {
      request: {
        query: GET_IMAGES,
        variables: {
          first: 24,
          after: null,
          title: undefined,
        },
      },
      result: {
        data: {
          images: mockData,
        },
      },
    },
  ];

  // Configuración común para todos los tests
  const renderImageHook = () => {
    return renderHook(() => useGetImages(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });
  };

  beforeEach(() => {
    vi.mock('../../../hooks/useQueryParams', () => ({
      useQueryParams: () => ({
        getParam: () => null,
      }),
    }));
  });

  it('should handle the loading state correctly', () => {
    const { result } = renderImageHook();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBeUndefined();
  });

  it('should handle successful data fetching', async () => {
    const { result } = renderImageHook();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.items).toEqual(mockData.nodes);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.totalImages).toBe(2);
  });

  it('should handle load more functionality', async () => {
    const { result } = renderImageHook();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.onLoadMore).toBeInstanceOf(Function);
  });
});
