import { useMutation } from '@apollo/client';
import { LikeImageResponse } from '../types/api';
import { LIKE_IMAGE } from '../graphql/queries';

export const useLikeImage = () => {
  const [likeImage, { loading }] = useMutation<LikeImageResponse>(LIKE_IMAGE);

  const handleLike = async (imageId: string) => {
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
  };

  return {
    likeImage: handleLike,
    loading,
  };
};
