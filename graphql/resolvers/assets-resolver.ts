import { prisma } from '../../prisma/utils'

export const AssetsResolver = async (parent, args, ctx) => {
  console.debug({ parent, args, ctx })

  // get characterId by character name
  const character = await prisma.character.findFirst({
    where: {
      name: args.filter.characterName.toLowerCase(),
    },
  })
  const interactions = ['ornn']
  const search = interactions.reduce((acc, cur) => {
    if (acc === '') return cur
    acc += ` | ${cur}`

    return acc
  }, '')
  console.log({ search })

  return prisma.asset.findMany({
    where: {
      // name: {
      //   search: 'ornn',
      // },
      type: {
        in: args?.filter?.typeIncludes || [],
      },
      characterId: character.id,
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
