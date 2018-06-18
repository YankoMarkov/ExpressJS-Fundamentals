const mongoose = require('mongoose')

let meme = new mongoose.Schema({
  memeName: { type: String, required: true },
  memePath: { type: String, required: true },
  memeDescription: { type: String },
  dateOfCreation: { type: Date, default: Date.now() }
})

mongoose.model('Meme', meme)

module.exports = mongoose.model('Meme')