import { prismaService } from '@lib/prisma'
import { Prisma } from '@prisma/client'
import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import util from 'util'

util.inspect.defaultOptions.maxArrayLength = null

const PATREON_WEBHOOK_SECRET = process.env.PATREON_WEBHOOK_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!PATREON_WEBHOOK_SECRET) {
    res.status(405).send({ error: `No patreon webhook secret` })

    return
  }

  const { method } = req
  const patreonEvent = req.headers['x-patreon-event']
  const patreonSig = req.headers['x-patreon-signature']

  const body: PatreonEvent = req.body
  const bodyStr = JSON.stringify(body)
  const hex = crypto.createHmac('md5', PATREON_WEBHOOK_SECRET).update(bodyStr).digest('hex')

  console.log(`[TEST] - ${patreonEvent}`)
  console.log(util.inspect(body, { showHidden: false, depth: null, colors: true }))

  if (patreonSig !== hex) {
    console.log('sig not equal')
    res.status(400).send({ error: 'Request signature is unauthorized' })

    return
  }

  if (method !== 'POST') {
    console.log('method not post')
    res.status(405).send({ error: `Method ${method} not allowed` })

    return
  }

  const patronEmail = body.data.attributes.email
  const data = {
    payload: body as unknown as Prisma.JsonObject,
    patronEmail,
    patronId: body.data.id,
    type: patreonEvent as string,
  }

  switch (patreonEvent) {
    case 'members:pledge:create':
      await prismaService.createPatreonEvent({
        data,
      })

      res.status(200).send('OK')
      break
    case 'members:pledge:update':
      await prismaService.createPatreonEvent({
        data,
      })
      res.status(200).send('OK')
      break
    case 'members:pledge:delete':
      await prismaService.updateManyPatreonEvent({
        where: {
          patronEmail,
        },
        data: {
          ...data,
          deletedAt: new Date(),
        },
      })
      res.status(200).send('OK')
      break
    default:
      res.status(400).send({ error: 'event not supported' })
  }
}
