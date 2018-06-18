const mongoose = require('mongoose')

let objectId = mongoose.Schema.Types.ObjectId

let genre = new mongoose.Schema({
  genreName: { type: String, required: true },
  memeList: [{ type: objectId, ref: 'Meme' }]
})

mongoose.model('Genre', genre)

module.exports = mongoose.model('Genre')