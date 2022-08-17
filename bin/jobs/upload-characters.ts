import { logger } from '@lib/logger'
import { prismaService } from '@lib/prisma'
import { awsS3Service } from 'bin/services/aws-s3-service'

export const uploadCharacters = async () => {
  await awsS3Service.performOnAllObjects(
    async (response) => {
      if (!response.CommonPrefixes) {
        logger.info('no common prefixes found')

        return
      }

      const characters = response.CommonPrefixes?.map((c) => {
        const characterMatches = c.Prefix?.match(/^[^\/]*/gi)

        return characterMatches ? characterMatches[0] : ''
      })

      // create the characters if needed
      for (const character of characters) {
        await prismaService.findOrCreateCharacter(character)
      }
    },
    { delimiter: '/' },
  )
}

export default uploadCharacters
