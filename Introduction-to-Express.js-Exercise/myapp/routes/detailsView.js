var express = require('express');
var router = express.Router();

const Meme = require('../models/Meme')

/* GET DetailsView listing. */
router
  .get('/', function (req, res) {
    let id = req.baseUrl.toString().split('/').pop()
    console.log(id)
    Meme.findById(id).then(meme => {
      console.log(meme)
      res.render('detailsView', { meme })
    })
  })

module.exports = router;
