const mongoose = require('mongoose')

let objectId = mongoose.Schema.Types.ObjectId

let category = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  creator: { type: objectId, ref: 'User', required: true },
  products: [{ type: objectId, ref: 'Product' }]
})

mongoose.model('Category', category)

module.exports = mongoose.model('Category')