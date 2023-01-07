import { logger } from '@/lib/logger'
import { prismaService } from '@/lib/prisma'

export default async () => {
  const result = await prismaService.findManyUsers({})
  logger.info(result)
}
