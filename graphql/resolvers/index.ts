import { ApolloServer } from 'apollo-server-express'
import { Resolvers } from '../generated/types'
import { typeDefs } from '../typedefs/index'
import { AssetsResolver } from './assets-resolver'
import { CharacterResolver } from './character-resolver'
import { CharactersResolver } from './characters-resolver'
import { JobsResolver } from './jobs-resolver'
import { UsersResolver } from './users-resolver'

const resolvers: Resolvers = {
  Query: {
    users: UsersResolver,
    assets: AssetsResolver,
    characters: CharactersResolver,
    character: CharacterResolver,
    jobs: JobsResolver,
  },
}

export const apolloServer = new ApolloServer({ typeDefs, resolvers })
