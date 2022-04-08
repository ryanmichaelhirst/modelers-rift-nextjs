import prisma from '@lib/prisma'
import { getDisplayName } from '@utils/index'
import { updateCharacter } from '@utils/prisma'

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
