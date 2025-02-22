export interface Image {
  __typename: 'Image';
  id: string;
  title: string;
  author: string;
  price: number;
  liked: boolean;
  picture: string;
  likesCount: number;
}

export interface PageInfo {
  __typename: 'PageInfo';
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface ImagesConnection {
  __typename: 'ImageConnection';
  nodes: Image[];
  pageInfo: PageInfo;
}

export interface ImagesQueryResponse {
  images: ImagesConnection;
}

export interface LikeImageResponse {
  data: {
    likeImage: {
      clientMutationId: string;
      image: Image;
    };
  };
}
