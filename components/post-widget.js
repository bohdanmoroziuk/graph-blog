import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import moment from 'moment'

import { getRelatedPosts, getRecentPosts } from 'services'

const PostWidget = ({ slug, categories }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // if (slug) {
    //   getRelatedPosts(slug, categories).then((posts) => setPosts(posts))
    // } else {
      getRecentPosts().then((posts) => setPosts(posts))
    // }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {posts.map((post) => (
        <div
          className="flex items-center w-full mb-4"
          key={post.slug}
        >
          <div className="w-16 flex-none">
            <img
              className="align-middle rounded-full"
              src={post.featuredImage.url}
              alt={post.title}
              height="60px"
              width="60px"
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link
              className="text-md"
              href={`/posts/${post.slug}`}
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
