const mongoose = require('mongoose')

let objectId = mongoose.Schema.Types.ObjectId

let order = new mongoose.Schema({
  creator: { type: objectId, ref: 'User', required: true },
  product: { type: objectId, ref: 'Product', required: true },
  toppings: { type: [String] },
  orderDate: { type: Date, default: Date.now },
  orderStatus: {
    type: String,
    enum: {
      values: ['Pending', 'In progress', 'In transit', 'Delivered']
    },
    default: 'Pending'
  }
})

mongoose.model('Order', order)

module.exports = mongoose.model('Order')