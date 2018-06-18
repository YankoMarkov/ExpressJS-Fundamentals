const Book = require('../models/Book')

module.exports = {
  index: (req, res) => {
    Book.count().then(books => {
      res.render('home/index', { books })
    })
  },
  search: async (req, res) => {
    try {
      const reqBook = req.body
      let books = await Book.find({ title: reqBook.query })
      if (books.length > 0) {
        res.render('books/viewAll', { books })
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