const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bio: String,
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
      autopopulate: true,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
    },
  ],
})

class User {
  async addMatch(match) {
    this.matches.push(match)
    await this.save()
  }

  async likeMatch(match) {
    this.likes.push(match)
    match.likedBy.push(this)

    await match.save()
    await this.save()
  }
}
userSchema.loadClass(User)
userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})

module.exports = mongoose.model('User', userSchema)

/* class User {
  constructor(name, age) {
    this.name = name
    this.age = age
    this.bio = []
    this.matches = []
    this.likes = []
  }

  addMatches(match) {
    this.matches.push(match.filename)
  }

  likeMatch(match) {
    this.likes.push(match.filename)
    match.likedBy.push(this.name)
  }

  get profile() {
    return (
      `${this.name} (${this.age})` +
      `Bio: ${this.bio}` +
      `Matches (${this.matches.length})` +
      `${this.matches
        .map(
          match => `${match.filename}
            ${match.likedBy.map(user => user.name).join(', ')}`
        )
        .join('/n')}`
    )
  }
}

module.exports = User */
