import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URI }),
  cache: new InMemoryCache(),
})
