const Article = require('../models/Article')
const Edit = require('../models/Edit')
const User = require('mongoose').model('User')

module.exports = {
  createArticleGet: (req, res) => {
    res.render('article/create')
  },
  createArticlePost: async (req, res) => {
    try {
      const userId = req.user.id
      const reqArticle = req.body
      let article = await Article.create({
        title: reqArticle.title
      })
      let edit = await Edit.create({
        author: userId,
        content: reqArticle.content,
        article: article._id
      })
      article.edits.push(edit._id)
      article.save()
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  allArticleGet: (req, res) => {
    let user = req.user
    Article.find().sort('-title').then(articles => {
      if (user) {
        if (user.roles.includes('Admin')) {
          res.render('article/allArticles', { articles })
        } else {
          articles = articles.filter(a => a.lockedStatus === false)
          res.render('article/allArticles', { articles })
        }
      } else {
        articles = articles.filter(a => a.lockedStatus === false)
        res.render('article/allArticles', { articles })
      }
    }).catch(err => {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    })
  },
  articleGet: async (req, res) => {
    try {
      let edits = []
      let id = req.params.id
      let article = await Article.findById(id)
      for (let editId of article.edits) {
        let edit = await Edit.findById(editId)
        edits.push(edit)
      }
      res.render('article/article', { article, edits })
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  editArticleGet: async (req, res) => {
    try {
      let isAdmin = false
      let edits = []
      let id = req.params.id
      let article = await Article.findById(id)
      for (let editId of article.edits) {
        let edit = await Edit.findById(editId)
        edits.push(edit)
      }
      let user = req.user
      if (user.roles.includes('Admin')) {
        isAdmin = true
      }
      res.render('article/edit', { isAdmin, article, edits })
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  editArticlePost: async (req, res) => {
    try {
      const reqArticle = req.body
      console.log(reqArticle)
      let id = req.params.id
      let article = await Article.findById(id)
      for (let editId of article.edits) {
        let edit = await Edit.findByIdAndUpdate(editId, {
          content: reqArticle.content
        })
      }
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  articleHistoryGet: async (req, res) => {
    try {
      let edits = []
      let id = req.params.id
      let article = await Article.findById(id)
      for (let editId of article.edits) {
        let edit = await Edit.findById(editId)
        let user = await User.findById(edit.author)
        edit.authorName = user.email
        edits.push(edit)
      }
      res.render('article/history', { article, edits })
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  lock: async (req, res) => {
    try {
      let id = req.params.id
      let article = await Article.findByIdAndUpdate(id, {
        lockedStatus: true
      })
      article.save()
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
  unlock: async (req, res) => {
    try {
      let id = req.params.id
      let article = await Article.findByIdAndUpdate(id, {
        lockedStatus: false
      })
      article.save()
      res.redirect('/')
    } catch (err) {
      console.log(err)
      res.locals.globalErr = err
      res.redirect('/')
    }
  },
}