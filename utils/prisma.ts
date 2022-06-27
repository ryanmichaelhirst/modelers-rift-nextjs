import prisma from '@lib/prisma'
import { determineType } from '@utils/index'
import { logger } from 'logger'

export interface Asset {
  type: string
  name: string
  skin: string
  uri: string
  url: string
}

export const deleteAllTableData = async () => {
  const assetCount = await prisma.asset.deleteMany()
  const characterCount = await prisma.character.deleteMany()

  return { assetCount, characterCount }
}

const findCharacter = async (name: string) => {
  const character = await prisma.character.findFirst({
    where: { name },
  })
  logger.info(character)

  return character
}

const createCharacter = async (name: string) => {
  const character = await prisma.character.create({
    data: {
      name,
      type: determineType(name),
    },
  })
  logger.info(character)

  return character
}

export const findOrCreateCharacter = async (name: string) => {
  const character = await findCharacter(name)
  if (character) return character

  return await createCharacter(name)
}

export const updateCharacter = async ({
  id,
  data,
}: {
  id: number
  data?: Record<string, unknown>
}) => {
  if (!data) return

  return await prisma.character.update({
    where: {
      id,
    },
    data,
  })
}

export const createAssets = async ({
  assets,
  characterName,
}: {
  assets: Asset[]
  characterName: string
}) => {
  const character = await findCharacter(characterName)
  if (!character) return

  const updates = assets.map((a) =>
    prisma.asset.upsert({
      where: { uri: a.uri },
      update: {
        ...a,
      },
      create: { ...a, characterId: character.id },
    }),
  )

  await prisma.$transaction(updates)
}

export const findManyAssets = async () => {
  return await prisma.asset.findMany({
    where: {
      type: {
        equals: 'sfx',
      },
    },
  })
}

export const updateAsset = async ({ id, data }: { id: number; data?: Record<string, unknown> }) => {
  if (!data) return

  return await prisma.asset.update({
    where: {
      id,
    },
    data,
  })
}

export const updateManyAssets = async (data: Record<string, unknown>[]) => {
  return await prisma.asset.updateMany({
    data,
  })
}
