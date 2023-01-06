import { prismaService } from '@/lib/prisma'

export default async () => {
  const result = await prismaService.findManyUsers({})
  console.log(result)
}
