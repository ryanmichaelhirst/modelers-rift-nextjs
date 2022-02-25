import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { PageConfig } from 'next'
import { createContext } from '../../graphql/context'
import { Resolvers } from './generated/types'
import {
  AssetsResolver,
  CharacterResolver,
  CharactersResolver,
  JobsResolver,
  UsersResolver,
} from './resolvers'
import { typeDefs } from './typedefs/index'

const cors = Cors()

const resolvers: Resolvers = {
  Query: {
    users: UsersResolver,
    assets: AssetsResolver,
    characters: CharactersResolver,
    character: CharacterResolver,
    jobs: JobsResolver,
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: createContext })
const startServer = apolloServer.start()

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  if (req.method === 'OPTIONS') {
    res.end()

    return false
  }

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
