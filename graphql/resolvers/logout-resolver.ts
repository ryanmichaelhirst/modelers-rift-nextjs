import { MutationResolvers } from '@graphql/generated/types'
import { revokeAccessToken } from '@utils/server-helpers'

export const LogoutResolver: MutationResolvers['logout'] = async (parent, args, ctx) => {
  const userId = ctx.userId
  if (!userId) throw new Error('User id not found')

  const user = await ctx.prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User not found')

  // TODO: revoke access token here, remove 'token=' from cookie
  const token = ctx.req.headers.cookie
  console.log({ token })
  const setCookieHeader = revokeAccessToken(user, token)
  ctx.res.setHeader('Set-Cookie', setCookieHeader)
  ctx.res.setHeader('Authorization', '')

  return user
}

export default LogoutResolver
