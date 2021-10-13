import { PrismaClient } from '@prisma/client'

export const sampleUsers = [
  { name: 'Alice', email: 'alice@prisma.io', username: 'alice_prisma', password: 'XXX' },
  { name: 'Rob', email: 'rob@prisma.io', username: 'rob_prisma', password: 'XXX' },
  { name: 'Axel', email: 'axel@prisma.io', username: 'axel_prisma', password: 'XXX' },
]

export const prisma = new PrismaClient()

export const getUsers = async () => await prisma.user.findMany()

export const getChampions = async () =>
  await prisma.champion.findMany({
    include: {
      models: {
        select: {
          id: true,
          name: true,
          url: true,
        },
      },
    },
  })
