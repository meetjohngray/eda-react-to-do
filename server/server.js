// const path = require('path')
const express = require("express")

const server = express()
const toDoRoutes = require('./routes/toDos')

server.use(express.json())
server.use(express.static("public"))
server.use('/v1/tasks', toDoRoutes)

module.exports = server
