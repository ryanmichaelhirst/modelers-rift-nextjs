import { QueryResolvers } from '@graphql/generated/types'

export const UserResolver: QueryResolvers['user'] = async (parent, args, ctx) => {
  return await ctx.prismaService.client.user.findFirst({
    where: {
      id: parseInt(args.id),
    },
  })
}

export default UserResolver
