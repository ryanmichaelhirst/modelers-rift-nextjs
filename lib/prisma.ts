import { HTTP_SAFE_CHAMPION_NAMES } from '@customtypes/constants'
import { logger } from '@lib/logger'
import { PrismaClient, type Prisma } from '@prisma/client'

export interface Asset {
  type: string
  name: string
  skin: string
  uri: string
  url: string
}

export class PrismaService {
  public client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  // returns 'champion' | 'team_fight_tactics' | 'summoners_rift' | 'unknown'
  characterType = (name: string) => {
    const championType = HTTP_SAFE_CHAMPION_NAMES.map((n) => n.toLowerCase()).includes(
      name.toLowerCase(),
    )
    const tftType = name.includes('tft')
    const summonersRiftType = name.includes('sru')

    if (championType) return 'champion'
    if (tftType) return 'team_fight_tactics'
    if (summonersRiftType) return 'summoners_rift'

    return 'unknown'
  }

  deleteAllTableData = async () => {
    const assetCount = await this.client.asset.deleteMany()
    const characterCount = await this.client.character.deleteMany()

    return { assetCount, characterCount }
  }

  findCharacter = async (name: string) => {
    const character = await this.client.character.findFirst({
      where: { name },
    })
    logger.info(character)

    return character
  }

  createCharacter = async (name: string) => {
    const character = await this.client.character.create({
      data: {
        name,
        type: this.characterType(name),
      },
    })
    logger.info(character)

    return character
  }

  findOrCreateCharacter = async (name: string) => {
    const character = await this.findCharacter(name)
    if (character) return character

    return await this.createCharacter(name)
  }

  updateCharacter = async ({ id, data }: { id: number; data?: Record<string, unknown> }) => {
    if (!data) return

    return await this.client.character.update({
      where: {
        id,
      },
      data,
    })
  }

  createAssets = async ({ assets, characterName }: { assets: Asset[]; characterName: string }) => {
    const character = await this.findCharacter(characterName)
    if (!character) return

    const updates = assets.map((a) =>
      this.client.asset.upsert({
        where: { uri: a.uri },
        update: {
          ...a,
        },
        create: { ...a, characterId: character.id },
      }),
    )

    await this.client.$transaction(updates)
  }

  findManyAssets = async () => {
    return await this.client.asset.findMany({
      where: {
        type: {
          equals: 'sfx',
        },
      },
    })
  }

  updateAsset = async ({ id, data }: { id: number; data?: Record<string, unknown> }) => {
    if (!data) return

    return await this.client.asset.update({
      where: {
        id,
      },
      data,
    })
  }

  updateManyAssets = async (data: Record<string, unknown>[]) => {
    return await this.client.asset.updateMany({
      data,
    })
  }

  createUser = async ({ data }: { data: Prisma.UserCreateArgs['data'] }) =>
    await this.client.user.create({ data })

  findManyUsers = async (args: Prisma.UserFindManyArgs) => await this.client.user.findMany(args)
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices
export const prismaService: PrismaService = (() => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaService()
  } else {
    // @ts-ignore
    if (!global.prisma) {
      // @ts-ignore
      global.prisma = new PrismaService()
    }

    // @ts-ignore
    return global.prisma
  }
})()
