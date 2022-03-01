const mongoose = require('mongoose')
const autopopulate = require ('mongoose-autopopulate')


const matchSchema = new mongoose.Schema({
  filename: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
      autopopulate: true,

    },
  ],
})
matchSchema.plugin(autopopulate)
module.exports = mongoose.model('Match', matchSchema)


/* class Match {
  constructor(filename) {
      this.filename = filename;
      this.likedBy = [];
  }
}

module.exports = Match */