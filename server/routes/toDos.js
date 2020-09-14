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

module.exports = router