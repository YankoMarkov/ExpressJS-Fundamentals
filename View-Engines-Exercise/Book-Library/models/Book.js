const mongoose = require('mongoose')

let book = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  createDate: { type: Date, required: true }
})

mongoose.model('Book', book)

module.exports = mongoose.model('Book')