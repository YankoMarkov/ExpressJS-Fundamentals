const encryption = require('../utility/encryption')
const User = require('mongoose').model('User')
const Car = require('../models/Car')
const Keychain = require('../models/Keychain')

module.exports = {
  registerGet: (req, res) => {
    res.render('user/register')
  },
  registerPost: async (req, res) => {
    const reqUser = req.body

    if (reqUser.password && reqUser.password !== reqUser.confirmedPassword) {
      res.locals.globalErr = 'Password do not match!'
      res.render('user/register')
      return
    }
    const salt = encryption.generateSalt()
    const hashedPass = encryption.generateHashedPass(salt, reqUser.password)

    try {
      const user = await User.create({
        username: reqUser.username,
        password: hashedPass,
        firstName: reqUser.firstName,
        lastName: reqUser.lastName,
        age: reqUser.age,
        gender: reqUser.gender,
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
      const user = await User.findOne({ username: reqUser.username })
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
  },
  profileGet: async (req, res) => {
    try {
      let userCars = []
      let user = req.user
      let keychains = await Keychain.find({ renter: user._id }).populate('car')

      for (let keychain of keychains) {
        let price = keychain.days * keychain.car.price
        let obj = {
          car: keychain.car,
          days: keychain.days,
          price: price
        }
        userCars.push(obj)
      }
      res.render('user/profile', { user, userCars })
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  }
}