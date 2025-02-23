import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { describe, it, expect, vi } from 'vitest';
import { LIKE_IMAGE } from '../../../graphql/queries';
import { useLikeImage } from './useLikeImage';

// Mock del hook useDebounce
vi.mock('../../../hooks/useDebounce', () => ({
  default: (fn: any) => fn,
}));

describe('useLikeImage', () => {
  const mockImageId = 'test-image-id';

  const successMock = {
    request: {
      query: LIKE_IMAGE,
      variables: {
        input: { imageId: mockImageId },
      },
    },
    result: {
      data: {
        likeImage: {
          clientMutationId: '123',
          image: {
            id: mockImageId,
            liked: true,
            likesCount: 1,
            __typename: 'Image',
          },
          __typename: 'LikeImagePayload',
        },
      },
    },
  };

  const errorMock = {
    request: {
      query: LIKE_IMAGE,
      variables: {
        input: { imageId: mockImageId },
      },
    },
    error: new Error('Failed to like image'),
  };

  it('should like an image successfully', async () => {
    const { result } = renderHook(() => useLikeImage(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={[successMock]} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    // Iniciar la mutación
    const promise = result.current.likeImage(mockImageId);

    // Esperar a que la mutación se complete
    const response = await promise;

    // Verificar la respuesta
    expect(response).toEqual({
      likeImage: {
        clientMutationId: '123',
        image: {
          id: mockImageId,
          liked: true,
          likesCount: 1,
          __typename: 'Image',
        },
        __typename: 'LikeImagePayload',
      },
    });

    // Verificar que el loading vuelva a false
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should handle errors when liking an image fails', async () => {
    const { result } = renderHook(() => useLikeImage(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={[errorMock]} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await expect(async () => {
      await result.current.likeImage(mockImageId);
    }).rejects.toThrow('Failed to like image');

    // Verificar que el loading vuelva a false después del error
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
