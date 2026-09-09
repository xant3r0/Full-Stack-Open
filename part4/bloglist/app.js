const express = require('express')
const app = express()
const dns = require('node:dns')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const blogsRouter = require('./controllers/blogs.js')
const middlewares = require('./utils/middlewares.js')

dns.setServers(['8.8.8.8'])

mongoose.connect(config.MONGO_DB_URL, { family:4 })

app.use(express.json()).use('/api/blogs',blogsRouter).use(middlewares.errorHandler)

module.exports = app

