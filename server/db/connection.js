const knex = require('knex')
const config = require('./knexfile')
const env = process.env.NODE_ENV || 'development'
const connection = knex(config[env])

module.exports = { getToDos }

function getToDos (db = connection) {
  // console.log(db)
  return db('toDos').select()
}