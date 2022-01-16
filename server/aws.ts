import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'

export const BUCKET_NAME = 'league-of-legends-assets'

export const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export const getAwsChampionObject = async ({ name }: { name: string }) => {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: name,
  })

  const response = await s3.send(command)
  console.log(`got aws champion object ${name}`)

  return response
}

export const getAwsObject = async ({ key }: { key: string }) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  const response = await s3.send(command)
  console.log(`got aws object ${key}`)

  return response
}
