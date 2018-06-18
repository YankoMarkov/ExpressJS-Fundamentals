const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const fileUploader = require('express-fileupload')
const passport = require('passport')


module.exports = (app) => {
  app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
  }))
  app.set('view engine', '.hbs')

  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(fileUploader())
  app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user;
    }
    next()
  })
}