import {
  createAccessToken,
  createRefreshToken,
  isTokenExpired,
  revokeAccessToken,
} from '@/lib/auth'
import { procedure, router } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcryptjs'
import { formatRFC7231 } from 'date-fns'
import { z } from 'zod'

export const userRouter = router({
  current: procedure
    .input(z.object({ includeDonations: z.boolean() }).nullish())
    .query(async ({ input, ctx }) => {
      const { userId } = ctx
      if (!userId) return null

      if (ctx.req?.headers.cookie) {
        const accessToken = ctx.req.headers.cookie.match(/(?<=token=).*?(?=;)/g)?.at(0)
        const isExpired = await isTokenExpired(accessToken)

        if (isExpired)
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'session has expired',
            // optional: pass the original error to retain stack trace
            //   cause: theError,
          })
      }

      const user = await ctx.prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          donations: input?.includeDonations,
        },
      })

      return user ?? null
    }),
  signup: procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
    }),
  login: procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
    }),
  logout: procedure.mutation(async ({ ctx }) => {
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
  }),
})
