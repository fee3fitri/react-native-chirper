import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author {
        id
        name
        username
        profilePhoto
      }
      content
      likeCount
      isLikedByViewer
      createdAt
    }
  }
`;
