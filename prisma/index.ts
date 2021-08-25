import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// delete all below, examples for sample model
export const getUsers = async () => await prisma.user.findMany()

export const createUser = async () => {
  await prisma.user.create({
    data: {
      name: 'Alice #3',
      email: 'alice_three@prisma.io',
    },
  })

  return getUsers()
}

createUser()
  .then((res) => console.log(res))
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
