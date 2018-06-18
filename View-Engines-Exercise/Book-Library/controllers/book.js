const Book = require('../models/Book')

module.exports = {
  addBookGet: (req, res) => {
    Book.find().then(books => {
      res.render('books/addBook', books)
    })
  },
  addBookPost: (req, res) => {
    let reqBook = req.body
    if (!reqBook.title || !reqBook.author || !reqBook.image) {
      res.locals.globalErr = 'All Fields must be filled!'
      res.render('books/addBook')
    } else {
      Book.create(reqBook).then(books => {
        res.redirect('/')
      })
    }
  },
  viewAll: (req, res) => {
    Book.find({}).sort('-createDate').then(books => {
      res.render('books/viewAll', { books })
    })
  },
  detailsView: (req, res) => {
    let reqBook = req.body
    let id = req.params.id
    Book.findById(id).then(book => {
      res.render('books/detailsView', { book })
    })
  }
}