import { QueryResolvers } from '@graphql/generated/types'
import prisma from '@lib/prisma'

export const AssetsResolver: QueryResolvers['assets'] = async (parent, args, ctx) => {
  const characterId = args?.filter?.characterId

  const page = args?.page ?? 1
  const pageSize = args?.pageSize ?? 10
  const skip = (page - 1) * pageSize
  const take = pageSize
  const where = args?.filter
    ? {
        type: {
          equals: args?.filter?.typeEq || undefined,
        },
        skin: {
          equals: args?.filter.skinEq || undefined,
        },
        characterId: {
          equals: characterId ? parseInt(characterId) : undefined,
        },
      }
    : {}

  const [assets, totalCount] = await prisma.$transaction([
    prisma.asset.findMany({
      skip,
      take,
      where,
      include: {
        character: true,
      },
      orderBy: {
        name: 'asc',
      },
    }),
    prisma.asset.count({
      where,
    }),
  ])

  return {
    collection: assets,
    metadata: {
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      pageSize,
    },
  }
}

export default AssetsResolver
