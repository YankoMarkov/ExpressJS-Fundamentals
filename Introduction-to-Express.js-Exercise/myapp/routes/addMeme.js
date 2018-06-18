var express = require('express');
var router = express.Router();
const shortid = require('shortid')

const Genre = require('../models/Genre')
const Meme = require('../models/Meme')

/* GET addMeme listing. */
router
  .get('/', function (req, res, next) {
    Genre.find({}).then(genres => {
      res.render('addMeme', { genres })
    })
  })
  .post('/', (req, res, next) => {
    let file = req.files.meme
    console.log(req)
    let fileName = shortid.generate()
    let fileExtension = file.name.split('.').pop()
    let memePath = `/memeStorage/${fileName}.${fileExtension}`
    let saveMemePath = `./public/memeStorage/${fileName}.${fileExtension}`
    let memeObj = req.body
    memeObj.memePath = memePath

    file.mv(saveMemePath, err => {
      if (err) {
        return res.status(500).send(err.message)
      }
    })
    Meme.create(memeObj).then(newMeme => {
      let targetGenre = memeObj.genreSelect
      Genre.findOne({ genreName: targetGenre }).then(foundGenre => {
        foundGenre.memeList.push(newMeme._id)
        foundGenre.save().then(() => {
          res.render('addMeme', { status: true })
        })
      })
    })
  })

module.exports = router;
