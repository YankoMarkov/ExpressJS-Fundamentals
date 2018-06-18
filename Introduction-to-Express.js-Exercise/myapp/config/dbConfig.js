const mongoose = require('mongoose')
const path = 'mongodb://localhost/myapp'

const Genre = require('../models/Genre')

module.exports = (() => {
  mongoose.connect(path)
  const db = mongoose.connection
  db.once('open', (err) => {
    if (err) return res.status(500).send(err.message)
    Genre.find().then(genres => {
      if (genres.length > 0) return
      Genre.create({ genreName: 'RickAndMorty'})
    })
  }).then(() => {
    console.log('DB is on')
  })
})()