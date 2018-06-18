const mongoose = require('mongoose')

let car = new mongoose.Schema({
  marc: { type: String, required: true },
  model: { type: String, required: true },
  year: {
    type: Number,
    min: 1900,
    max: 2018
  },
  price: {
    type: Number,
    min: 0,
    max: Number.MAX_VALUE,
    default: 0
  },
  image: { type: String, required: true },
  rented: { type: Boolean, required: true, default: false },
  creationDate: { type: Date, required: true }
})

mongoose.model('Car', car)

module.exports = mongoose.model('Car')