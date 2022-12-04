import { createAccessToken, createRefreshToken, isTokenExpired } from '@/lib/auth'
import { prismaService } from '@/lib/prisma'
import { redisService, Session } from '@/lib/redis'
import { inferAsyncReturnType } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { NextApiResponse } from 'next'

type SessionPayload = Session | undefined | null

const sessionUserId = async (accessToken: string) => {
  const session = (await redisService.client().json.get(accessToken)) as SessionPayload

  return session?.userId ?? null
}

const resetCookie = (res?: NextApiResponse) => res?.setHeader('Set-Cookie', '')

const deleteRefreshToken = async (refreshToken: string) =>
  await redisService.client().json.del(refreshToken)

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req
  const res = opts?.res

  // parse cookie header and session from redis
  const getUserIdFromCookie = async () => {
    const cookie = req?.headers.cookie
    // console.log(`cookie: ${cookie}`)
    if (!cookie) return null

    let accessToken = cookie.match(/(?<=token=).*?(?=;)/g)?.at(0)
    let refreshToken = cookie.match(/(?<=refresh=).*?(?=;)/g)?.at(0)

    const isAccessTokenExpired = await isTokenExpired(accessToken)
    // console.log(`is_access_token_expired: ${isAccessTokenExpired}`)

    if (accessToken && !isAccessTokenExpired) {
      // access token is valid
      const sessionInfo = await sessionUserId(accessToken)
      // console.log(`cookie has access_token: ${accessToken} and user_id: ${sessionInfo}`)

      return sessionInfo
    }

    // logout user if no refresh token (this should never happen)
    if (!refreshToken) {
      // console.log('no refresh token')
      resetCookie(res)

      return null
    }

    const payload = (await redisService.client().json.get(refreshToken)) as SessionPayload

    // account for invalid refresh token (this should never happen)
    if (!payload) {
      // console.log(`no payload for refresh_token: ${refreshToken}`)
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
      // console.log(`no user for payload.user_id: ${payload.userId}`)

      return null
    }

    // access token is expired
    const { token: newAccessToken, setCookieHeader: accessTokenHeader } = await createAccessToken(
      user,
    )
    accessToken = newAccessToken
    res?.setHeader('Set-Cookie', accessTokenHeader)
    // console.log(`created new access_token: ${newAccessToken}`)

    // refresh token is expired
    const isRefreshTokenExpired = await isTokenExpired(refreshToken)
    if (isRefreshTokenExpired) {
      deleteRefreshToken(refreshToken)

      const { token: newRefreshToken, setCookieHeader: refreshTokenHeader } =
        await createRefreshToken(user)

      refreshToken = newRefreshToken
      res?.setHeader('Set-Cookie', refreshTokenHeader)
      // console.log(`is expired for refresh_token: ${refreshToken}`)
    }

    // console.log(`getting session user id from access_token: ${accessToken}`)

    return await sessionUserId(accessToken)
  }

  const userId = await getUserIdFromCookie()

  return {
    ...opts,
    prisma: prismaService.client,
    userId,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
