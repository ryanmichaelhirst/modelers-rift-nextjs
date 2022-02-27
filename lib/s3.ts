import { S3Client } from '@aws-sdk/client-s3'

export const BUCKET_NAME = 'league-of-legends-assets'

export const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY || '',
  },
})
