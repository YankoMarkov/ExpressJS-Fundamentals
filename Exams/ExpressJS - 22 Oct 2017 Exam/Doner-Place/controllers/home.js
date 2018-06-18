const Product = require('../models/Product')

module.exports = {
  index: (req, res) => {
    let user = req.user
    if (user) {
      if (user.roles.includes('Admin')) {
        homePage('admin/indexAdmin')
      } else {
        homePage('home/index')
      }
    } else {
      homePage('home/index')
    }

    function homePage(route) {
      Product.find().then(products => {
        let chicken = []
        let lamb = []
        let beef = []
        for (let product of products) {
          switch (product.category) {
            case "chicken":
              product.name = "Chicken"
              product.save()
              chicken.push(product)
              break
            case "lamb":
              product.name = "Lamb"
              product.save()
              lamb.push(product)
              break
            case "beef":
              product.name = "Beef"
              product.save()
              beef.push(product)
              break
          }
        }
        res.render(route, { chicken, lamb, beef })
      }).catch(err => {
        console.log(err)
        res.locals.globalErr = err
        res.redirect('/')
      })
    }
  }
}