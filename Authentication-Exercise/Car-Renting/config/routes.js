const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.post('/', controllers.home.search)
  app.post('/viewAll/:page', controllers.home.search)

  app.get('/viewAll/:page', controllers.home.viewAll)

  app.get('/addCar', restrictedPages.hasRole('Admin'), controllers.car.addCarGet)
  app.post('/addCar', restrictedPages.hasRole('Admin'), controllers.car.addCarPost)

  app.get('/editCar/:id', restrictedPages.isAuthed, controllers.car.editCarGet)

  app.get('/rentCar/:id', restrictedPages.isAuthed, controllers.car.rentCarGet)
  app.post('/rentCar/:id', restrictedPages.isAuthed, controllers.car.rentCarPost)

  app.get('/unrentCar/:id', restrictedPages.isAuthed, controllers.car.unrentCarGet)

  app.get('/updateCar/:id', restrictedPages.hasRole('Admin'), controllers.car.updateCarGet)
  app.post('/updateCar/:id', restrictedPages.hasRole('Admin'), controllers.car.updateCarPost)

  app.get('/deleteCar/:id', restrictedPages.hasRole('Admin'), controllers.car.deleteCarGet)
  app.post('/deleteCar/:id', restrictedPages.hasRole('Admin'), controllers.car.deleteCarPost)

  app.get('/register', controllers.user.registerGet)
  app.post('/register', controllers.user.registerPost)

  app.get('/login', controllers.user.loginGet)
  app.post('/login', controllers.user.loginPost)

  app.get('/profile', restrictedPages.isAuthed, controllers.user.profileGet)

  app.post('/logout', controllers.user.logout)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}