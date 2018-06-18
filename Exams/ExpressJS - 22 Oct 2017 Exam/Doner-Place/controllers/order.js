const Product = require('../models/Product')
const Order = require('../models/Order')

module.exports = {
  customizeOrderGet: (req, res) => {
    let id = req.params.id
    Product.findById(id).then(product => {
      res.render('order/customizeOrder', { id, product })
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  customizeOrderPost: async (req, res) => {
    try {
      const userId = req.user.id
      const productId = req.body.product_id
      const toppings = []
      for (let key in req.body) {
        if (!req.body.hasOwnProperty(key)) continue
        if (key !== 'product_id') {
          toppings.push(key)
        }
      }
      let order = await Order.create({
        creator: userId,
        product: productId,
        toppings: toppings
      })
      switch (order.orderStatus) {
        case "Pending":
          order.pending = true
          order.save()
          break
        case "In progress":
          order.progress = true
          order.save()
          break
        case "In transit":
          order.transit = true
          order.save()
          break
        case "Delivered":
          order.delivered = true
          order.save()
          break
      }
      let product = await Product.findById(productId)
      res.render('order/orderDetails', { product, order })
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  orderDetailsGet: async (req, res) => {
    try {
      let id = req.params.id
      let order = await Order.findById(id)
      let product = await Product.findById(order.product)
      switch (order.orderStatus) {
        case "Pending":
          order.pending = true
          break
        case "In progress":
          order.progress = true
          break
        case "In transit":
          order.transit = true
          break
        case "Delivered":
          order.delivered = true
          break
      }
      res.render('order/orderDetails', { order, product })
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  orderStatus: async (req, res) => {
    try {
      let user = req.user
      if (user.roles.includes('Admin')) {
        let orders = await Order.find().populate('product')
        res.render('order/orderStatusAdmin', { user, orders })
      } else {
        let orders = await Order.find({ creator: user._id }).populate('product')
        orders.map(o => {
          o.orderDate = o.orderDate.toLocaleString()
        })
        res.render('order/orderStatus', { user, orders })
      }
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  orderStatusPost: async (req, res) => {
    try {
      console.log(req.body)
      let id = req.params.id
      let order = await Order.findById(id)
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  }
}