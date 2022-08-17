import { QueryResolvers } from '@graphql/generated/types'
import prisma from '@lib/prisma'

export const UserResolver: QueryResolvers['user'] = async (parent, args, ctx) => {
  return await prisma.user.findFirst({
    where: {
      id: parseInt(args.id),
    },
  })
}

export default UserResolver
