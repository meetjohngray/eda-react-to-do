const knex = require('knex')
const config = require('./knexfile')
const env = process.env.NODE_ENV || 'development'
const connection = knex(config[env])

module.exports = { getToDos, addToDo }

function getToDos (db = connection) {
  // console.log(db)
  return db('toDos').select()
}

function addToDo (newTask,db = connection) {
  console.log(newTask)
  return db('todos')
    .insert(
      {
        task: newTask.task,
        priority: newTask.priority,
        details: newTask.details,
        isComplete: false
      })
}