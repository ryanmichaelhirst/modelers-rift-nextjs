import fs from 'fs'
import path from 'path'

export const JobsResolver = (parent, args, ctx) => {
  const jobDir = path.join(process.env.APP_HOME, 'bin/jobs')

  return new Promise<{ name: string }[]>((resolve) => {
    fs.readdir(jobDir, (err, files) => {
      if (err) {
        resolve([{ name: 'No jobs created' }])
      }

      const jobs = files.map((file) => ({
        name: path.parse(file).name,
      }))
      resolve(jobs)
    })
  })
}

export default JobsResolver
