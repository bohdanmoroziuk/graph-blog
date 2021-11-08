import { gql } from 'graphql-request';

export const getPostsQuery = gql`
  query GetPosts {
    postsConnection {
      edges {
        cursor
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
`

export const getRecentPostsQuery = gql`
  query GetRecentPosts {
    posts(orderBy: createdAt_ASC, last: 3) {
      title
      slug
      createdAt
      featuredImage {
        url
      }
    }
  }
`

export const getRelatedPostsQuery = gql`
  query GetRelatedPost($slug: String!, $categories: [String!]) {
    posts(
      where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`
