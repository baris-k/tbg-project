const express = require('express')

const router = express.Router()
const User = require('../models/user')
const Match = require('../models/match')

const baris = new User('Baris', 24)
const quaresma = new User('Quaresma', 28)
const firstMatch = new Match('Match1')
const secondMatch = new Match('Match2')

baris.addMatches(firstMatch)
baris.addMatches(secondMatch)
baris.bio = 'Amateur on paper, pro in the game'

quaresma.likeMatch(firstMatch)

const users = [baris, quaresma]

/* GET users listing. */
router.get('/', (req, res) => {
  let result = users

  if (req.query.name) {
    result = users.filter(user => user.name == req.query.name)
  }

  res.send(result)
})
router.get('/:userId', (req, res) => {
  const user = users[req.params.userId]

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router
