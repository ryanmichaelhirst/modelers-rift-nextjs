import { logger } from '@/lib/logger'
import { prismaService } from '@/lib/prisma'
import { awsS3Service } from 'bin/services/aws-s3-service'
import updateCharacterDisplayNames from './update-character-display-names'

/**
 * Average Runtime: 3.08s
 */
export const addCharacters = async () => {
  await awsS3Service.performOnAllObjects(
    async (response) => {
      if (!response.CommonPrefixes) {
        logger.info('no common prefixes found')

        return
      }

      const characters = response.CommonPrefixes?.map(
        (c) => c.Prefix?.replace(/models\//, '').replace(/\//, '') ?? '',
      )

      // create the characters if needed
      for (const character of characters) {
        await prismaService.findOrCreateCharacter(character)
      }
    },
    { prefix: 'models/', delimiter: '/' },
  )

  await updateCharacterDisplayNames()
}

export default addCharacters
