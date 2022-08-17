import { GraphQLYogaError } from '@graphql-yoga/node'
import { MutationResolvers } from '@graphql/generated/types'
import { revokeAccessToken } from '@lib/auth'
import { formatRFC7231 } from 'date-fns'

export const LogoutResolver: MutationResolvers['logout'] = async (parent, args, ctx) => {
  const { userId } = ctx
  if (!userId) throw new GraphQLYogaError('user id not found for logout')

  const user = await ctx.prismaService.client.user.findUnique({ where: { id: userId } })
  if (!user) throw new GraphQLYogaError('user not found for logout')

  const token = ctx.req.headers.cookie
  if (!token) throw new GraphQLYogaError('no token for logout')

  // properly delete token and set header
  await revokeAccessToken(token.replace('token=', ''))
  const rfcDate = formatRFC7231(new Date(1999))

  ctx.res.setHeader('Set-Cookie', [
    `token=123; Expires=${rfcDate}; Secure; HttpOnly`,
    `refresh=456; Expires=${rfcDate}; Secure; HttpOnly`,
  ])

  return user
}

export default LogoutResolver
