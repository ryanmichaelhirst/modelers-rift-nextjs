import { prisma } from '../../prisma/queries/index'

export const AssetsResolver = (parent, args, ctx) => {
  console.debug({ parent, args, ctx })

  // championIds come in as string[]
  const championIds = args?.filter?.championIdsIncludes

  return prisma.asset.findMany({
    where: {
      name: {
        contains: args?.filter?.nameCnt,
      },
      ...(args?.filter?.typeEq && {
        type: {
          equals: args?.filter?.typeEq,
        },
      }),
      championId: {
        ...(championIds && { in: championIds.map((id) => parseInt(id)) }),
      },
    },
    select: {
      id: true,
      champion: true,
      championId: true,
      type: true,
      name: true,
      skin: true,
      path: true,
    },
  })
}
