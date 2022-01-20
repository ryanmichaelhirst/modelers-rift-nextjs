import { prisma } from '../../prisma/queries/index'

export const ChampionsResolver = (parent, args, ctx) => {
  console.debug({ parent, args, ctx })

  return prisma.champion.findMany({
    where: {
      name: {
        contains: args?.filter?.nameCnt ?? '',
      },
    },
    include: {
      assets: !!args?.filter?.includeAssets,
    },
  })
}
