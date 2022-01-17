import { prisma } from '../../prisma/queries/index'

export const AssetsResolver = (parent, args, ctx) => {
  return prisma.asset.findMany({
    where: {
      championId: {
        equals: args.filter.championId,
      },
    },
    select: {
      id: args.select.id,
      champion: args.select.champion,
      championId: true,
      type: args.select.type,
      name: args.select.name,
      skin: args.select.skin,
      path: args.select.path,
    },
  })
}
