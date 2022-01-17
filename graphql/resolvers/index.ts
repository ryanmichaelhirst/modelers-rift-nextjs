import { ApolloServer } from 'apollo-server-express'
import { Resolvers } from '../generated/types'
import { typeDefs } from '../typedefs/index'
import { AssetsResolver } from './assets-resolver'
import { ChampionsResolver } from './champions-resolver'
import { UsersResolver } from './users-resolver'

const resolvers: Resolvers = {
  Query: {
    users: UsersResolver,
    champions: ChampionsResolver,
    assets: AssetsResolver,
  },
}

export const apolloServer = new ApolloServer({ typeDefs, resolvers })
