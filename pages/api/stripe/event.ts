import { stripeLogger } from '@/lib/datadog'
import { prismaService } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { toNumber } from '@/utils/index'
import { Prisma } from '@prisma/client'
import { buffer } from 'micro'
import type { NextApiRequest, NextApiResponse } from 'next'

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

const saveStripeDonation = async (event: StripeEvent) => {
  if (event.type === 'checkout.session.completed') {
    const metaUserId = event.data.object.metadata.userId
    const userId = toNumber(metaUserId)

    const existingDonations = await prismaService.findManyDonations({
      where: {
        userId,
      },
    })
    const processedEvent = existingDonations.find((d) => {
      // @ts-ignore
      return d.payload?.id === event.id
    })
    if (processedEvent) {
      stripeLogger.info('Stripe donation has already been saved', {
        metadata: { processedEvent, eventId: event.id },
      })

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

const signingSecret = process.env.STRIPE_SIGNING_SECRET ?? ''

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    stripeLogger.info('Method is not POST', { metadata: { method: req.method } })
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }

  let event: StripeEvent | undefined

  const sig = req.headers['stripe-signature']

  if (!sig) {
    stripeLogger.error('Stripe signature not present', { metadata: { sig } })
    res.status(400).send('Stripe signature not present')

    return
  }

  stripeLogger.info('Stripe event received', { metadata: { body: req.body, sig } })

  try {
    const buf = await buffer(req)
    event = stripe.webhooks.constructEvent(buf, sig, signingSecret) as StripeEvent
    stripeLogger.info('Constructed stripe event', { metadata: { event } })
  } catch (err) {
    const errMessage = isStripeError(err) ? err.message : err
    stripeLogger.error('Error constructing event', { metadata: { errMessage } })
    res.status(500).send(`Error constructing event: ${errMessage}`)

    return
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await saveStripeDonation(event)
      break
    default:
      stripeLogger.error(`Unhandled event type ${event.type}`)
      res.status(500).end(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
}
