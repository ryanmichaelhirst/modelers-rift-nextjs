import { PrismaClient } from '@prisma/client'
import { determineType } from '../bin/utils'

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

  const type = determineType(name)

  return await prisma.character.create({
    data: {
      name,
      type,
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

  // TODO: update this to find or create many
  await prisma.asset.createMany({
    data: assets.map((a) => ({
      characterId: character.id,
      ...a,
    })),
  })
}

export const deleteAllTableData = async () => {
  const userCount = await prisma.user.deleteMany()
  const assetCount = await prisma.asset.deleteMany()
  const characterCount = await prisma.character.deleteMany()

  return { userCount, assetCount, characterCount }
}
