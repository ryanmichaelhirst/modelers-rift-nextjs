import { prisma, updateCharacter } from '../../prisma/utils'
import { getDisplayName } from '../utils/index'

export default async () => {
  const champions = await prisma.character.findMany({
    where: {
      type: {
        equals: 'champion',
      },
    },
  })

  for (const champion of champions) {
    const displayName = getDisplayName(champion.name)

    await updateCharacter({
      id: champion.id,
      data: {
        displayName,
      },
    })
  }
}
