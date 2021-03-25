import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getUsers = async () => {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

const createUser = async () => {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })

  getUsers()
}

createUser()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
