const mongoose = require('mongoose')

let objectId = mongoose.Schema.Types.ObjectId

let keychain = new mongoose.Schema({
  car: { type: objectId, ref: 'Car', required: true },
  renter: { type: objectId, ref: 'User', required: true },
  rentDate: { type: Date, required: true },
  days: { type: Number, required: true }
})

mongoose.model('Keychain', keychain)

module.exports = mongoose.model('Keychain')