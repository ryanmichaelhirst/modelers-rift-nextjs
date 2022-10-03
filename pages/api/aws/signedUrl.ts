import { BUCKET_NAME, s3 } from '@/lib/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
type Middleware = (req: NextApiRequest, res: NextApiResponse, result: (res: any) => any) => any

export const initMiddleware = (middleware: Middleware) => {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }

        return resolve(result)
      })
    })
}

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)

// previous implementation @ https://github.com/rmbh4211995/league-of-legends-champions/pull/1/files#diff-436932cb510af2021cba101c422550c0afa7a2cb2814f93669e1b339eee669ab
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Run cors
  // await cors(req, res)

  const Key = req.body.Key
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key,
  })

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  res.status(200).send(url)
}
