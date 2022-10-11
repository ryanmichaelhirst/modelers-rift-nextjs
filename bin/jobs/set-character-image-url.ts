import { dataDragonService } from '@/lib/ddragon'
import { logger } from '@/lib/logger'
import { prismaService } from '@/lib/prisma'

export default async () => {
  const latestPatch = dataDragonService.getLatestPatch()
  const champions = await dataDragonService.getChampions(latestPatch)

  for (const [key, value] of Object.entries(champions)) {
    // update charater based on character.name
    // i.e. key === 'aatrox'
    try {
      const result = await prismaService.updateCharacter({
        where: {
          name: key,
        },
        data: {
          imageUrl: value.square_asset,
        },
      })
      logger.info(result)
    } catch (err) {
      logger.info(`character name not found: ${key}`)
    }
  }
}
