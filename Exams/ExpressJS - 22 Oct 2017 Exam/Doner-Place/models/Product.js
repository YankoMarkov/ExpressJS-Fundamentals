const mongoose = require('mongoose')

let product = new mongoose.Schema({
  name: { type: String },
  category: {
    type: String,
    enum: {
      values: ['chicken', 'lamb', 'beef']
    }
  },
  size: {
    type: Number,
    min: 17,
    max: 24,
    required: true
  },
  image: { type: String, required: true },
  toppings: { type: [String], default: [] }
})

mongoose.model('Product', product)

module.exports = mongoose.model('Product')