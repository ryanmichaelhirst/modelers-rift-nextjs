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
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
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

const cors = Cors()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createGraphqlContext,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
})
const startServer = apolloServer.start()

export default cors(async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  if (req.method === 'OPTIONS') {
    res.end()

    return false
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

// // Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}
