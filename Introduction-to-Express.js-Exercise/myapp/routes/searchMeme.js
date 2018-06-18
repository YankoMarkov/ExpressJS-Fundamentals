var express = require('express');
var router = express.Router();

const Genre = require('../models/Genre')
const Meme = require('../models/Meme')

let detailsInfo = true

/* GET search listing. */
router
  .get('/', function (req, res, next) {
    Genre.find({}).then(genres => {
      res.render('searchMeme', { detailsInfo, genres })
    })
  })
  .post('/', (req, res, next) => {
    let memeId = []
    let memeObj = req.body
    if (memeObj.genreSelect !== 'all') {
      Genre.findOne({ genreName: memeObj.genreSelect }).then(genre => {
        if (genre) {
          Meme.find({}).then(memes => {
            for (let list of genre.memeList) {
              for (let meme of memes) {
                if (meme.id === list.toString() && meme.memeName === memeObj.memeName) {
                  memeId.push(meme)
                  detailsInfo = false
                }
              }
            }
            if (detailsInfo) {
              Genre.find({}).then(genres => {
                res.render('searchMeme', { detailsInfo, genres })
              })
            } else {
              res.render('searchMeme', { detailsInfo, memeId })
            }
          })
        } else {
          Genre.find({}).then(genres => {
            res.render('searchMeme', { detailsInfo, genres })
          })
        }
      })
    } else {
      Genre.find().then(genres => {
        for (let genre of genres) {
          Meme.find({}).then(memes => {
            for (let list of genre.memeList) {
              for (let meme of memes) {
                if (meme.id === list.toString() && meme.memeName === memeObj.memeName) {
                  memeId.push(meme)
                  detailsInfo = false
                }
              }
            }
            if (detailsInfo) {
              Genre.find({}).then(genres => {
                res.render('searchMeme', { detailsInfo, genres })
              })
            } else {
              res.render('searchMeme', { detailsInfo, memeId })
            }
          })
        }
      })
    }
  })

module.exports = router;
