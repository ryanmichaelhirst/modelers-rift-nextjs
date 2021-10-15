import express from 'express'
import { apolloServer } from '../graphql'
import { getChampionModels, getChampions, getUsers } from '../prisma/queries'
import { getAwsChampionObject, getAwsObject } from './aws'

export default (async () => {
  const app = express()

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.get('/api/getUsers', async (req, res) => {
    console.log('proxy request made to /api/getUser')

    const users = await getUsers()

    res.send(users)
  })

  app.get('/api/getChampions', async (req, res) => {
    console.log('proxy request made to /api/getChampions')

    const champions = await getChampions()

    res.send(champions)
  })

  app.get('/api/getChampionModels/:name', async (req, res) => {
    console.log('server /api/getChampionModels/:name')

    const { name } = req.params
    const models = await getChampionModels({
      name,
    })
    const awsChampionObject = await getAwsChampionObject({ name })

    res.send({ models, glbs: awsChampionObject.Contents })
  })

  app.get('/api/getAwsObject/:folder/:file', async (req, res) => {
    console.log('server /api/getAwsObject/:folder/:file')

    const key = `${req.params.folder}/${req.params.file}`
    const response = await getAwsObject({ key })
    const chunks: Buffer[] = []

    const binaryStr = await new Promise<any>((resolve, reject) => {
      try {
        // @ts-ignore
        response.Body.on('data', (chunk: Buffer) => chunks.push(chunk))
        // @ts-ignore
        response.Body.on('end', () => resolve(chunks.join('')))
      } catch (err) {
        reject(err)
      }
    })

    res.send({ test: '' })
  })

  app.listen(4000)

  console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
})()
