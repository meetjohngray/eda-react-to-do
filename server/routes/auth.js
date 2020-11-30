const { applyAuthRoutes } = require('authenticare/server')

const express = require('express')

const {
  userExists,
  getUserByName,
  createUser
} = require('../db/users')

const router = express.Router()

applyAuthRoutes(router, {
  userExists,
  getUserByName,
  createUser
})

module.exports = router
