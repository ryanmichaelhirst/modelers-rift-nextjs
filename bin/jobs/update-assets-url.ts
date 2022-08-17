import { prismaService } from '@lib/prisma'

export const updateAssetsUrl = async () => {
  const modelAssets = await prismaService.findManyAssets()

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
