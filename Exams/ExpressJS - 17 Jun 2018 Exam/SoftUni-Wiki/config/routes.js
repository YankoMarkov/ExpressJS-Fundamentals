const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/index', controllers.home.index)

  app.post('/', controllers.home.search)

  app.get('/create', restrictedPages.isAuthed, controllers.article.createArticleGet)
  app.post('/create', restrictedPages.isAuthed, controllers.article.createArticlePost)

  app.get('/allArticles', controllers.article.allArticleGet)

  app.get('/article/:id', controllers.article.articleGet)

  app.get('/edit/:id', restrictedPages.isAuthed, controllers.article.editArticleGet)
  app.post('/edit/:id', restrictedPages.isAuthed, controllers.article.editArticlePost)

  app.get('/history/:id', restrictedPages.isAuthed, controllers.article.articleHistoryGet)

  app.get('/lock/:id', restrictedPages.hasRole('Admin'), controllers.article.lock)
  app.get('/unlock/:id', restrictedPages.hasRole('Admin'), controllers.article.unlock)

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