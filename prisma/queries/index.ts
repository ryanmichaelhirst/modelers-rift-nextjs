import { PrismaClient } from '@prisma/client'

export interface Asset {
  type: 'model' | 'sfx' | 'vo'
  name: string
  skin: string
  path: string
}

export const sampleUsers = [
  { name: 'Alice', email: 'alice@prisma.io', username: 'alice_prisma', password: 'XXX' },
  { name: 'Rob', email: 'rob@prisma.io', username: 'rob_prisma', password: 'XXX' },
  { name: 'Axel', email: 'axel@prisma.io', username: 'axel_prisma', password: 'XXX' },
]

export const prisma = new PrismaClient({
  rejectOnNotFound: false,
})

export const getUsers = async () => await prisma.user.findMany()

const findOrCreateChampion = async (name: string) => {
  let champion = await prisma.champion.findFirst({
    where: { name },
  })

  if (champion) return champion

  return await prisma.champion.create({
    data: {
      name,
    },
  })
}

export const createAssets = async ({
  championName,
  assets,
}: {
  championName: string
  assets: Asset[]
}) => {
  const champion = await findOrCreateChampion(championName)

  await prisma.asset.createMany({
    data: assets.map((a) => ({
      championId: champion.id,
      ...a,
    })),
  })
}

export const getChampions = async () =>
  await prisma.champion.findMany({
    include: {
      assets: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

export const getChampionAssets = async ({ name }: { name: string }) =>
  (
    await prisma.champion.findFirst({
      where: {
        name,
      },
      include: {
        assets: true,
      },
    })
  ).assets
