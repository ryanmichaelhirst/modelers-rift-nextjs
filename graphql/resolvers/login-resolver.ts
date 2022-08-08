import { PrismaClient } from '@prisma/client'

type Resolver = (
  parent: any,
  args: { email: string; password: string },
  ctx: { prisma: PrismaClient },
) => void

export const LoginResolver: Resolver = (parent, args, ctx) => {}

export default LoginResolver
