import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers/_app'
import * as trpcNext from '@trpc/server/adapters/next'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      console.error('trpc api error', error)
    }
  },
})
