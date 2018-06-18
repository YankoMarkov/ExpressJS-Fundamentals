const mongoose = require('mongoose')

module.exports = (config) => {
  mongoose.connect(config.dbPath)
  console.log('Data is On')
}