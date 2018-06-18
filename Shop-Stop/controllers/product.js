const shortid = require('shortid')
const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports = {
  getProduct: (req, res) => {
    Category.find().then(categories => {
      res.render('product/addProduct', { categories })
    })
  },
  addProduct: async (req, res) => {
    try {
      const file = req.files.image
      const reqProduct = req.body
      reqProduct.creator = req.user._id
      let fileName = shortid.generate()
      let fileExtension = file.name.split('.').pop()
      let filePath = `/uploadImages/${fileName}.${fileExtension}`
      let saveFilePath = `./public/uploadImages/${fileName}.${fileExtension}`
      reqProduct.image = filePath
      file.mv(saveFilePath, err => {
        if (err) {
          return res.status(500).send(err.message)
        }
      })
      const product = await Product.create(reqProduct)
      const category = await Category.findById(product.category)
      category.products.push(product._id)
      category.save()
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.render('product/addProduct')
    }
  },
  editProductGet: (req, res) => {
    let id = req.params.id
    Product.findById(id).populate('category').then(product => {
      res.render('product/editProduct', { product })
    })
  },
  editProductPost: async (req, res) => {
    try {
      const reqProduct = req.body
      let id = req.params.id
      let product = await Product.findByIdAndUpdate(id,
        {
          name: reqProduct.name,
          description: reqProduct.description,
          price: reqProduct.price
        }).populate('category')
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/editProduct/:id')
    }
  },
  buyProductGet: (req, res) => {
    let id = req.params.id
    Product.findById(id).then(product => {
      res.render('product/buyProduct', { product })
    })
  },
  buyProductPost: async (req, res) => {
    try {
      let id = req.params.id
      let product = await Product.findById(id)
      if (product.buyer) {
        res.locals.globalErr = 'Product was already bought!'
        res.render('product/buyProduct', { product })
      } else {
        const userId = req.user._id
        product.buyer = userId
        product.save()
        req.user.botedProducts.push(product._id)
        req.user.save()
        res.redirect('/')
      }
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/buyProduct/:id')
    }
  },
  deleteProductGet: (req, res) => {
    let id = req.params.id
    Product.findById(id).then(product => {
      res.render('product/deleteProduct', { product })
    })
  },
  deleteProductDel: (req, res) => {
    let id = req.params.id
    Product.findByIdAndRemove(id).then(product => {
      res.redirect('/')
    })
  }
}