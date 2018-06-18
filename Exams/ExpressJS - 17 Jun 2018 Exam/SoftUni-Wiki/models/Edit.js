const mongoose = require('mongoose')

let objectId = mongoose.Schema.Types.ObjectId

let edit = new mongoose.Schema({
  author: { type: objectId, ref: 'User', required: true },
  creationDate: { type: Date, default: Date.now },
  content: { type: String, required: true },
  article: { type: objectId, ref: 'Article', required: true }
})

mongoose.model('Edit', edit)

module.exports = mongoose.model('Edit')