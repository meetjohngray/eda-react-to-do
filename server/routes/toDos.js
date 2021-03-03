const express = require('express')
const router = express.Router()

const db = require('../db/todos')

router.get('/', (req, res) => {
  db.getToDos()
    .then(list => {
      res.json(list)
      return null
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.post('/', (req, res) => {
  const newTask = req.body
  // console.log('toDos.js 17', newTask)
  db.addToDo(newTask)
    .then((ids) => {
      newTask.id = ids[0]
      // console.log('toDos.js 21', newTask)
      res.status(201).json(newTask)
      return null
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  // Make sure the id is valid
  if (id < 1 || isNaN(id)) return res.sendStatus(400)
  db.deleteToDo(id)
    .then(taskDeleted => {
      res.json(taskDeleted)
      return null
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const updatedToDo = {
    id: Number(req.params.id),
    ...req.body
  }
  db.updateToDo(id, updatedToDo)
    // this returns the number of items changed
    .then(itemsChanged => {
      console.log('DB toDos.js line 49', itemsChanged)
      res.json(itemsChanged)
      return null
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

module.exports = router
