import { BUCKET_NAME, s3 } from '@/lib/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  const { key } = body

  switch (method) {
    case 'POST':
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })
      const { Body, ...rest } = await s3.send(command)

      if (!Body) {
        res.status(401).json({ error: 'Could not find s3 object' })
      }

      res.send(Body)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
