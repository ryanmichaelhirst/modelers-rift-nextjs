import { S3Client } from '@aws-sdk/client-s3'

export const BUCKET_NAME = 'league-of-legends-assets'

const accessKeyId = process.env.S3_AWS_ACCESS_KEY_ID ?? ''
const secretAccessKey = process.env.S3_AWS_SECRET_ACCESS_KEY ?? ''

export const s3 = new S3Client({
  region: 'us-east-1',
  useAccelerateEndpoint: true,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})
