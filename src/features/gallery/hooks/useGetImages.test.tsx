import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { describe, it, expect, vi } from 'vitest';
import { GET_IMAGES } from '../../../graphql/queries';
import { useGetImages } from './useGetImages';

// Mock del hook useQueryParams
vi.mock('../../../hooks/useQueryParams', () => ({
  useQueryParams: () => ({
    getParam: () => null,
  }),
}));

describe('useGetImages', () => {
  const mockImages = {
    nodes: [
      { id: '1', title: 'Image 1' },
      { id: '2', title: 'Image 2' },
    ],
    pageInfo: {
      hasNextPage: true,
      endCursor: 'cursor123',
    },
  };

  const successMock = {
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
        images: mockImages,
      },
    },
  };

  it('should fetch and return images correctly', async () => {
    const { result } = renderHook(() => useGetImages(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={[successMock]} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    // Estado inicial
    expect(result.current.isLoading).toBe(true);
    expect(result.current.items).toEqual([]);

    // Esperar a que se complete la carga
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verificar el resultado
    expect(result.current.items).toEqual(mockImages.nodes);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.totalImages).toBe(2);
  });
});
