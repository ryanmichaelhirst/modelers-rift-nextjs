import express from 'express'
import { apolloServer } from '../graphql'
import { getUsers } from '../prisma/queries'

export default (async () => {
  const app = express()

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.get('/api/getUsers', async (req, res) => {
    console.log('proxy request made to /api/getUser')
    const users = await getUsers()
    res.send(users)
  })

  app.listen(4000)
  console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
})()
