import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const config = require(path.join(__dirname, '../webpack.config.js'))
const compiler = webpack(config)
const app = express()

app.use(webpackDevMiddleware(compiler, config.devServer))
app.use(webpackHotMiddleware(compiler))
app.use(express.static(path.join(__dirname, '../build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

app.listen(4000)
