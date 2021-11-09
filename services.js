import { request } from 'graphql-request'

import {
  getPostQuery,
  getPostsQuery,
  getCategoriesQuery,
  getRecentPostsQuery,
  getRelatedPostsQuery,
} from 'queries'

const url = process.env.NEXT_PUBLIC_API_ENDPOINT

export const getPosts = async () => {
  const result = await request(url, getPostsQuery)
  
  return result.postsConnection.edges
}

export const getRecentPosts = async () => {
  try {
    const result = await request(url, getRecentPostsQuery)

    return result.posts
  } catch (error) {
    return [];
  }
}

export const getRelatedPosts = async (slug, categories) => {
  const result = await request(url, getRelatedPostsQuery, { slug, categories })

  return result.posts
}

export const getCategories = async () => {
  const result = await request(url, getCategoriesQuery)

  return result.categories
}

export const getPost = async (slug) => {
  const result = await request(url, getPostQuery, { slug })

  return result.post
}