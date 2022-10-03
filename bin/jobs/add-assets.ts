import { dataDragonService } from '@/lib/ddragon'
import { logger } from '@/lib/logger'
import { prismaService } from '@/lib/prisma'
import { BUCKET_NAME } from '@/lib/s3'
import { ChampionDetailedInfo } from '@/types'
import { capitalize } from '@/utils/index'
import { ListObjectsV2CommandOutput } from '@aws-sdk/client-s3'
import { awsS3Service } from 'bin/services/aws-s3-service'
import groupBy from 'lodash.groupby'

/**
 * Average Runtime: 3338.16s
 *
 * Example S3 object: { Key: 'sfx/aatrox/skin7/playsfx_q2_on_hitnormalplayer_2.ogg', LastModified: '2022-07-27T03:36:13.000Z', Size: 12345 }
 */
export const addAssets = async () => {
  const latestPatch = await dataDragonService.getLatestPatch()
  const ddragonChampions = await dataDragonService.getChampions(latestPatch)
  const skinsByChampion = await Object.entries(ddragonChampions).reduce<
    Promise<Record<string, ChampionDetailedInfo['skins']>>
  >(async (accProm, cur) => {
    const acc = await accProm
    const [key, { name }] = cur

    if (!name || name === 'Wukong') return acc
    const detailedInfo = await dataDragonService.getChampion(latestPatch, name)

    return {
      ...acc,
      [key.toLowerCase()]: detailedInfo.skins,
    }
  }, Promise.resolve({}))

  const insert = async (response: ListObjectsV2CommandOutput) => {
    if (!response.Contents) {
      logger.info('no objects found')

      return
    }

    const objects = response.Contents.map((c) => {
      const key = c.Key ?? ''
      const keyParts = key.split('/')
      const characterName = (() => {
        if (keyParts && keyParts.length >= 1) return keyParts[1]

        return ''
      })()

      return {
        key,
        characterName: characterName ?? '',
      }
    })

    for (const [key, value] of Object.entries(groupBy(objects, 'characterName'))) {
      let chromaNum = 1

      const assets = value.map(({ key, characterName }) => {
        const matches = key.match(/\W*(skin)\d*\W*/gi)
        const currentSkin = matches ? matches[0].replace(/\/*\.*/g, '') : ''
        const type = (() => {
          if (key.includes('model')) return 'model'
          if (key.includes('sfx')) return 'sfx'

          return 'vo'
        })()
        const name = (() => {
          const keyParts: string[] = key.split('/')
          const fileName = keyParts.at(keyParts.length - 1) ?? ''

          if (type === 'model') {
            const skins = skinsByChampion[characterName.toLowerCase()]
            const matchingSkin = skins?.find((s) => `skin${s.num}` === currentSkin)?.name
            if (matchingSkin) return matchingSkin
            chromaNum++

            return `Chroma ${chromaNum}`
          }

          // sfx or vo
          return capitalize(fileName.replace(/.ogg|playsfx_/gi, '').replace(/_/gi, ' '))
        })()

        return {
          type,
          uri: `s3://${BUCKET_NAME}/${key}`,
          url: `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`,
          name,
          skin: currentSkin,
        }
      })

      await prismaService.createAssets({ characterName: key, assets })
    }
  }

  await awsS3Service.performOnAllObjects(
    async (response) => {
      await insert(response)
    },
    {
      prefix: 'models',
    },
  )

  await awsS3Service.performOnAllObjects(
    async (response) => {
      await insert(response)
    },
    {
      prefix: 'sfx',
    },
  )

  await awsS3Service.performOnAllObjects(
    async (response) => {
      await insert(response)
    },
    {
      prefix: 'vo',
    },
  )
}

export default addAssets
