import { prisma } from '../../prisma/queries/index'

export const ChampionsResolver = (parent, args, ctx) => {
  return prisma.champion.findMany({
    where: {
      name: {
        contains: args.filter.nameCnt,
      },
    },
    select: {
      id: args.select.id,
      name: args.select.name,
      assets: {
        select: {
          type: args.select.assetType,
          name: args.select.assetName,
          skin: args.select.assetSkin,
          path: args.select.assetPath,
        },
      },
    },
  })
}
