import React, { useState, useEffect, useRef } from 'react'

import { submitComment } from 'services'

const PostCommentForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [storage, setStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const nameRef = useRef()
  const emailRef = useRef()
  const textRef = useRef()
  const storeRef = useRef()

  useEffect(() => {
    nameRef.current.value = localStorage.getItem('name')
    emailRef.current.value = localStorage.getItem('email')
  }, [])

  const handleSubmit = async () => {
    setError(false)

    const { value: name } = nameRef.current
    const { value: email } = emailRef.current
    const { value: text } = textRef.current
    const { checked: store } = storeRef.current

    if (!name || !email || !text) {
      return setError(true)
    }

    const comment = {
      name,
      email,
      text,
      slug,
    }

    if (store) {
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
    }

    try {
      await submitComment(comment)

      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3 * 1000)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          ref={textRef}
          placeholder="Text"
          name="text"
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
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            ref={storeRef}
            name="store"
            id="store"
            defaultChecked
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="store"
          >
            Save my e-mail and name for the next time I comment.  
          </label>
        </div>
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
          type="button"
          onClick={handleSubmit}
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review.
          </span>
        )}
      </div>
    </div>
  )
}

export default PostCommentForm
