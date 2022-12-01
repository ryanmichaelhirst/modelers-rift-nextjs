import { logger } from '@/lib/logger'
import { redisService, Session } from '@/lib/redis'

/**
 * Average Runtime: 1.235s
 */
export default async () => {
  const redisKeys = await redisService.client().keys('*')

  for (const key of redisKeys) {
    const value = (await redisService.client().json.get(key)) as Session
    const expiredAt = new Date(value.expiredAt)

    await redisService.client().json.del(key)
    logger.info({ expiredAt, key })
  }

  redisService.destroy()
}
