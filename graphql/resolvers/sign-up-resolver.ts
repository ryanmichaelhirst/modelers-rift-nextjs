import { MutationResolvers } from '@graphql/generated/types'
import { createAccessToken } from '@utils/server-helpers'
import bcrypt from 'bcryptjs'

export const SignUpResolver: MutationResolvers['signUp'] = async (parent, args, ctx) => {
  const hashedPassword = await bcrypt.hash(args.input.password, 10)
  const user = await ctx.prisma.user.create({ data: { ...args.input, password: hashedPassword } })

  const { token, setCookieHeader } = createAccessToken(user)
  ctx.res.setHeader('Set-Cookie', setCookieHeader)

  return {
    token,
    user,
  }
}

export default SignUpResolver
