import { PrismaClient } from '@prisma/client'

export const sampleUsers = [
  { name: 'Alice', email: 'alice@prisma.io' },
  { name: 'Rob', email: 'rob@prisma.io' },
  { name: 'Axel', email: 'axel@prisma.io' },
]

export const prisma = new PrismaClient()

// delete all below, examples for sample model
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
