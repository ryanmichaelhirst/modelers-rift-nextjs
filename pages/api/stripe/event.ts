import { prismaService } from '@/lib/prisma'
import { toNumber } from '@/utils/index'
import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

interface StripeEvent {
  id: string
  object: 'event'
  api_version: string
  created: number
  livemode: boolean
  pending_webhooks: number
  type: 'checkout.session.completed' | 'payment_intent.succeeded'
  request: { id: string | null; idempotency_key: string | null }
  data: {
    object: {
      id: string
      object: 'checkout.session'
      amount_subtotal: number
      amount_total: number
      status: 'complete'
      customer_email?: string | null
      payment_status: 'paid'
      metadata: { userId: string; productId: string; productName: string }
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as StripeEvent

  if (
    body.type === 'checkout.session.completed' &&
    body.data.object.status === 'complete' &&
    body.data.object.payment_status === 'paid'
  ) {
    const metaUserId = body.data.object.metadata.userId
    const userId = toNumber(metaUserId)
    if (!userId) {
      res.status(400).send({ error: 'No user id' })

      return
    }

    await prismaService.createDonation({
      data: {
        userId,
        amount: body.data.object.amount_total.toString(),
        productName: body.data.object.metadata.productName,
        payload: body as unknown as Prisma.JsonObject,
      },
    })
  }

  res.status(200).send('OK')
}
