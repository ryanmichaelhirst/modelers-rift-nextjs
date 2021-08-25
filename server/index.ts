import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const config = require(path.join(__dirname, '../webpack.config.js'))
const compiler = webpack(config)
const app = express()

app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler, { log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000 }))

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist', 'index.html'))
// })

app.listen(4000)
