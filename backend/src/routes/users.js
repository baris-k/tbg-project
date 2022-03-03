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

/* POST create a user */
router.post('/', async (req, res) => {
  const userToCreate = {
    name: req.body.name,
    age: req.body.age,
  }

  const createdUser = await User.create(userToCreate)
  res.send(createdUser)
})

async function createMatch(filename) {
  const match = await Match.create({ filename })
  return match.save()
}
router.get('/initialize', async (req, res) => {
  const quaresma = new User({ name: 'Quaresma', age: 32, email: 'sinem@sinem.com' })
  await quaresma.setPassword('test')
  await quaresma.save()

  const baris = new User({ name: 'baris', age: 32, email: 'rosa@rosa.com' })
  await baris.setPassword('test')
  await baris.save()

  const atiba = new User({ name: 'atiba', age: 32, email: 'carlos@carlos.com' })
  await atiba.setPassword('test')
  await atiba.save()

  const sema = new User({ name: 'sema', age: 32, email: 'carlos@carlos.com' })
  await sema.setPassword('test')
  await sema.save()

  const aachenMatch = await createMatch('Aachen')
  const berlinMatch = await createMatch('Berlin')

  await atiba.addMatch(aachenMatch)
  // await quaresma.addMatch(aachenMatch)
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
