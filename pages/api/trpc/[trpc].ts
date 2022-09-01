import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { z } from 'zod'
import { prismaService } from '@lib/prisma'
import { characterRouter } from 'routers/character'

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
  return {
    req: opts?.req,
    prisma: prismaService.client,
    character: prismaService.client.character,
  }
}

export function createRouter() {
  return trpc.router<Context>()
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>

export const appRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      }
    },
  })
  .merge('character.', characterRouter)

// export type definition of API
export type AppRouter = typeof appRouter
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  teardown: () => prismaService.client.$disconnect(),
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      console.error('trpc api error', error)
    }
  },
})

// <----- DEMO BELOW ------>
// import { PrismaClient } from '@prisma/client';
// import * as trpc from '@trpc/server';
// import * as trpcNext from '@trpc/server/adapters/next';
// import superjson from 'superjson';
// import { todoRouter } from '../../../routers/todo';

// const prisma = new PrismaClient();

// // create context based of incoming request
// // set as optional here so it can also be re-used for `getStaticProps()`
// export const createContext = async (
//   opts?: trpcNext.CreateNextContextOptions,
// ) => {
//   return {
//     req: opts?.req,
//     prisma,
//     task: prisma.task,
//   };
// };
// export type Context = trpc.inferAsyncReturnType<typeof createContext>;

// export function createRouter() {
//   return trpc.router<Context>();
// }
// const router = createRouter().transformer(superjson).merge('todo.', todoRouter);

// export const appRouter = router;
// export type AppRouter = typeof router;

// export default trpcNext.createNextApiHandler({
//   router,
//   createContext,
//   teardown: () => prisma.$disconnect(),
//   onError({ error }) {
//     if (error.code === 'INTERNAL_SERVER_ERROR') {
//       // send to bug reporting
//       console.error('Something went wrong', error);
//     }
//   },
// });
