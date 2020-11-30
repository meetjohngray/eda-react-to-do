// const knex = require('knex')
// const config = require('./knexfile')
// const env = process.env.NODE_ENV || 'development'
// const connection = knex(config[env])

// module.exports = { getToDos, addToDo, deleteToDo, updateToDo }

const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = connection

function getToDos (db = connection) {
  return db('toDos').select()
}

function addToDo (newTask, db = connection) {
  return db('todos')
    .insert(
      {
        task: newTask.task,
        priority: newTask.priority,
        details: newTask.details,
        isComplete: false
      })
}

function deleteToDo( id,db = connection ) {
  return db('todos').where('id', id )
  .del()
}

function updateToDo ( id, updatedToDo, db = connection ) {
  console.log("updatedToDoDB")
  return db('todos').where('id', id)
    .update(
      {
        task: updatedToDo.task,
        priority: updatedToDo.priority,
        details: updatedToDo.details,
        isComplete: updatedToDo.isComplete
      })
}
