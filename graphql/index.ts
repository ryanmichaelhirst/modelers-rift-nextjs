import { ApolloServer, gql } from 'apollo-server-express'
import { getUsers } from '../prisma/queries'

const typeDefs = gql`
  type User {
    id: Int
    username: String!
    password: String!
    email: String!
    name: String
  }

  type Query {
    users: [User]
  }
`

const resolvers = {
  Query: {
    users: async () => await getUsers(),
  },
}

export const apolloServer = new ApolloServer({ typeDefs, resolvers })
