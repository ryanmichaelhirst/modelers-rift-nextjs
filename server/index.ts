import express from 'express'
import { Readable } from 'stream'
import { apolloServer } from '../graphql/resolvers/index'
import { getChampionAssets, getChampions, getUsers } from '../prisma/queries'
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

  app.get('/api/getChampionAssets/:name', async (req, res) => {
    console.log('server /api/getChampionAssets/:name')

    const { name } = req.params
    const models = await getChampionAssets({
      name,
    })
    const awsChampionObject = await getAwsChampionObject({ name })

    res.send({ models, glbs: awsChampionObject.Contents })
  })

  app.get('/api/getAwsObject/:folder/:file', async (req, res) => {
    console.log('server /api/getAwsObject/:folder/:file')

    const key = `${req.params.folder}/model/${req.params.file}/default.glb`
    const { Body, ...response } = await getAwsObject({ key })

    if (Body instanceof Readable) {
      console.log('body is type readable')
      Body.pipe(res)
      // try {
      //   Body.on('data', (data) => res.write(data))
      //   Body.on('end', () => res.status(200).send())
      // } catch (err) {
      //   res.status(500).send('error writing stream from aws')
      // }
    } else if (Body instanceof Blob) {
      console.log('body is type blob')
    } else {
      res.status(501).send('error reading body from aws')
    }
  })

  app.listen(4000)

  console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
})()
