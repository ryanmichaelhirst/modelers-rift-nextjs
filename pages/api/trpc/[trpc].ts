import { createAccessToken, createRefreshToken } from '@lib/auth'
import { prismaService } from '@lib/prisma'
import { redisService, Session } from '@lib/redis'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { characterRouter } from 'routers/character'
import { githubRouter } from 'routers/github'
import { stripeRouter } from 'routers/stripe'
import { userRouter } from 'routers/user'
import superjson from 'superjson'
import { z } from 'zod'

const sessionUserId = async (accessToken: string) => {
  const session = (await redisService.client().json.get(accessToken)) as Session

  return session.userId
}

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req
  const res = opts?.res
  const cookie = req?.headers.cookie

  if (!cookie) return { ...opts, prisma: prismaService.client, userId: null }

  let accessToken = cookie.match(/(?<=token=).*?(?=;)/g)?.at(0)
  let refreshToken = cookie.match(/(?<=refresh=).*/g)?.at(0)

  const userId = await (async () => {
    if (accessToken) return await sessionUserId(accessToken)

    // logout user if no refresh token
    if (!refreshToken) return null

    // get a new access token
    const payload = (await redisService.client().json.get(refreshToken)) as Session
    const user = await prismaService.client.user.findUnique({
      where: {
        id: payload.userId,
      },
    })
    if (!user) return null

    const { token: newAccessToken, setCookieHeader: accessTokenHeader } = await createAccessToken(
      user,
    )
    accessToken = newAccessToken

    // delete old refresh token
    await redisService.client().json.del(refreshToken)

    const { token: newRefreshToken, setCookieHeader: refreshTokenHeader } =
      await createRefreshToken(user)
    refreshToken = newRefreshToken

    res?.setHeader('Set-Cookie', [accessTokenHeader, refreshTokenHeader])

    return await sessionUserId(accessToken)
  })()

  return {
    ...opts,
    prisma: prismaService.client,
    userId,
  }
}

export function createRouter() {
  return trpc.router<Context>().transformer(superjson)
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>

export const appRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      }
    },
  })
  .merge('character.', characterRouter)
  .merge('user.', userRouter)
  .merge('github.', githubRouter)
  .merge('stripe.', stripeRouter)

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  teardown: () => prismaService.client.$disconnect(),
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      console.error('trpc api error', error)
    }
  },
})
