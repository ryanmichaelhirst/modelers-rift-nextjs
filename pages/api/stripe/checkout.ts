import { prismaService } from '@lib/prisma'
import { stripe } from '@lib/stripe'
import { toNumber } from '@utils/index'
import type { NextApiRequest, NextApiResponse } from 'next'

const DOMAIN_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.modelersrift.com'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as { productId: string; userId: string | number }
  const { productId, userId: formUserId } = body

  const userId = toNumber(formUserId)
  const user = await prismaService.findUser({ where: { id: userId } })
  if (!user) {
    res.status(400).send({
      error: `User not found with id ${userId}`,
    })

    return
  }

  const product = await stripe.products.retrieve(productId)
  const lineItem = {
    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    price: product.default_price as string,
    quantity: 1,
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [lineItem],
    mode: 'payment',
    success_url: `${DOMAIN_URL}/donate?success=true&userId=${userId}`,
    cancel_url: `${DOMAIN_URL}/donate?canceled=true&userId=${userId}`,
    customer_email: user.email,
    metadata: {
      productId,
      productName: product.name,
      userId,
    },
  })

  res.redirect(303, session.url ?? '')
}
