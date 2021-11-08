import { request } from 'graphql-request'

import { getPostsQuery } from 'queries'

const url = process.env.NEXT_API_PUBLIC_ENDPOINT

export const getPosts = async () => {
  const result = await request(url, getPostsQuery)
  
  return result.postsConnection.edges;
}
