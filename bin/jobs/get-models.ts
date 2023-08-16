import { awsS3Service } from '@/bin/services/aws-s3-service'
import { logger } from '@/lib/logger'

export const getModels = async () => {
  try {
    const models = await awsS3Service.listObjects({ prefix: 'models' })

    logger.info(models)
  } catch (err) {
    logger.info(err)
  }
}

export default getModels
