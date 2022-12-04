import { createIssue } from '@/lib/github'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { router, procedure } from '@/server/trpc'

export const githubRouter = router({
  issue: procedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        labels: z.array(z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      if (!process.env.GIT_OWNER)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Owner of repo is not defined',
          // optional: pass the original error to retain stack trace
          //   cause: theError,
        })

      if (!process.env.GIT_REPO)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Name of repo is not defined',
          // optional: pass the original error to retain stack trace
          //   cause: theError,
        })

      const { title, body, labels } = input

      const { data, status } = await createIssue({ title, body, labels })

      if (status !== 201) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'The issue could not be created',
          // optional: pass the original error to retain stack trace
          //   cause: theError,
        })
      }

      return { issue: data, status }
    }),
})
