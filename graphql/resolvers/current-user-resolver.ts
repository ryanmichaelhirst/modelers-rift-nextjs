import { GraphQLYogaError } from '@graphql-yoga/node'
import { QueryResolvers } from '@graphql/generated/types'
import prisma from '@lib/prisma'
import { isTokenExpired } from '@utils/server-helpers'

export const CurrentUserResolver: QueryResolvers['currentUser'] = async (parent, args, ctx) => {
  const userId = ctx.userId
  if (!userId) throw new GraphQLYogaError('user id not found')

  if (ctx.req.headers.cookie) {
    const accessToken = ctx.req.headers.cookie.split(';')[0]
    const token = accessToken.replace('token=', '').trim()
    const isExpired = await isTokenExpired(token)

    if (isExpired) throw new GraphQLYogaError('session has expired')
  }

  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })
}

export default CurrentUserResolver
