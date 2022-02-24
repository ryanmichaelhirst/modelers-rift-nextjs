import { ApolloServer } from 'apollo-server-express'
import { Resolvers } from './generated/types'
import {
  AssetsResolver,
  CharacterResolver,
  CharactersResolver,
  JobsResolver,
  UsersResolver,
} from './resolvers'
import { typeDefs } from './typedefs/index'

const resolvers: Resolvers = {
  Query: {
    users: UsersResolver,
    assets: AssetsResolver,
    characters: CharactersResolver,
    character: CharacterResolver,
    jobs: JobsResolver,
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export default async (req, res) => {
  await apolloServer.start()
  await apolloServer.createGraphQLServerOptions({ ...req, path: '/api/graphql' }, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
