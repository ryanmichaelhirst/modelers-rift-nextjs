import { findOrCreateCharacter } from '@utils/prisma'
import { awsS3Service } from 'bin/services/aws-s3-service'
import { logger } from 'logger'

export const uploadCharacters = async () => {
  await awsS3Service.performOnAllObjects(async (response) => {
    logger.info(response)

    if (!response.CommonPrefixes) {
      logger.info('not common prefixes')

      return
    }

    const characters = response.CommonPrefixes?.map((c) => {
      const characterMatches = c.Prefix?.match(/^[^\/]*/gi)

      return characterMatches ? characterMatches[0] : ''
    })
    logger.info(characters)

    // create the characters if needed
    for (const character of characters) {
      await findOrCreateCharacter(character)
    }
  }, '/')
}

export default uploadCharacters
