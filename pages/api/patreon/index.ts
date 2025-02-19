import { patreonLogger } from '@/lib/datadog'
import { prismaService } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import crypto from 'crypto'
import { buffer, json } from 'micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import util from 'util'

util.inspect.defaultOptions.maxArrayLength = null

const PATREON_WEBHOOK_SECRET = process.env.PATREON_WEBHOOK_SECRET

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    patreonLogger.info('Method is not POST', { metadata: { method: req.method } })
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }

  if (!PATREON_WEBHOOK_SECRET) {
    patreonLogger.error('No patreon webhook secret')
    res.status(405).send('No patreon webhook secret')

    return
  }

  const patreonEventHeader = req.headers['x-patreon-event']
  const patreonSigHeader = req.headers['x-patreon-signature']

  const buf = await buffer(req)
  const hex = crypto.createHmac('md5', PATREON_WEBHOOK_SECRET).update(buf).digest('hex')
  const body: PatreonEvent = await json(req)

  patreonLogger.info(`patreon request headers`, {
    metadata: { patreonEventHeader, patreonSigHeader },
  })

  patreonLogger.info(`Patreon json body`, {
    metadata: { body: util.inspect(body, { showHidden: false, depth: null, colors: true }) },
  })

  if (patreonSigHeader !== hex) {
    patreonLogger.error('sig not equal', { metadata: { patreonSigHeader, hex } })
    res.status(400).send('Request signature is unauthorized')

    return
  }

  const patronEmail = body.data.attributes.email
  const data = {
    payload: body as unknown as Prisma.JsonObject,
    patronEmail: patronEmail ?? '',
    patronId: body.data.id ?? '-1',
    type: patreonEventHeader as string,
  }

  patreonLogger.info('PatreonEvent prisma data', { metadata: { data } })

  switch (patreonEventHeader) {
    case 'members:pledge:create':
      await prismaService.createPatreonEvent({
        data,
      })
      break
    case 'members:pledge:update':
      await prismaService.createPatreonEvent({
        data,
      })
      break
    case 'members:pledge:delete':
      if (patronEmail === null) {
        res.status(400).send('No patron email - unable to delete pledge')

        return
      }

      await prismaService.createPatreonEvent({
        data,
      })
      await prismaService.updateManyPatreonEvent({
        where: {
          patronEmail,
        },
        data: {
          deletedAt: new Date(),
        },
      })
      break
    default:
      patreonLogger.error('Event not supported', { netadata: { patreonEventHeader } })
      res.status(400).end(`Unhandled event type ${patreonEventHeader}`)
  }

  res.json({ received: true })
}
