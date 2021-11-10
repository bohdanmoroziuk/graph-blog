import { GraphQLClient, gql } from 'graphql-request'

const url = process.env.NEXT_PUBLIC_API_ENDPOINT
const token = process.env.NEXT_PUBLIC_API_TOKEN

export default async function comments(req, res) {
  const client = new GraphQLClient(url, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const addCommentMutation = gql`
    mutation CreateComment($name: String!, $email: String!, $text: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, text: $text, post: {connect: {slug: $slug}}}) { id }
    }
  `

  try {
    const response = await client.request(addCommentMutation, req.body)
  
    return res.status(201).json(response)
  } catch (error) {
    return res.status(500).json(error)
  }
}
