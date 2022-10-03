import { logger } from '@/lib/logger'
import { redisService, Session } from '@/lib/redis'

/**
 * Average Runtime: 2.542s
 */
export default async () => {
  const redisKeys = await redisService.client().keys('*')
  // ISO 8601 standard
  // https://stackoverflow.com/questions/30209941/what-t-and-z-means-in-date#:~:text=The%20ISO%208601%20standard%20defines,per%20military%20and%20aviation%20tradition.
  const now = new Date()

  for (const key of redisKeys) {
    const value = (await redisService.client().json.get(key)) as Session
    const expiredAt = new Date(value.expiredAt)

    if (now >= expiredAt) {
      // session has expired, delete from redis
      await redisService.client().json.del(key)
      logger.info({ expired: true, expiredAt, now, key })
    } else {
      logger.info({ expired: false, expiredAt, now, key })
    }
  }

  redisService.destroy()
}
