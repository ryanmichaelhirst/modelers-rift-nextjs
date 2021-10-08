import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { apolloServer } from '../graphql'
import { getUsers } from '../prisma/queries'

export default (async () => {
  const config = require(path.join(__dirname, '../webpack.config.ts'))
  const compiler = webpack(config)
  const app = express()

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }))
  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    }),
  )

  app.get('/api/getUsers', async (req, res) => {
    console.log('proxy request made to /api/getUser')
    const users = await getUsers()
    res.send(users)
  })

  app.listen(4000)
  console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
})()
