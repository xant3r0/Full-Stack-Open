const express = require('express')
const app = express()
const dns = require('node:dns')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const middlewares = require('./utils/middlewares.js')
const loginRouter = require('./controllers/login.js')

dns.setServers(['8.8.8.8'])

mongoose.connect(config.MONGO_DB_URL, { family:4 })

app
    .use(express.json())
    .use('/api/blogs', blogsRouter)
    .use('/api/users', usersRouter)
    .use('/api/login', loginRouter)
    .use(middlewares.errorHandler)

module.exports = app

