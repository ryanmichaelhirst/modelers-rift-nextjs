import { procedure, router } from '@/server/trpc'
import { z } from 'zod'

export const greetingRouter = router({
  hello: procedure
    .input(
      z
        .object({
          text: z.string().nullish(),
        })
        .nullish(),
    )
    .query(({ input }) => {
      return {
        hello: `hello ${input?.text ?? 'world'}`,
      }
    }),
})
