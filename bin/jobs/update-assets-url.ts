import { prismaService } from '@/lib/prisma'

export const updateAssetsUrl = async () => {
  const modelAssets = await prismaService.findManyAssets({
    where: {
      type: {
        equals: 'sfx',
      },
    },
  })

  for (const asset of modelAssets) {
    await prismaService.updateAsset({
      id: asset.id,
      data: {
        s3_url: asset.url,
      },
    })
  }
}

export default updateAssetsUrl
