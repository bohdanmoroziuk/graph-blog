import React from 'react'

import PostWidget from 'components/post-widget'
import Categories from 'components/categories'
import PostDetail from 'components/post-detail'
import PostAuthor from 'components/post-author'
import PostComments from 'components/post-comments'
import PostCommentForm from 'components/post-comment-form'

import { getPost, getPosts } from 'services'

const Post = ({ post }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <PostAuthor author={post.author} />
          <PostCommentForm slug={post.slug} />
          <PostComments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug)

  return { props: { post } }
}

export async function getStaticPaths() {
  const posts = await getPosts()

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.node.slug
      }
    })),
    fallback: true,
  }
}

export default Post
