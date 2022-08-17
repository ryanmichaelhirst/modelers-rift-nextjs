import { createClient } from 'redis'

export type Session = {
  userId: number
  name: string
  email: string
  expiredAt: string
  createdAt: string
  type: string
}

class RedisService {
  private redisClient: ReturnType<typeof createClient> | undefined

  constructor() {
    if (!process.env.REDIS_URL) throw new Error('REDIS_URL env var not set')

    this.redisClient = createClient({
      url: process.env.REDIS_URL,
    })

    this.init()
  }

  client() {
    if (!this.redisClient) throw new Error('redis client not configured')

    return this.redisClient
  }

  init() {
    this.client().on('error', (err) => console.error('redis client err', err))
    this.client()
      .connect()
      .then(() => console.info('redis client connected'))
  }

  destroy() {
    if (!this.redisClient) return

    this.client().disconnect()
  }
}

export const redisService: RedisService = (() => {
  if (process.env.NODE_ENV === 'production') {
    return new RedisService()
  } else {
    // @ts-ignore
    if (!global.redisService) {
      // @ts-ignore
      global.redisService = new RedisService()
    }

    // @ts-ignore
    return global.redisService
  }
})()
