import { toDollarAmount } from '@/utils/index'
import { z } from 'zod'
import { router, procedure } from '@/server/trpc'

export const donationRouter = router({
  list: procedure
    .input(
      z
        .object({
          page: z.number().nullish(),
          pageSize: z.number().nullish(),
          filter: z.object({
            userIdEq: z.number().nullish(),
          }),
        })
        .nullish(),
    )
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1
      const pageSize = input?.pageSize ?? 10
      const skip = (page - 1) * pageSize
      const take = pageSize

      const where = {
        userId: {
          equals: input?.filter?.userIdEq ?? undefined,
        },
      }

      const [donations, totalCount] = await ctx.prisma.$transaction([
        ctx.prisma.donation.findMany({
          skip,
          take,
          where,
          orderBy: {
            amount: 'asc',
          },
        }),
        ctx.prisma.donation.count({
          where,
        }),
      ])

      const donationsWithDollarAmounts = donations.map((d) => {
        return {
          ...d,
          dollarAmount: toDollarAmount(d.amount),
        }
      })

      return {
        collection: donationsWithDollarAmounts,
        metadata: {
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          currentPage: page,
          pageSize,
        },
      }
    }),
})
