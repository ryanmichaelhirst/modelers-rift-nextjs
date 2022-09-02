import { z } from 'zod'
import { createRouter } from '../pages/api/trpc/[trpc]'

export const characterRouter = createRouter()
  .query('all', {
    input: z
      .object({
        page: z.number().nullish(),
        pageSize: z.number().nullish(),
        filter: z.object({
          nameEq: z.string().nullish(),
          typeEq: z.string().nullish(),
        }),
        includeAssets: z.boolean(),
      })
      .nullish(),
    async resolve({ ctx, input }) {
      const page = input?.page ?? 1
      const pageSize = input?.pageSize ?? 10
      const skip = (page - 1) * pageSize
      const take = pageSize

      const where = {
        name: {
          equals: input?.filter?.nameEq ?? undefined,
        },
        type: {
          equals: input?.filter?.typeEq ?? undefined,
        },
      }

      const [characters, totalCount] = await ctx.prisma.$transaction([
        ctx.prisma.character.findMany({
          skip,
          take,
          where,
          include: {
            assets: input?.includeAssets,
          },
          orderBy: {
            name: 'asc',
          },
        }),
        ctx.prisma.character.count({
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
    },
  })
  .query('get', {
    input: z
      .object({
        page: z.number().nullish(),
        pageSize: z.number().nullish(),
        filter: z.object({
          nameEq: z.string().nullish(),
          typeEq: z.string().nullish(),
        }),
        includeAssets: z.boolean(),
      })
      .nullish(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.character.findFirst({
        where: {
          name: {
            equals: input?.filter?.nameEq ?? undefined,
          },
          type: {
            equals: input?.filter?.typeEq ?? undefined,
          },
        },
        include: {
          assets: input?.includeAssets,
        },
      })
    },
  })
