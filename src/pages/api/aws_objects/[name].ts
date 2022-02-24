import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'

export const BUCKET_NAME = 'league-of-legends-assets'

export const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export default async (req, res) => {
  // name comes in as "aatrox-skin0"
  const [folder, file] = req.query.name.split('-')
  const key = `${folder}/model/${file}/default.glb`
  console.log(key)
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })
  const { Body, ...response } = await s3.send(command)

  res.status(200).send(Body)
}
