import { request } from 'graphql-request'

import {
  getPostsQuery,
  getRecentPostsQuery,
  getRelatedPostsQuery,
} from 'queries'

const url = process.env.NEXT_API_PUBLIC_ENDPOINT

export const getPosts = async () => {
  const result = await request(url, getPostsQuery)
  
  return result.postsConnection.edges
}

export const getRecentPosts = async () => {
  try {
    const result = await request(url, getRecentPostsQuery)
  
    console.log({ result });

    return result.posts
  } catch (error) {
    console.log('Error', error.message);
    return [];
  }
}

export const getRelatedPosts = async (slug, categories) => {
  const result = await request(url, getRelatedPostsQuery, { slug, categories })
}
