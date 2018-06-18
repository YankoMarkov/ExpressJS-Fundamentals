const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports = {
  index: (req, res) => {
    Product.find().populate('category').then(products => {
      res.render('home/index', { products })
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  about: (req, res) => {
    res.render('home/about')
  },
  search: async (req, res) => {
    try {
      const reqProduct = req.body
      let name = reqProduct.query
      let products = await Product.find().populate('category')
      if (products.length > 0) {
        products = products.filter(p => p.name.toString().includes(name))
        res.render('home/index', { products })
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