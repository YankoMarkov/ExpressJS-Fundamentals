const Product = require('../models/Product')

const allowedToppings = ['pickle', 'tomato', 'onion', 'lettuce', 'hot sauce', 'extra sauce']

module.exports = {
  addProductGet: (req, res) => {
    res.render('admin/addProduct')
  },
  addProductPost: async (req, res) => {
    try {
      let reqProduct = req.body
      const imgFile = req.files.image
      let filePath = `/img/${imgFile.name}`
      let toppings = reqProduct.toppings
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0)
        .filter(e => allowedToppings.includes(e))
      let product = await Product.create({
        name: '',
        category: reqProduct.category,
        size: reqProduct.size,
        image: filePath,
        toppings: toppings
      })
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.render('admin/addProduct')
    }
  },
  updateProductGet: (req, res) => {
    let id = req.params.id
    Product.findById(id).then(product => {
      res.render('admin/editDoner', { product })
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.render('/')
    })
  },
  updateProductPost: async (req, res) => {
    try {
      let id = req.params.id
      let reqProduct = req.body
      const imgFile = req.files.image
      let filePath = `/img/${imgFile.name}`
      let toppings = reqProduct.toppings
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0)
        .filter(e => allowedToppings.includes(e))
      let product = await Product.findByIdAndUpdate(id, {
        category: reqProduct.category,
        size: reqProduct.size,
        image: filePath,
        toppings: toppings
      })
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.render('/')
    }
  },
  deleteProduct: (req, res) => {
    let id = req.params.id
    Product.findByIdAndRemove(id).then(product => {
      res.redirect('/')
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.render('/')
    })
  }
}