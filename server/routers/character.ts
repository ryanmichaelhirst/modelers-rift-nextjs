import { z } from 'zod'
import { router, procedure } from '@/server/trpc'

export const characterRouter = router({
  all: procedure
    .input(
      z
        .object({
          page: z.number().nullish(),
          pageSize: z.number().nullish(),
          filter: z
            .object({
              nameEq: z.string().nullish(),
              typeEq: z.string().nullish(),
            })
            .nullish(),
          includeAssets: z.boolean().optional(),
        })
        .nullish(),
    )
    .query(async ({ ctx, input }) => {
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
    }),
  get: procedure
    .input(
      z
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
    )
    .query(async ({ ctx, input }) => {
      const character = await ctx.prisma.character.findFirst({
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

      return character ?? null
    }),
})
