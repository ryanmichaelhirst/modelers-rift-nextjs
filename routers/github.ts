import { createIssue } from '@lib/github'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createRouter } from '../pages/api/trpc/[trpc]'

export const githubRouter = createRouter().mutation('issue', {
  input: z.object({
    title: z.string(),
    body: z.string(),
    labels: z.array(z.string()),
  }),
  async resolve({ input }) {
    if (!process.env.GIT_OWNER) throw Error('owner of repo is not defined')
    if (!process.env.GIT_REPO) throw Error('name of repo is not defined')

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
  },
})
