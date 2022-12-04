import { logger } from '@/lib/logger'
import { prismaService } from '@/lib/prisma'

/**
 * Average Runtime: 7.96s
 */
export default async () => {
  const resp = await prismaService.deleteManyDonations()
  logger.info(resp)
}
