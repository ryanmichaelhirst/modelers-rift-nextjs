import { characterRouter } from '@/server/routers/character'
import { donationRouter } from '@/server/routers/donation'
import { githubRouter } from '@/server/routers/github'
import { greetingRouter } from '@/server/routers/greeting'
import { stripeRouter } from '@/server/routers/stripe'
import { userRouter } from '@/server/routers/user'
import { router } from '@/server/trpc'

export const appRouter = router({
  greeting: greetingRouter,
  character: characterRouter,
  user: userRouter,
  github: githubRouter,
  stripe: stripeRouter,
  donation: donationRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
