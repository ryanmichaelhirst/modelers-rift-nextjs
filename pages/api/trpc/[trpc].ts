import { createAccessToken, createRefreshToken, isTokenExpired } from '@/lib/auth'
import { prismaService } from '@/lib/prisma'
import { redisService, Session } from '@/lib/redis'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { NextApiResponse } from 'next'
import { characterRouter } from 'routers/character'
import { donationRouter } from 'routers/donation'
import { githubRouter } from 'routers/github'
import { stripeRouter } from 'routers/stripe'
import { userRouter } from 'routers/user'
import superjson from 'superjson'
import { z } from 'zod'

type SessionPayload = Session | undefined | null

const sessionUserId = async (accessToken: string) => {
  const session = (await redisService.client().json.get(accessToken)) as SessionPayload

  return session?.userId
}

const resetCookie = (res?: NextApiResponse) => res?.setHeader('Set-Cookie', '')

const deleteRefreshToken = async (refreshToken: string) =>
  await redisService.client().json.del(refreshToken)

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req
  const res = opts?.res
  const cookie = req?.headers.cookie

  if (!cookie) return { ...opts, prisma: prismaService.client, userId: null }

  let accessToken = cookie.match(/(?<=token=).*?(?=;)/g)?.at(0)
  let refreshToken = cookie.match(/(?<=refresh=).*/g)?.at(0)

  console.log({ accessToken, refreshToken })

  const userId = await (async () => {
    const isExpired = isTokenExpired(accessToken)
    if (accessToken && !isExpired) {
      console.log(`cookie has access token: ${accessToken}`)

      return await sessionUserId(accessToken)
    }

    // logout user if no refresh token (this should never happen)
    if (!refreshToken) {
      console.log('no refresh token')
      resetCookie(res)

      return null
    }

    const payload = (await redisService.client().json.get(refreshToken)) as SessionPayload

    // clean up cookie if refresh token is invalid
    if (!payload) {
      console.log(`no payload for refresh token: ${refreshToken}`)
      deleteRefreshToken(refreshToken)
      resetCookie(res)

      return null
    }

    const user = await prismaService.client.user.findUnique({
      where: {
        id: payload.userId,
      },
    })
    if (!user) {
      console.log(`no user for payload.userId: ${payload.userId}`)

      return null
    }

    // create new tokens and set in cookie
    const { token: newAccessToken, setCookieHeader: accessTokenHeader } = await createAccessToken(
      user,
    )
    accessToken = newAccessToken

    deleteRefreshToken(refreshToken)

    const { token: newRefreshToken, setCookieHeader: refreshTokenHeader } =
      await createRefreshToken(user)
    refreshToken = newRefreshToken

    res?.setHeader('Set-Cookie', [accessTokenHeader, refreshTokenHeader])

    console.log(`getting session user id from access token: ${accessToken}`)

    return await sessionUserId(accessToken)
  })()

  console.log({ userId })

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
  .merge('donation.', donationRouter)

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
