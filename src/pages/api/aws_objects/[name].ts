import { GetObjectCommand } from '@aws-sdk/client-s3'
import { BUCKET_NAME, s3 } from '@lib/s3'
import type { NextApiRequest, NextApiResponse } from 'next'

// TODO: this needs to be moved to express server, response payload is too big for nextjs
// -----
// API response for /api/aws_objects/aatrox-skin0 exceeds 4MB. This will cause the request to fail in a future version.
// https://nextjs.org/docs/messages/api-routes-body-size-limit
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // name = "aatrox-skin0"
  const [folder, file] =
    typeof req.query.name === 'string' ? req.query.name.split('-') : req.query.name
  const key = `${folder}/model/${file}/default.glb`
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })
  const { Body, ...response } = await s3.send(command)

  res.status(200).send(Body)
}
