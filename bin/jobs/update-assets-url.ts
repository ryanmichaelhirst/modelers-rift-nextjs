import { findManyAssets, updateAsset } from '@utils/prisma'

export const updateAssetsUrl = async () => {
  const modelAssets = await findManyAssets()

  for (const asset of modelAssets) {
    await updateAsset({
      id: asset.id,
      data: {
        s3_url: asset.url,
      },
    })
  }
}

export default updateAssetsUrl
