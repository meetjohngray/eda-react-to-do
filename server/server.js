const path = require('path')
const express = require('express')

const toDoRoutes = require('./routes/toDos')
const authRoutes = require('./routes/auth')

const server = express()

server.use(express.json())
server.use(express.static('public'))

server.use('/api/v1', authRoutes)
server.use('/v1/tasks', toDoRoutes)
// This allows us to use React Browser Router for our client side routes
server.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = server
