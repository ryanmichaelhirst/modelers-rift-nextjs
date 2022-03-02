import { ApolloClient, InMemoryCache } from '@apollo/client'

const prodGraphql = '/api/graphql'
const devGraphql = 'http://localhost:3000/api/graphql'
export const apolloClient = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? devGraphql : prodGraphql,
  cache: new InMemoryCache(),
})
