import { prisma } from '../../prisma/utils'

export const AssetsResolver = (parent, args, ctx) => {
  console.debug({ parent, args, ctx })

  // championIds come in as string[]
  const characterIds = args?.filter?.characterIdsIncludes

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
      characterId: {
        ...(characterIds && { in: characterIds.map((id) => parseInt(id)) }),
      },
    },
    select: {
      id: true,
      character: true,
      characterId: true,
      type: true,
      name: true,
      skin: true,
      path: true,
      duration: true,
    },
  })
}
