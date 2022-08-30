import { createIssue } from '@lib/github'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  const { title, body: issueBody, labels } = body

  switch (method) {
    case 'POST':
      // Update or create data in your database
      const { data: issue, status } = await createIssue({
        title,
        body: issueBody,
        labels,
      })

      if (status !== 201) {
        res.status(401).json({ error: 'An error occurred and the issue was not created' })

        return
      }

      res.status(200).json({ issue, status })
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
