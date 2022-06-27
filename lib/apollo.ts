import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: '/api/graphql' }),
  cache: new InMemoryCache(),
})
