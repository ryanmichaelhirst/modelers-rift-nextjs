import { ApolloServer } from 'apollo-server-express'
import { Resolvers } from './generated/types'
import { AssetsResolver, ChampionsResolver, UsersResolver } from './resolvers'
import { typeDefs } from './typedefs/index'

const resolvers: Resolvers = {
  Query: {
    users: UsersResolver,
    champions: ChampionsResolver,
    assets: AssetsResolver,
  },
}

export const apolloServer = new ApolloServer({ typeDefs, resolvers })
