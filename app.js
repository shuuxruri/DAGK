var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about-us');
var userRouter = require('./routes/user')
var app = express();

// view engine setup

app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',__dirname : '/views/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user',userRouter);
app.use('/about-us', aboutRouter);
app.get('/howitwork',function(req, res, next){
res.render('howitwork');
});
app.get('/pricing',function(req, res, next){
  res.render('pricing');
});
app.get('/comming-soon',function(req, res, next){
    res.render('comming-soon');
});
app.get('/profile',function(req, res, next){
  res.render('profile');
});
app.get('/productpage',function(req, res, next){
  res.render('productpage');
});
app.get('/category',function(req, res, next){
  res.render('category');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
