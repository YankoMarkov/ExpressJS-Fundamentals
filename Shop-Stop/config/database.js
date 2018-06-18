const mongoose = require('mongoose')

const User = require('../models/User')

module.exports = (config) => {
  mongoose.connect(config.dbPath)

  const db = mongoose.connection
  db.once('open', err => {
    if (err) throw err
    User.seedAdminUser().then(() => {
      console.log('DB is on')
    }).catch(err => {
      console.log(err)
    })
  })
  db.on('error', err => {
    console.log(err)
  })
}