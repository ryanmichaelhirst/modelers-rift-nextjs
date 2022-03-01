import { ApolloClient, InMemoryCache } from '@apollo/client'

const prodGraphql = 'league-of-legends-champions-iw9alz663-rmbh4211995.vercel.app/api/graphql'

export const apolloClient = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/graphql' : prodGraphql,
  cache: new InMemoryCache(),
})
