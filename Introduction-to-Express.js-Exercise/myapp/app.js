var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUploader = require('express-fileupload');

var indexRouter = require('./routes/index');
var addMemeRouter = require('./routes/addMeme');
var viewAllRouter = require('./routes/viewAll');
var searchMemeRouter = require('./routes/searchMeme');
var addGenreRouter = require('./routes/addGenre');
var detailsViewRouter = require('./routes/detailsView');

var app = express();

require('./config/dbConfig')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUploader());

app.use('/', indexRouter);
app.use('/addGenre', addGenreRouter);
app.use('/addMeme', addMemeRouter);
app.use('/viewAllMemes', viewAllRouter);
app.use('/detailsView/:id', detailsViewRouter);
app.use('/searchMeme', searchMemeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
