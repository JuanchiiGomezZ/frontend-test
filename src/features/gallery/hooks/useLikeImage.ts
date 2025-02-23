import { ApolloError, useMutation } from '@apollo/client';
import { LikeImageResponse } from '../../../types/api';
import { LIKE_IMAGE } from '../../../graphql/queries';
import useDebounce from '../../../hooks/useDebounce';

interface LikeImageHook {
  likeImage: (imageId: string) => Promise<LikeImageResponse | undefined>;
  loading: boolean;
}

export const useLikeImage = (): LikeImageHook => {
  const [likeImage, { loading }] = useMutation<LikeImageResponse>(LIKE_IMAGE);

  const handleLike = useDebounce(
    async (imageId: string): Promise<LikeImageResponse | undefined> => {
      try {
        const { data } = await likeImage({
          variables: {
            input: { imageId },
          },
        });

        return data as LikeImageResponse;
      } catch (error: unknown) {
        if (error instanceof ApolloError) {
          throw new Error(error.message);
        }
        throw error;
      }
    },
    300
  );

  return {
    likeImage: handleLike,
    loading,
  };
};
