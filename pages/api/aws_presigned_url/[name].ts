import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { initMiddleware } from '@lib/middleware'
import { BUCKET_NAME, s3 } from '@lib/s3'
import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Run cors
  await cors(req, res)

  const [folder, file] =
    typeof req.query.name === 'string' ? req.query.name.split('-') : req.query.name

  const key = `${folder}/model/${file}/default.glb`
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })
  // @ts-ignore
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  res.status(200).send(url)
}
