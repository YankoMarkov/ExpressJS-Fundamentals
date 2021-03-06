const encryption = require('../utility/encryption')
const User = require('mongoose').model('User')

module.exports = {
  registerGet: (req, res) => {
    res.render('user/register')
  },
  registerPost: async (req, res) => {
    const reqUser = req.body

    if (!reqUser.password && reqUser.password !== reqUser.confirmedPassword) {
      res.locals.globalErr = 'Password do not match!'
      res.render('user/register')
      return
    }
    const salt = encryption.generateSalt()
    const hashedPass = encryption.generateHashedPass(salt, reqUser.password)

    try {
      const user = await User.create({
        email: reqUser.email,
        password: hashedPass,
        roles: ['User'],
        salt
      })
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalErr = err
          res.render('user/register', user)
        } else {
          res.redirect('/')
        }
      })
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.render('user/register')
    }
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  loginGet: (req, res) => {
    res.render('user/login')
  },
  loginPost: async (req, res) => {
    const reqUser = req.body
    try {
      const user = await User.findOne({ email: reqUser.email })
      if (!user) {
        errorHandler('Invalid user data')
        return
      }
      if (!user.authenticate(reqUser.password)) {
        errorHandler('Invalid user data')
        return
      }
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalErr = err
          res.render('user/login', user)
        } else {
          res.redirect('/')
        }
      })
    } catch (err) {
      errorHandler(err)
    }

    function errorHandler(e) {
      console.log(e);
      res.locals.globalError = e;
      res.render('user/login');
    }
  }
}