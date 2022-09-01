import { makeExecutableSchema } from '@graphql-tools/schema'
import { createServer } from '@graphql-yoga/node'
import {
  CurrentUserResolver,
  JobsResolver,
  LoginResolver,
  SignUpResolver,
  UserResolver,
} from '@graphql/resolvers'
import LogoutResolver from '@graphql/resolvers/logout-resolver'
import { typeDefs } from '@graphql/typedefs/index'
import { createAccessToken, createRefreshToken } from '@lib/auth'
import { prismaService } from '@lib/prisma'
import { redisService, Session } from '@lib/redis'
import { GraphQLDateTime } from 'graphql-scalars'

const server = createServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers: {
      DateTime: GraphQLDateTime,
      Query: {
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
  context: async (initialContext) => {
    // graphql-yoga will automatically merge these extra attributes to the base req
    // https://www.graphql-yoga.com/docs/features/context#extending-the-initial-context
    const { req, res } = initialContext
    const cookie = req.headers.cookie
    if (!cookie) return { prismaService, userId: null }

    let accessToken = cookie.match(/(?<=token=).*?(?=;)/g)?.at(0)
    let refreshToken = cookie.match(/(?<=refresh=).*/g)?.at(0)

    const userId = await (async () => {
      if (!accessToken) {
        if (!refreshToken) return null

        // get a new access token
        const payload = (await redisService.client().json.get(refreshToken)) as Session
        const user = await prismaService.client.user.findUnique({
          where: {
            id: payload.userId,
          },
        })
        if (!user) return null

        const {
          token: newAccessToken,
          setCookieHeader: accessTokenHeader,
        } = await createAccessToken(user)
        accessToken = newAccessToken
        // delete old refresh token
        await redisService.client().json.del(refreshToken)
        const {
          token: newRefreshToken,
          setCookieHeader: refreshTokenHeader,
        } = await createRefreshToken(user)
        refreshToken = newRefreshToken

        res.setHeader('Set-Cookie', [accessTokenHeader, refreshTokenHeader])
      }

      const session = (await redisService.client().json.get(accessToken)) as Session

      return session.userId
    })()

    return {
      prismaService,
      userId,
    }
  },
})

export default server
