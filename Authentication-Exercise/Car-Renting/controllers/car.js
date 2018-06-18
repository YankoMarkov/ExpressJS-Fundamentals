const Car = require('../models/Car')
const User = require('mongoose').model('User')
const Keychane = require('../models/Keychain')

module.exports = {
  addCarGet: (req, res) => {
    res.render('car/addCar')
  },
  addCarPost: (req, res) => {
    let reqCar = req.body
    Car.create({
      marc: reqCar.marc,
      model: reqCar.model,
      year: reqCar.year,
      price: reqCar.price,
      image: reqCar.image,
      creationDate: Date.now()
    }).then(car => {
      res.redirect('/')
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  editCarGet: (req, res) => {
    let id = req.params.id
    Car.findById(id).then(car => {
      res.render('car/editCar', { car })
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  updateCarGet: (req, res) => {
    let id = req.params.id
    Car.findById(id).then(car => {
      res.render('car/updateCar', { car })
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  updateCarPost: (req, res) => {
    const reqCar = req.body
    let id = req.params.id
    Car.findByIdAndUpdate(id, {
      marc: reqCar.marc,
      model: reqCar.model,
      year: reqCar.year,
      image: reqCar.image,
      price: reqCar.price
    }).then(car => {
      res.redirect('/')
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  deleteCarGet: (req, res) => {
    let id = req.params.id
    Car.findById(id).then(car => {
      res.render('car/deleteCar', { car })
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  deleteCarPost: (req, res) => {
    let id = req.params.id
    Car.findByIdAndRemove(id).then(car => {
      res.redirect('/')
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  rentCarGet: (req, res) => {
    let id = req.params.id
    Car.findById(id).then(car => {
      if (car.rented === false) {
        res.render('car/rentCar', { car })
      } else {
        res.locals.globalErr = 'The car is rented!'
        res.redirect('/')
      }
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  rentCarPost: async (req, res) => {
    try {
      const reqCar = req.body
      let userId = req.user._id
      let id = req.params.id
      let days = Number(reqCar.days)
      let car = await Car.findById(id)
      car.rented = true
      car.save()
      let user = await User.findById(userId)
      let keychane = await Keychane.create({
        car: car._id,
        renter: user._id,
        rentDate: reqCar.date,
        days: days
      })
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  unrentCarGet: async (req, res) => {
    try {
      let carId = req.params.id
      let car = await Car.findById(carId)
      car.rented = false
      car.save()
      let keychane = await Keychane.findOneAndRemove({ car: carId })
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  }
}