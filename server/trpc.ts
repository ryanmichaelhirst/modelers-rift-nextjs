import type { Context } from '@/server/context'
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.context<Context>().create({
  // Optional:
  transformer: superjson,
  // Optional:
  errorFormatter({ shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
      },
    }
  },
})

export const router = t.router
export const mergeRouters = t.mergeRouters
export const procedure = t.procedure
