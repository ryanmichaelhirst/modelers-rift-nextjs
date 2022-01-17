import { ApolloServer } from 'apollo-server-express'
import { getUsers, prisma } from '../prisma/queries/index'
import { Resolvers } from './generated/types'
import { typeDefs } from './types/index'

const resolvers: Resolvers = {
  Query: {
    users: async () => await getUsers(),
    champions: async (parent, args, ctx) => {
      return await prisma.champion.findMany()
    },
    assets: async (parent, args, ctx) => {
      return await prisma.asset.findMany()
    },
  },
}

export const apolloServer = new ApolloServer({ typeDefs, resolvers })
