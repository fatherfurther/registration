var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // 追加

var routes  = require('./routes/index');
var users = require('./routes/users');
var boards = require('./routes/boards'); // ←追加
var register = require('./routes/register'); // 追加
var login = require('./routes/login');　// 追加
var logout = require('./routes/logout'); // 追加
var setUser = require('./setUser'); // 追加

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', setUser, routes); // 変更
app.use('/users', users);
app.use('/boards', setUser, boards); // 変更
app.use('/register', register); // 追加
app.use('/login', login); // 追加
app.use('/logout', logout); // 追加

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
