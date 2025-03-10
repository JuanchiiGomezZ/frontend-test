import { gql } from '@apollo/client';

export const GET_IMAGES = gql`
  query GetImages($first: Int, $after: String, $title: String) {
    images(first: $first, after: $after, title: $title) {
      nodes {
        id
        title
        author
        price
        liked
        picture
        likesCount
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const LIKE_IMAGE = gql`
  mutation likeImage($input: LikeImageInput!) {
    likeImage(input: $input) {
      clientMutationId
      image {
        id
        liked
        likesCount
      }
    }
  }
`;
