import { makeExecutableSchema } from '@graphql-tools/schema'
import { createServer } from '@graphql-yoga/node'
import { Resolvers } from '@graphql/generated/types'
import {
  AssetsResolver,
  CharacterResolver,
  CharactersResolver,
  JobsResolver,
} from '@graphql/resolvers'
import { typeDefs } from '@graphql/typedefs/index'

const resolvers: Resolvers = {
  Query: {
    assets: AssetsResolver,
    characters: CharactersResolver,
    character: CharacterResolver,
    jobs: JobsResolver,
  },
}

const server = createServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  port: 4000,
})

export default server
