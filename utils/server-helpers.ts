import { User } from '@prisma/client'
import { addMinutes, formatRFC7231 } from 'date-fns'
import { IncomingMessage } from 'http'
import jwt from 'jsonwebtoken'

const expiredTokenCache: Record<string, string> = {}

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_AUTH_SECRET!)
}

export const createAccessToken = (user: User, expirationDate?: Date) => {
  const { JWT_AUTH_SECRET } = process.env
  if (!JWT_AUTH_SECRET) throw new Error('Jwt auth secret not found')

  const token = jwt.sign({ userId: user.id }, JWT_AUTH_SECRET)
  const expiresAt = addMinutes(new Date(), 10)
  const rfcDate = formatRFC7231(expiresAt)

  return {
    token,
    setCookieHeader: `token=${token}; Expires=${rfcDate}; Secure; HttpOnly`,
  }
}

export const revokeAccessToken = (user: User, token?: string) => {
  // add the revoked token to a cache so we can blacklist server side
  if (token) expiredTokenCache[token] = token
  console.log({ expiredTokenCache, token })
  const rfcDate = formatRFC7231(new Date(1999))

  return `token=${token}; Expires=${rfcDate}; Secure; HttpOnly`
}

export const getUserId = (req: IncomingMessage, authToken?: string) => {
  if (req) {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.replace('undefined', '').replace('Bearer ', '')
      if (!token) {
        throw new Error('No token found')
      }
      // @ts-ignore
      const { userId } = verifyToken(token)
      console.log({ userId })

      return userId
    }
  } else if (authToken) {
    // @ts-ignore
    const { userId } = verifyToken(authToken)
    console.log({ userId })

    return userId
  }

  throw new Error('Not authenticated')
}
