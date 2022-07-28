import prisma from '@lib/prisma'
import { logger } from 'logger'

/**
 * Average Runtime: 7.96s
 */
export default async () => {
  const resp = await prisma.asset.deleteMany()
  logger.info(resp)
}
