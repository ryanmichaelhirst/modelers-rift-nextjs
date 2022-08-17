import { QueryResolvers } from '@graphql/generated/types'
import { prismaService } from '@lib/prisma'

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

  const [assets, totalCount] = await prismaService.client.$transaction([
    prismaService.client.asset.findMany({
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
    prismaService.client.asset.count({
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
