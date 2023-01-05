import { stripe } from '@/lib/stripe'
import { procedure, router } from '@/server/trpc'
import { toDollarAmount, toDollarNumber } from '@/utils/index'
import sortBy from 'lodash.sortby'
import { z } from 'zod'

export const stripeRouter = router({
  'products.list': procedure.input(z.object({ limit: z.number() })).query(async ({ input }) => {
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
        dollarNumber: toDollarNumber(stripePrice?.unit_amount),
        imageUrl: product.images[0],
      }
    })

    const sortedProducts = sortBy(productsWithDollarAmounts, ['dollarNumber'])

    return { products: sortedProducts }
  }),
})
