import { awsS3Service } from 'bin/services/aws-s3-service'
import { logger } from 'logger'
import util from 'util'

util.inspect.defaultOptions.maxArrayLength = null

// TODO: complete function
export const seedDb = async () => {
  await awsS3Service.performOnAllObjects(async (response) => {
    logger.info(response)

    if (!response.Contents) {
      logger.info('contents for request do not exist')

      return
    }

    const assets = response.Contents.map((c) => {
      // 'aatrox/sfx/skin7/playsfx_q2_on_hitnormalplayer_2.ogg
      const objectKey = c.Key
      const uri = `s3://league-of-legends-assets/${objectKey}`
      const type = (() => {
        if (objectKey?.includes('model')) return 'model'
        if (objectKey?.includes('sfx')) return 'sfx'

        return 'vo'
      })()
      const name = c.Key?.split('/')[0]
      const matches = objectKey?.match(/\W*(skin)\d*\W*/gi)
      const skin = matches ? matches[0].replace(/\/*\.*/g, '') : ''

      return {
        type,
        uri,
        name,
        skin,
      }
    })
  })
}

export default seedDb
