import { PrismaClient } from '@prisma/client'

export const sampleUsers = [
  { name: 'Alice', email: 'alice@prisma.io', username: 'alice_prisma', password: 'XXX' },
  { name: 'Rob', email: 'rob@prisma.io', username: 'rob_prisma', password: 'XXX' },
  { name: 'Axel', email: 'axel@prisma.io', username: 'axel_prisma', password: 'XXX' },
]

export const prisma = new PrismaClient()

export const getUsers = async () => await prisma.user.findMany()

export const createUser = async ({ name, email }) => {
  await prisma.user.create({
    data: {
      name,
      email,
    },
  })

  return getUsers()
}

export const getUserByUsername = async (username: string) => {
  await prisma.user.findFirst({
    where: {
      name: username,
    },
  })
}
