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

export interface ImageEdge {
  __typename: 'ImageEdge';
  node: Image;
}

export interface PageInfo {
  __typename: 'PageInfo';
  hasNextPage: boolean;
  endCursor: string;
}

export interface ImagesConnection {
  __typename: 'ImageConnection';
  edges: ImageEdge[];
  pageInfo: PageInfo;
}

export interface ImagesQueryResponse {
  images: ImagesConnection;
}
