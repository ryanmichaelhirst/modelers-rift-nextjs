import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
// import { setContext } from '@apollo/client/link/context'

// const authLink = setContext((request, prevContext) => {
//   const token = localStorage.getItem('token')

//   return {
//     headers: {
//       ...prevContext.headers,
//       ...(token && { Authorization: `Bearer ${token}` }),
//     },
//   }
// })

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  credentials: 'same-origin',
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
