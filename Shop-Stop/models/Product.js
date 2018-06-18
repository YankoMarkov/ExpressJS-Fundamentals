const mongoose = require('mongoose')

let objectId = mongoose.Schema.Types.ObjectId

let product = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: {
    type: Number,
    min: 0,
    max: Number.MAX_VALUE,
    default: 0
  },
  image: { type: String },
  creator: { type: objectId, ref: 'User', required: true },
  buyer: { type: objectId, ref: 'User' },
  category: { type: objectId, ref: 'Category', required: true }
})

mongoose.model('Product', product)

module.exports = mongoose.model('Product')