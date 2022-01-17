import { prisma } from '../../prisma/queries/index'

export const UsersResolver = (parent, args, ctx) => {
  return prisma.user.findMany({
    where: {
      name: {
        contains: args.filter.nameCnt,
      },
    },
    select: {
      id: args.select.id,
      email: args.select.email,
      name: args.select.name,
      username: args.select.username,
    },
  })
}
