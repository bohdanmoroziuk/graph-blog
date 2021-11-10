import React, { useState, useEffect, useRef } from 'react'

const PostCommentForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [storage, setStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const nameRef = useRef()
  const emailRef = useRef()
  const commentRef = useRef()
  const storeRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form 
      className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8"
      onClick={handleSubmit}  
    >
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">

      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          ref={commentRef}
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          type="text"
          ref={nameRef}
          placeholder="Name"
          name="name"
        />
        <input
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          type="email"
          ref={emailRef}
          placeholder="Email"
          name="email"
        />
      </div>
      {error && (
        <p className="text-xs text-red-500">
          All fields are required.
        </p>
      )}
      <div className="mt-8">
        <button
          className="
            transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600
            text-lg rounded-lg text-white px-8 py-3
          "
          type="submit"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review.
          </span>
        )}
      </div>
    </form>
  )
}

export default PostCommentForm
