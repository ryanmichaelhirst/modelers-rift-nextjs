import { MutationResolvers } from '@graphql/generated/types'
import { createAccessToken, createRefreshToken } from '@utils/server-helpers'
import bcrypt from 'bcryptjs'

export const LoginResolver: MutationResolvers['login'] = async (parent, args, ctx) => {
  const user = await ctx.prisma.user.findUnique({ where: { email: args.input.email } })
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(args.input.password, user.password)
  if (!valid) throw new Error('Invalid password')

  const { token, setCookieHeader } = await createAccessToken(user)
  const refreshToken = await createRefreshToken(user)
  ctx.res.setHeader('Set-Cookie', [setCookieHeader, refreshToken.setCookieHeader])

  return {
    token,
    user,
  }
}

export default LoginResolver
