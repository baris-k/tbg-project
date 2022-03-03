const express = require('express')

const router = express.Router()
const Match = require('../models/match')

/* POST create a photo */
router.post('/', async (req, res) => {
  const matchToCreate = {
    filename: req.body.filename,
  }

  const createdMatch = await Match.create(matchToCreate)
  res.send(createdMatch)
})

module.exports = router
