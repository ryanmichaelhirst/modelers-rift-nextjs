import dotenv from 'dotenv'
import express from 'express'
import { Readable } from 'stream'
import { apolloServer } from '../graphql/resolvers/index'
import { getAwsObject } from './aws'

dotenv.config()

export default (async () => {
  const app = express()

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.get('/api/getAwsObject/:folder/:file', async (req, res) => {
    console.debug('server /api/getAwsObject/:folder/:file')

    const key = `${req.params.folder}/model/${req.params.file}/default.glb`
    const { Body, ...response } = await getAwsObject({ key })

    if (Body instanceof Readable) {
      console.debug('body is type readable')
      Body.pipe(res)
    } else if (Body instanceof Blob) {
      console.debug('body is type blob')
      res.status(501).send('blob type is unsupported')
    } else {
      res.status(501).send('error reading body from aws')
    }
  })

  app.get('/api/getAudio/:champion/:type/:skin/:file', async (req, res) => {
    console.debug('server /api/audio/:filePath')

    const { champion, type, skin, file } = req.params
    const key = `${champion}/${type}/${skin}/${file}`
    const { Body, ...response } = await getAwsObject({ key })

    if (Body instanceof Readable) {
      console.debug('body is type readable')
      Body.pipe(res)
    } else if (Body instanceof Blob) {
      console.debug('body is type blob')
      res.status(501).send('blob type is unsupported')
    } else {
      res.status(501).send('error reading body from aws')
    }
  })

  app.listen(4000)

  console.debug(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
})()
