const homeHandler = require('./homeHandler')
const staticHandler = require('./staticHandler')
const addMovieHandler = require('./addMovieHandler')
const viewAllHandler = require('./viewAllHandler')
const detailsHandler = require('./detailsHandler')

module.exports = [homeHandler, addMovieHandler, viewAllHandler, detailsHandler, staticHandler]