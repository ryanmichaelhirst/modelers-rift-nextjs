import { dataDragonService } from '@lib/ddragon'
import { logger } from '@lib/logger'
import { prismaService } from '@lib/prisma'

export default async () => {
  const champions = await prismaService.client.character.findMany({
    where: {
      type: {
        equals: 'champion',
      },
    },
  })

  for (const champion of champions) {
    const displayName = dataDragonService.getDisplayName(champion.name)

    const result = await prismaService.updateCharacter({
      id: champion.id,
      data: {
        displayName,
      },
    })

    logger.info(result)
  }
}
