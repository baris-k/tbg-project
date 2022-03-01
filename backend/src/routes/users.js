const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Match = require('../models/match')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}
  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.age) {
    query.age = req.query.age
  }

  res.send(await User.find(query))
})

router.get('/initialize', async (req, res) => {
  const baris = await User.create({ name: 'Baris', age: 24 })
  const quaresma = await User.create({ name: 'Quaresma', age: 38 })
  const sema = await User.create({ name: 'Sema', age: 25 })

  const atiba = await User.create({ name: 'Atiba', age: 38 })
  atiba.bio = 'Im an Eagle till the end 🦅'

  const aachenMatch = await Match.create({ filename: 'Aachen' })
  const berlinMatch = await Match.create({ filename: 'Berlin' })

  await atiba.addMatch(aachenMatch)
  await quaresma.addMatch(aachenMatch)
  await baris.addMatch(berlinMatch)

  await quaresma.likeMatch(berlinMatch)
  await sema.likeMatch(aachenMatch)

  console.log(sema)
  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router

/* const User = require('../models/user')
const Match = require('../models/match')

const baris = new User('Baris', 24)
const quaresma = new User('Quaresma', 28)
const firstMatch = new Match('Match1')
const secondMatch = new Match('Match2')

baris.addMatches(firstMatch)
baris.addMatches(secondMatch)
baris.bio = 'Amateur on paper, pro in the game'

quaresma.likeMatch(firstMatch)

const users = [baris, quaresma] */
