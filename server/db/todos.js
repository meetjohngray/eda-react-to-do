const connection = require('./connection')

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

function deleteToDo (id, db = connection) {
  return db('todos').where('id', id)
    .del()
}

function updateToDo (id, updatedToDo, db = connection) {
  return db('todos').where('id', id)
    .update(
      {
        task: updatedToDo.task,
        priority: updatedToDo.priority,
        details: updatedToDo.details,
        isComplete: updatedToDo.isComplete
      })
}

module.exports = { getToDos, addToDo, deleteToDo, updateToDo }
