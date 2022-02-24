import { prisma } from '../../../../prisma/utils'

export const CharacterResolver = async (parent, args, ctx) => {
  console.debug({ parent, args, ctx })

  return await prisma.character.findFirst({
    where: {
      name: {
        equals: args?.filter?.nameEq,
      },
      type: {
        equals: args?.filter?.typeEq,
      },
    },
    include: {
      assets: args?.includeAssets,
    },
  })
}

export default CharacterResolver
