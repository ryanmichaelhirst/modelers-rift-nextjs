import { QueryResolvers } from '@graphql/generated/types'
import prisma from '@lib/prisma'

// TODO: add jwt auth here
export const CurrentUserResolver: QueryResolvers['currentUser'] = async (parent, args, ctx) => {
  const userId = ctx.userId
  if (!userId) throw new Error('user id not found')

  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })
}

export default CurrentUserResolver
