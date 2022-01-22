import { prisma } from '../../prisma/utils'

export const CharacterResolver = async (parent, args, ctx) => {
  console.debug({ parent, args, ctx })

  return prisma.character.findFirst({
    where: {
      name: {
        contains: args?.filter?.nameCnt ?? '',
      },
      ...(args?.filter?.typeEq && {
        type: {
          equals: args?.filter?.typeEq,
        },
      }),
    },
    include: {
      assets: !!args?.filter?.includeAssets,
    },
  })
}
