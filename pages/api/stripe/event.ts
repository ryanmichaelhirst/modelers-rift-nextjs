import type { NextApiRequest, NextApiResponse } from 'next'

// stripe checkout session event
// {
//   id: 'evt_1LoJjFB1FEYQfKPs2gC0cDNX',
//   object: 'event',
//   api_version: '2020-03-02',
//   created: 1664684677,
//   data: {
//     object: {
//       id: 'cs_test_a1BEhlV4kfczwxadQW8WqW8jvlyjt1Uqdw6us0NUe0KzeUEsBvr8AUOY4d',
//       object: 'checkout.session',
//       after_expiration: null,
//       allow_promotion_codes: null,
//       amount_subtotal: 500,
//       amount_total: 500,
//       automatic_tax: [Object],
//       billing_address_collection: null,
//       cancel_url: 'http://localhost:3000/donate?canceled=true',
//       client_reference_id: null,
//       consent: null,
//       consent_collection: null,
//       created: 1664684636,
//       currency: 'usd',
//       customer: null,
//       customer_creation: 'if_required',
//       customer_details: [Object],
//       customer_email: null,
//       expires_at: 1664771036,
//       livemode: false,
//       locale: null,
//       metadata: {},
//       mode: 'payment',
//       payment_intent: 'pi_3LoJjDB1FEYQfKPs0IKmCy02',
//       payment_link: null,
//       payment_method_collection: 'always',
//       payment_method_options: {},
//       payment_method_types: [Array],
//       payment_status: 'paid',
//       phone_number_collection: [Object],
//       recovered_from: null,
//       setup_intent: null,
//       shipping: null,
//       shipping_address_collection: null,
//       shipping_options: [],
//       shipping_rate: null,
//       status: 'complete',
//       submit_type: null,
//       subscription: null,
//       success_url: 'http://localhost:3000/donate?success=true',
//       total_details: [Object],
//       url: null
//     }
//   },
//   livemode: false,
//   pending_webhooks: 3,
//   request: { id: null, idempotency_key: null },
//   type: 'checkout.session.completed'
// }

interface StripeEvent {
  id: string
  object: 'event'
  api_version: string
  created: number
  livemode: boolean
  pending_webhooks: number
  type: 'checkout.session.completed'
  request: { id: string | null; idempotency_key: string | null }
  data: {
    object: {
      id: string
      object: 'checkout.session'
      amount_subtotal: number
      amount_total: number
      status: 'complete'
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as StripeEvent
  console.log(body)

  if (body.type === 'checkout.session.completed') {
  }

  res.status(200).send('OK')
}
