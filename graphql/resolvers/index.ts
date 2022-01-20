import { ApolloServer } from 'apollo-server-express'
import { Resolvers } from '../generated/types'
import { typeDefs } from '../typedefs/index'
import { AssetsResolver } from './assets-resolver'
import { CharactersResolver } from './characters-resolver'
import { UsersResolver } from './users-resolver'

const resolvers: Resolvers = {
  Query: {
    users: UsersResolver,
    assets: AssetsResolver,
    characters: CharactersResolver,
  },
}

export const apolloServer = new ApolloServer({ typeDefs, resolvers })
