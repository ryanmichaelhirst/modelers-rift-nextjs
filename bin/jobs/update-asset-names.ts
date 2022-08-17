import { dataDragonService } from '@lib/ddragon'
import { logger } from '@lib/logger'
import { prismaService } from '@lib/prisma'

export default async () => {
  const assets = await prismaService.client.asset.findMany()
  const characters = await prismaService.client.character.findMany({
    where: {
      type: {
        equals: 'champion',
      },
    },
  })
  const championSkins = await Promise.all(
    characters.map(async (c) => {
      return { skins: (await dataDragonService.getChampion('12.12.1', c.name)).skins, name: c.name }
    }),
  )

  for (const asset of assets) {
    const pieces = asset.url?.split('/') ?? []

    const name = await (async () => {
      if (asset.type === 'model') {
        const character = characters.find((c) => c.id === asset.characterId)
        const skins = championSkins.find((c) => c.name === character?.name)?.skins

        return skins?.find((s) => s.num?.toString() === asset.skin.replace(/skin/g, ''))
      } else {
        const words = pieces[pieces.length - 1].replace('.ogg', '').replace(/_/g, ' ').split(' ')

        return words.map((w) => `${w[0].toUpperCase()}${w.substring(1)}`).join(' ')
      }
    })()

    // some return undefined
    if (!name) continue
    // some return objects for chromas
    if (typeof name !== 'string') continue

    const result = await prismaService.updateAsset({
      id: asset.id,
      data: {
        name,
      },
    })

    logger.info(result)
  }
}
