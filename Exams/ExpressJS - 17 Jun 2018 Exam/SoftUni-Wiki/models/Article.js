const mongoose = require('mongoose')

let objectId = mongoose.Schema.Types.ObjectId

let article = new mongoose.Schema({
  title: { type: String, required: true },
  lockedStatus: { type: Boolean, default: false },
  edits: [{ type: objectId, ref: 'Edit' }]
})

mongoose.model('Article', article)

module.exports = mongoose.model('Article')