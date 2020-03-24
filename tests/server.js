/**
 * Temp solution to get around issue where parcel
 * des not serve index.html at root
 * https://github.com/parcel-bundler/parcel/issues/1315
 */
const Bundler = require('parcel-bundler')
const express = require('express')

const options = {
  'watch': true
}

const bundler = new Bundler([
  'examples/index.html',
  'examples/basic.html',
  'examples/programmatic.html'
], options)

const app = express()

app.get('/', (req, res, next) => {
  req.url = '/index.html'
  app._router.handle(req, res, next)
})

app.use(bundler.middleware())

const port = Number(process.env.PORT || 1234)
app.listen(port)
console.log(`listening at http://localhost:${ port }`)
