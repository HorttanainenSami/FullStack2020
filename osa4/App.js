const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
