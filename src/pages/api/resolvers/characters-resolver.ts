import { prisma } from '../../../../prisma/utils'

export const CharactersResolver = async (parent, args, ctx) => {
  const page = args?.page ?? 1
  const pageSize = args?.pageSize ?? 10
  const skip = (page - 1) * pageSize
  const take = pageSize

  const where = {
    name: {
      equals: args?.filter?.nameEq,
    },
    type: {
      equals: args?.filter?.typeEq,
    },
  }

  const [characters, totalCount] = await prisma.$transaction([
    prisma.character.findMany({
      skip,
      take,
      where,
      include: {
        assets: args.includeAssets,
      },
      orderBy: {
        name: 'asc',
      },
    }),
    prisma.character.count({
      where,
    }),
  ])

  return {
    collection: characters,
    metadata: {
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      pageSize,
    },
  }
}

export default CharactersResolver
