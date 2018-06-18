const Car = require('../models/Car')
const restrictedPages = require('../config/auth')

module.exports = {
  index: (req, res) => {
    Car.count().then(cars => {
      res.render('home/index', { cars })
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  viewAll: (req, res) => {
    let limit = 10
    let page = Number(req.params.page)
    let prevPage = page - 1
    let nextPage = page + 1
    let isAdmin = false
    let user = req.user
    if (user) {
      if (user.roles.includes('Admin')) {
        isAdmin = true
      }
    }
    Car.find()
      .sort('-creationDate')
      .where('rented', false)
      .skip(page * limit)
      .limit(limit)
      .then(cars => {
        if (prevPage < 0) {
          prevPage = 0
        }
        let page = { prevPage, nextPage }
        if (cars.length > 0) {
          res.render('home/viewAll', { isAdmin, cars, page })
        } else {
          res.locals.globalErr = 'All cars is rented!'
          res.render('home/viewAll', { isAdmin, cars, page })
        }
      }).catch(err => {
        console.log(err)
        res.locals.globalErr = err
        res.redirect('/')
      })
  },
  search: async (req, res) => {
    try {
      const reqCar = req.body
      let name = reqCar.query
      let cars = await Car.find().sort('-creationDate')
      if (cars.length > 0) {
        cars = cars.filter(c =>
          c.marc.toString().includes(name) ||
          c.model.toString().includes(name) ||
          c.year.toString().includes(name))
        res.render('home/viewAll', { cars })
      } else {
        res.locals.globalErr = 'Nothing found!'
        res.redirect('/')
      }
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  }
}