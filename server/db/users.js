const connection = require('./connection')
const { generateHash } = require('authenticare/server')

module.exports = {
  createUser,
  userExists,
  getUserByName
}

function createUser (user, db = connection) {
  const { username, password } = user
  return userExists(username, db)
    .then(exists => {
      if (exists) {
        return (new Error('User exists'))
      }
      return null
    })
    .then(() => generateHash(password))
    .then(passwordHash => {
      return db('users').insert({ username: username, hash: passwordHash })
    })
}

function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getUserByName (username, db = connection) {
  return db('users')
    .select()
    .where('username', username)
    .first()
}
