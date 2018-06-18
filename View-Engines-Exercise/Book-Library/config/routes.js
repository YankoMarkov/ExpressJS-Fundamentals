const controllers = require('../controllers')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.post('/', controllers.home.search)

  app.get('/viewAll', controllers.book.viewAll)

  app.get('/addBook', controllers.book.addBookGet)
  app.post('/addBook', controllers.book.addBookPost)

  app.get('/detailsView/:id', controllers.book.detailsView)
  
  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}