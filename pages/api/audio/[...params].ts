import { GetObjectCommand } from '@aws-sdk/client-s3'
import { BUCKET_NAME, s3 } from '@lib/s3'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // /aatrox/vo/skin0/move_order.ogg
  const [champion, type, skin, file] = req.query.params
  const key = `${champion}/${type}/${skin}/${file}`
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })
  const { Body, ...response } = await s3.send(command)

  res.status(200).send(Body)
}
