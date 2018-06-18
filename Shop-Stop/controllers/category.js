const Category = require('../models/Category')

module.exports = {
  getCategory: (req, res) => {
    res.render('category/addCategory')
  },
  addCategory: async (req, res) => {
    try {
      const reqCategory = req.body
      reqCategory.creator = req.user._id
      const category = await Category.create(reqCategory)
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.render('category/addCategory')
    }
  },
  moreCategory: async (req, res) => {
    try {
      const reqCategory = req.body
      let id = req.params.id
      const category = await Category.findById(id).populate('products')
      const categoryProd = category.products
      res.render('category/moreCategory', { category, categoryProd })
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  }
}