var express = require('express');
var router = express.Router();

const Genre = require('../models/Genre')
const Meme = require('../models/Meme')

/* GET viewAllMemes listing. */
router
  .get('/', function (req, res, next) {
    Meme.find({}).then(memes => {
      res.render('viewAllMemes', { memes })
    })
  })

module.exports = router;
