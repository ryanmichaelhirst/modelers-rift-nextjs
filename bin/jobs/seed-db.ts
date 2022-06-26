import { createAssets, findOrCreateCharacter } from '@utils/prisma'
import { awsS3Service } from 'bin/services/aws-s3-service'
import groupBy from 'lodash.groupby'
import { logger } from 'logger'
import util from 'util'

util.inspect.defaultOptions.maxArrayLength = null

export const seedDb = async () => {
  await awsS3Service.performOnAllObjects(async (response) => {
    logger.info(response)

    if (!response.Contents) {
      logger.info('contents for request do not exist')

      return
    }

    const characters = response.Contents?.map((c) => {
      const characterMatches = c.Key?.match(/^[^\/]*/gi)

      return characterMatches ? characterMatches[0] : ''
    })

    // create the characters if needed
    for (const character of characters) {
      await findOrCreateCharacter(character)
    }
  })

  await awsS3Service.performOnAllObjects(async (response) => {
    logger.info(response)

    if (!response.Contents) {
      logger.info('contents for request do not exist')

      return
    }

    const objects = response.Contents.map((c) => {
      const key = c.Key ?? ''
      const charcterMatches = key.match(/^[^\/]*/gi)

      return {
        key,
        characterName: charcterMatches ? charcterMatches[0] : '',
      }
    })

    for (const [key, value] of Object.entries(groupBy(objects, 'characterName'))) {
      const assets = value.map(({ key }) => {
        // 'aatrox/sfx/skin7/playsfx_q2_on_hitnormalplayer_2.ogg
        const uri = `s3://league-of-legends-assets/${key}`
        const type = (() => {
          if (key.includes('model')) return 'model'
          if (key.includes('sfx')) return 'sfx'

          return 'vo'
        })()
        const name = key.split('/')[0] ?? ''
        const matches = key.match(/\W*(skin)\d*\W*/gi)
        const skin = matches ? matches[0].replace(/\/*\.*/g, '') : ''

        return {
          type,
          uri,
          name,
          skin,
        }
      })

      await createAssets({ characterName: key, assets })
    }
  })
}

export default seedDb
