const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about)

  app.post('/', controllers.home.search)

  app.get('/addProduct', controllers.product.getProduct)
  app.post('/addProduct', controllers.product.addProduct)

  app.get('/editProduct/:id', controllers.product.editProductGet)
  app.post('/editProduct/:id', controllers.product.editProductPost)

  app.get('/buyProduct/:id', controllers.product.buyProductGet)
  app.post('/buyProduct/:id', controllers.product.buyProductPost)

  app.get('/deleteProduct/:id', controllers.product.deleteProductGet)
  app.post('/deleteProduct/:id', controllers.product.deleteProductDel)

  app.get('/addCategory', controllers.category.getCategory)
  app.post('/addCategory', controllers.category.addCategory)

  app.get('/moreCategory/:id', controllers.category.moreCategory)

  app.get('/register', controllers.user.registerGet)
  app.post('/register', controllers.user.registerPost)

  app.get('/login', controllers.user.loginGet)
  app.post('/login', controllers.user.loginPost)

  app.post('/logout', controllers.user.logout)
  
  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}