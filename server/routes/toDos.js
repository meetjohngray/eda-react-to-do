const express = require('express')
const router = express.Router()

const db = require('../db/connection')

router.get('/', (req, res) => {
  db.getToDos()
    .then(list => {
      console.log(list)
      res.json(list)
      
    })
    .catch(
      console.log('Nothing here.')
    )
})

module.exports = router