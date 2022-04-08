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
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest, NextApiResponse } from 'next'
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

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createGraphqlContext,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})
const startServer = apolloServer.start()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

// // Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}
