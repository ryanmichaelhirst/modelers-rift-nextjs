import { createAccessToken, createRefreshToken, isTokenExpired, revokeAccessToken } from '@lib/auth'
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcryptjs'
import { formatRFC7231 } from 'date-fns'
import { z } from 'zod'
import { createRouter } from '../pages/api/trpc/[trpc]'

export const userRouter = createRouter()
  .query('current', {
    async resolve({ ctx }) {
      const { userId } = ctx
      if (!userId) return

      if (ctx.req?.headers.cookie) {
        const accessToken = ctx.req.headers.cookie.split(';')[0]
        const token = accessToken.replace('token=', '').trim()
        const isExpired = await isTokenExpired(token)

        if (isExpired)
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'session has expired',
            // optional: pass the original error to retain stack trace
            //   cause: theError,
          })
      }

      return await ctx.prisma.user.findFirst({
        where: {
          id: userId,
        },
      })
    },
  })
  .mutation('signup', {
    input: z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {
      const hashedPassword = await bcrypt.hash(input.password, 10)
      const user = await ctx.prisma.user.create({
        data: { ...input, password: hashedPassword },
      })

      const { token, setCookieHeader } = await createAccessToken(user)
      const refreshToken = await createRefreshToken(user)
      ctx.res?.setHeader('Set-Cookie', [setCookieHeader, refreshToken.setCookieHeader])

      return {
        token,
        user,
      }
    },
  })
  .mutation('login', {
    // using zod schema to validate and infer input values
    input: z.object({
      email: z.string(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      })
      if (!user)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'user not found for login',
          // optional: pass the original error to retain stack trace
          //   cause: theError,
        })

      const valid = await bcrypt.compare(input.password, user.password)
      if (!valid)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'invalid password',
          // optional: pass the original error to retain stack trace
          //   cause: theError,
        })

      const { token, setCookieHeader } = await createAccessToken(user)
      const refreshToken = await createRefreshToken(user)
      ctx.res?.setHeader('Set-Cookie', [setCookieHeader, refreshToken.setCookieHeader])

      return {
        token,
        user,
      }
    },
  })
  .mutation('logout', {
    async resolve({ ctx }) {
      const { userId } = ctx
      if (!userId)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'user id not found for logout',
          // optional: pass the original error to retain stack trace
          //   cause: theError,
        })

      const user = await ctx.prisma.user.findUnique({ where: { id: userId } })
      if (!user)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'user not found for logout',
          // optional: pass the original error to retain stack trace
          //   cause: theError,
        })

      const token = ctx.req?.headers.cookie
      if (!token)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'no token for logout',
          // optional: pass the original error to retain stack trace
          //   cause: theError,
        })

      // properly delete token and set header
      await revokeAccessToken(token.replace('token=', ''))
      const rfcDate = formatRFC7231(new Date(1999))

      ctx.res?.setHeader('Set-Cookie', [
        `token=123; Expires=${rfcDate}; Secure; HttpOnly`,
        `refresh=456; Expires=${rfcDate}; Secure; HttpOnly`,
      ])

      return user
    },
  })
