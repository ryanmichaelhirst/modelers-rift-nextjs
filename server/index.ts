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
    const key = awsChampionObject.Contents.find((c) => c.Key).Key

    const firstModel = await getAwsObject({ key })

    res.send({ models, glbs: awsChampionObject.Contents })
  })

  app.get('/api/getAwsObject/:key', async (req, res) => {
    console.log('server /api/getAwsObject/:key')

    const { key } = req.params
    const awsObject = await getAwsObject({ key })

    res.send(awsObject)
  })

  app.listen(4000)

  console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
})()
