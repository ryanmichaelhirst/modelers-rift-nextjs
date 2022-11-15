import { BUCKET_NAME, s3 } from '@/lib/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

// nextjs example
// https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD', 'OPTIONS'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

// previous implementation
// https://github.com/rmbh4211995/league-of-legends-champions/pull/1/files#diff-436932cb510af2021cba101c422550c0afa7a2cb2814f93669e1b339eee669ab
// https://github.com/rmbh4211995/league-of-legends-champions/blob/d93963c363fbdcf0919fbe8cb44aa554f713f854/pages/api/aws_presigned_url/%5Bname%5D.ts
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Run the middleware
  await runMiddleware(req, res, cors)

  const Key = req.body.Key
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key,
  })

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  res.status(200).send(url)
}
