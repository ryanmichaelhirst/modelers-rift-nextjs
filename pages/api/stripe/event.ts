import { prismaService } from '@/lib/prisma'
import { toNumber } from '@/utils/index'
import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/lib/stripe'
import { stripeLogger } from '@/lib/datadog'

interface StripeEvent {
  id: string
  object: 'event'
  api_version: string
  created: number
  data: {
    object: {
      id: string
      object: 'checkout.session'
      amount_subtotal: number
      amount_total: number
      customer_email?: string | null
      metadata: {
        productId: string
        productName: string
        userId: string
      }
      payment_status: 'paid'
      status: 'complete'
    }
  }
  livemode: boolean
  pending_webhooks: number
  request: {
    id: string | null
    idempotency_key: string | null
  }
  type: 'checkout.session.completed' | 'payment_intent.succeeded'
}

interface StripeError {
  message: string
}

const isStripeError = (err: unknown): err is StripeError =>
  typeof err === 'object' && err !== null && 'message' in err

const saveStripeDonation = async ({ res, event }: { res: NextApiResponse; event: StripeEvent }) => {
  if (event.type === 'checkout.session.completed') {
    const metaUserId = event.data.object.metadata.userId
    const userId = toNumber(metaUserId)

    if (!userId) {
      stripeLogger.error(`No user id`)
      res.status(400).send('No user id')

      return
    }

    const donation = await prismaService.createDonation({
      data: {
        userId,
        amount: event.data.object.amount_total.toString(),
        productName: event.data.object.metadata.productName,
        payload: event as unknown as Prisma.JsonObject,
      },
    })

    stripeLogger.info('Saved stripe donation', { metadata: { donation } })
  }
}

const signingSecret = 'whsec_NX8SiSlAk2okY1FDRFZxiKRvIwFG2azi'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let event: StripeEvent | undefined

  stripeLogger.info('Stripe event received', { metadata: { headers: req.headers, body: req.body } })

  if (process.env.NODE_ENV === 'production') {
    const sig = req.headers['stripe-signature']

    if (!sig) {
      stripeLogger.error('Stripe signature not present', { metadata: { sig } })
      res.status(400).send('Stripe signature not present')

      return
    }

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, signingSecret) as StripeEvent
      stripeLogger.info('Constructed stripe event', { metadata: { event } })
    } catch (err) {
      const errMessage = isStripeError(err) ? err.message : err
      stripeLogger.error('Error constructing event', { metadata: { errMessage } })
      res.status(500).send(`Error constructing event: ${errMessage}`)

      return
    }
  } else {
    event = req.body as StripeEvent
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await saveStripeDonation({ res, event })
      break
    default:
      stripeLogger.error(`Unhandled event type ${event.type}`)
      res.status(500).send(`Unhandled event type ${event.type}`)
  }

  res.status(200).send('OK')
}
