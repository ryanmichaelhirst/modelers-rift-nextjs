import prisma from '@lib/prisma'

// TODO: type these resolvers
// @ts-ignore
export const AssetsResolver = async (parent, args, ctx) => {
  const page = args?.page ?? 1
  const pageSize = args?.pageSize ?? 10
  const skip = (page - 1) * pageSize
  const take = pageSize
  const where = args?.filter
    ? {
        type: {
          in: args?.filter?.typeIncludes,
          equals: args?.filter?.typeEq,
        },
        uri: {
          in: args?.filter?.uriIncludes,
        },
        skin: {
          equals: args?.filter.skinEq,
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
