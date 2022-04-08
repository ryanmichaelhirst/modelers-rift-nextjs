import { Resolvers } from '@graphql/generated/types'
import {
  AssetsResolver,
  CharacterResolver,
  CharactersResolver,
  JobsResolver,
  UsersResolver,
} from '@graphql/resolvers'
import { typeDefs } from '@graphql/typedefs/index'
import { createGraphqlContext } from '@lib/graphql'
import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { PageConfig } from 'next'

const resolvers: Resolvers = {
  Query: {
    users: UsersResolver,
    assets: AssetsResolver,
    characters: CharactersResolver,
    character: CharacterResolver,
    jobs: JobsResolver,
  },
}

const cors = Cors({
  allowMethods: ['GET', 'POST', 'OPTIONS'],
})

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createGraphqlContext,
})
const startServer = apolloServer.start()

const handler = apolloServer.createHandler({ path: '/api/graphql' })

// // Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

export default cors(handler)
