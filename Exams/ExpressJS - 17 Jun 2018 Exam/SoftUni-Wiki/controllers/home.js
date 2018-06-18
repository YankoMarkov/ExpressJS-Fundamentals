const Edit = require('../models/Edit')
const Article = require('../models/Article')

module.exports = {
  index: async (req, res) => {
    try {
      let haveArticle = true
      let articles = []
      let edits = await Edit.find().sort('-creationDate')
      if (edits.length > 0) {
        let edit = edits[0]
        let article = await Article.findById(edit.article)
        for (let edit of edits) {
          let article = await Article.findById(edit.article)
          articles.push(article)
        }
        let content = edit.content.toString().split(/\W+/).slice(0, 50).join(" ");
        articles = articles.slice(0, 3)
        res.render('home/index', { haveArticle, content, article, articles })
      } else {
        haveArticle = false
        res.render('home/index', { haveArticle })
      }
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  search: async (req, res) => {
    try {
      const reqArticle = req.body
      let name = reqArticle.query
      let articles = await Article.find({ title: name })
      if (articles.length > 0) {
        res.render('home/search', { articles, name })
      } else {
        res.locals.globalErr = 'Nothing found!'
        res.redirect('/')
      }
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  }
}