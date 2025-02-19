import { dataDragonService } from '@/lib/ddragon'
import { prismaService } from '@/lib/prisma'

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
      where: {
        id: champion.id,
      },
      data: {
        displayName,
      },
    })
  }
}
