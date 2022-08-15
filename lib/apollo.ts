import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  credentials: 'same-origin',
})

const authLink = setContext((request, prevContext) => {
  const token = localStorage.getItem('token')
  console.log(token, prevContext.headers)

  return {
    headers: {
      ...prevContext.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
