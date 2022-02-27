import { PrismaClient } from '@prisma/client'
import { determineType } from '@utils/index'

export interface Asset {
  type: 'model' | 'sfx' | 'vo'
  name: string
  skin: string
  path: string
}

export const prisma = new PrismaClient({
  rejectOnNotFound: false,
})

const findOrCreateCharacter = async (name: string) => {
  let character = await prisma.character.findFirst({
    where: { name },
  })
  if (character) return character

  return await prisma.character.create({
    data: {
      name,
      type: determineType(name),
    },
  })
}

export const createAssets = async ({
  assets,
  characterName,
}: {
  assets: Asset[]
  characterName: string
}) => {
  const character = await findOrCreateCharacter(characterName)
  const updates = assets.map((a) =>
    prisma.asset.upsert({
      where: { path: a.path },
      update: {
        ...a,
      },
      create: { ...a, characterId: character.id },
    }),
  )
  await prisma.$transaction(updates)
}

export const deleteAllTableData = async () => {
  const userCount = await prisma.user.deleteMany()
  const assetCount = await prisma.asset.deleteMany()
  const characterCount = await prisma.character.deleteMany()

  return { userCount, assetCount, characterCount }
}

export const updateCharacter = async ({
  id,
  data,
}: {
  id: number
  data?: Record<string, unknown>
}) => {
  await prisma.character.update({
    where: {
      id,
    },
    // TODO: fix this
    data,
  })
}
