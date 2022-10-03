import { stripe } from '@lib/stripe'
import { toDollarAmount } from '@utils/index'
import sortBy from 'lodash.sortby'
import { z } from 'zod'
import { createRouter } from '../pages/api/trpc/[trpc]'

export const stripeRouter = createRouter().query('products.list', {
  input: z.object({ limit: z.number() }),
  async resolve({ input }) {
    const products = await stripe.products.list({ limit: input.limit ?? 10, active: true })
    const prices = await stripe.prices.list({
      limit: input.limit ?? 10,
    })

    const productsWithDollarAmounts = products.data.map((product) => {
      const stripePrice = prices.data.find((price) => price.id === product.default_price)
      const dollarAmount = stripePrice?.unit_amount
        ? toDollarAmount(stripePrice.unit_amount)
        : undefined

      return {
        ...product,
        dollarAmount,
        imageUrl: product.images[0],
      }
    })

    const sortedProducts = sortBy(productsWithDollarAmounts, ['dollarAmount'])

    return { products: sortedProducts }
  },
})
