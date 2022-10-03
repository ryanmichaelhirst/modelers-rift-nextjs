import { dataDragonService } from '@lib/ddragon'
import { logger } from '@lib/logger'

export default async () => {
  const patches = await dataDragonService.getPatches()

  logger.info(patches)
}
