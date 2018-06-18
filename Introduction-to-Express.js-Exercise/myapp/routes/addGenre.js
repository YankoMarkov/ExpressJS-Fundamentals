var express = require('express');
var router = express.Router();

const Genre = require('../models/Genre')

/* GET addGenre listing. */
router
  .get('/', function (req, res, next) {
    res.render('addGenre');
  })
  .post('/', (req, res, next) => {
    let genreObj = req.body
    Genre.create(genreObj).then(() => {
      res.render('addGenre', { status: true })
    })
  })

module.exports = router;