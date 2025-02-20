export interface Image {
  id: string;
  title: string;
  author: string;
  price: number;
  liked: boolean;
  picture: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ImagesQueryResponse {
  images: {
    edges: {
      node: Image;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface ImagesQueryVariables {
  first?: number;
  after?: string | null;
  title?: string | null;
}

export interface LikeImageInput {
  imageId: string;
}

export interface LikeImageResponse {
  likeImage: {
    clientMutationId: string;
    image: Pick<Image, 'id' | 'liked' | 'likesCount'>;
  };
}
