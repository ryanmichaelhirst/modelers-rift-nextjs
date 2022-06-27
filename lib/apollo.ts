import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

console.log(process.env.NEXT_PUBLIC_GRAPHQL_URI)
export const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URI }),
  cache: new InMemoryCache(),
})
