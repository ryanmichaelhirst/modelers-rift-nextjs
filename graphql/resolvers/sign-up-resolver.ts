import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

type Resolver = (
  parent: any,
  args: { email: string; password: string },
  ctx: { prisma: PrismaClient },
) => void

export const SignUpResolver: Resolver = async (parent, args, ctx) => {
  // 1
  const password = await bcrypt.hash(args.password, 10)

  // 2
  const user = await ctx.prisma.user.create({ data: { ...args, password } })

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}

export default SignUpResolver
