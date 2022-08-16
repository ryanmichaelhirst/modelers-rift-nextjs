import { GraphQLYogaError } from '@graphql-yoga/node'
import { MutationResolvers } from '@graphql/generated/types'
import { revokeAccessToken } from '@utils/server-helpers'

// TODO: this throws an error
export const LogoutResolver: MutationResolvers['logout'] = async (parent, args, ctx) => {
  const userId = ctx.userId
  if (!userId) throw new GraphQLYogaError('user id not found')

  const user = await ctx.prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new GraphQLYogaError('user not found')

  const token = ctx.req.headers.cookie
  if (!token) throw new GraphQLYogaError('no cookie found, unable to logout')

  // properly delete token and set header
  const setCookieHeader = await revokeAccessToken(token.replace('token=', ''))
  ctx.res.setHeader('Set-Cookie', '')

  return user
}

export default LogoutResolver
