import { useMutation } from '@apollo/client';
import { LikeImageResponse } from '../../../types/api';
import { LIKE_IMAGE } from '../../../graphql/queries';
import useDebounce from '../../../hooks/useDebounce';

export const useLikeImage = () => {
  const [likeImage, { loading }] = useMutation<LikeImageResponse>(LIKE_IMAGE);

  const handleLike = useDebounce(async (imageId: string) => {
    try {
      const { data } = await likeImage({
        variables: {
          input: { imageId },
        },
      });

      return data?.data.likeImage.image;
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  }, 300);

  return {
    likeImage: handleLike,
    loading,
  };
};
