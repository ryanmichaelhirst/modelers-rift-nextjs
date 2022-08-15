import { makeExecutableSchema } from '@graphql-tools/schema'
import { createServer } from '@graphql-yoga/node'
import {
  AssetsResolver,
  CharacterResolver,
  CharactersResolver,
  CurrentUserResolver,
  JobsResolver,
  LoginResolver,
  SignUpResolver,
  UserResolver,
} from '@graphql/resolvers'
import LogoutResolver from '@graphql/resolvers/logout-resolver'
import { typeDefs } from '@graphql/typedefs/index'
import prisma from '@lib/prisma'
import { getUserId } from '@utils/server-helpers'
import { GraphQLDateTime } from 'graphql-scalars'

const server = createServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers: {
      DateTime: GraphQLDateTime,
      Query: {
        assets: AssetsResolver,
        characters: CharactersResolver,
        character: CharacterResolver,
        jobs: JobsResolver,
        user: UserResolver,
        currentUser: CurrentUserResolver,
      },
      Mutation: {
        signUp: SignUpResolver,
        login: LoginResolver,
        logout: LogoutResolver,
      },
    },
  }),
  port: 4000,
  context: (initialContext) => {
    // graphql-yoga will automatically merge these extra attributes to the base req
    // https://www.graphql-yoga.com/docs/features/context#extending-the-initial-context
    const { req } = initialContext
    const authorizationHeader = req.headers.authorization

    return {
      prisma,
      // userId: number
      userId: authorizationHeader ? getUserId(req) : null,
    }
  },
})

export default server
