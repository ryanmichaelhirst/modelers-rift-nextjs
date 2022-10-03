import { redisService, Session } from '@/lib/redis'
import { User } from '@prisma/client'
import { addDays, addMinutes, formatRFC7231 } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export const createAccessToken = async (user: User) => {
  const sessionId = uuidv4()
  const expiredAt = addMinutes(new Date(), 1)
  const rfcDate = formatRFC7231(expiredAt)

  // create session record in redis
  await redisService.client().json.set(sessionId, '.', {
    userId: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(),
    expiredAt,
    type: 'access',
  })

  return {
    token: sessionId,
    setCookieHeader: `token=${sessionId}; Expires=${rfcDate}; Secure; HttpOnly`,
  }
}

export const revokeAccessToken = async (token: string) => {
  // delete session from the db
  await redisService.client().json.del(token)
  const rfcDate = formatRFC7231(new Date(1999))

  return `token=${token}; Expires=${rfcDate}; Secure; HttpOnly`
}

export const isTokenExpired = async (token: string) => {
  const session = (await redisService.client().json.get(token)) as Session | null
  if (!session) return true

  const now = new Date()
  const expiredAt = new Date(session.expiredAt)

  return now >= expiredAt
}

export const createRefreshToken = async (user: User) => {
  const id = uuidv4()
  const expiredAt = addDays(new Date(), 7)
  const rfcDate = formatRFC7231(expiredAt)

  // create refresh record in redis
  await redisService.client().json.set(id, '.', {
    userId: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(),
    expiredAt,
    type: 'refresh',
  })

  return {
    token: id,
    setCookieHeader: `refresh=${id}; Expires=${rfcDate}; Secure; HttpOnly`,
  }
}
