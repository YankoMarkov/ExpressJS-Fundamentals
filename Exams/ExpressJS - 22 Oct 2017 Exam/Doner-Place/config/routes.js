const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/addProduct', restrictedPages.hasRole('Admin'), controllers.product.addProductGet)
  app.post('/addProduct', restrictedPages.hasRole('Admin'), controllers.product.addProductPost)

  app.get('/editDoner/:id', restrictedPages.hasRole('Admin'), controllers.product.updateProductGet)
  app.post('/editDoner/:id', restrictedPages.hasRole('Admin'), controllers.product.updateProductPost)

  app.get('/deleteDoner/:id', restrictedPages.hasRole('Admin'), controllers.product.deleteProduct)

  app.get('/customizeOrder/:id', restrictedPages.isAuthed, controllers.order.customizeOrderGet)
  app.post('/customizeOrder/:id', restrictedPages.isAuthed, controllers.order.customizeOrderPost)

  app.get('/orderDetails/:id', restrictedPages.isAuthed, controllers.order.orderDetailsGet)
  app.post('/orderDetails/:id', restrictedPages.isAuthed, controllers.order.orderDetailsPost)

  app.get('/orderStatus', restrictedPages.isAuthed, controllers.order.orderStatus)
  app.get('/orderStatusAdmin', restrictedPages.isAuthed, controllers.order.orderStatus)
  app.post('/orderStatusAdmin', restrictedPages.isAuthed, controllers.order.orderStatusPost)

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