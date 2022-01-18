import { prisma } from '../../prisma/queries/index'

export const UsersResolver = (parent, args, ctx) => {
  console.log({ parent, args, ctx })

  return prisma.user.findMany({
    where: {
      username: {
        contains: args?.filter?.usernameCnt || '',
      },
      name: {
        contains: args?.filter?.nameCnt || '',
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  })
}
