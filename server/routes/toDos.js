const express = require('express')
const router = express.Router()

const db = require('../db/connection')

router.get('/', (req, res) => {
  db.getToDos()
    .then(list => {
      res.json(list)
    })
    .catch(
      console.log('Nothing here.')
    )
})

router.post('/', (req, res) => {
  const newTask = req.body
  db.addToDo(newTask)
    .then((ids) => {
      newTask.id = ids[0]
      res.json(newTask)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

module.exports = router