var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser=require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter=require('./routes/login');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
//自己添加的
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

//路由设置
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);

var registerRouter=require('./routes/register');
app.use('/register',registerRouter);
var indexRouter=require('./routes/index');
app.use('/index',indexRouter);
var detailRouter=require('./routes/detail');
app.use('/detail',detailRouter);
var readRouter=require("./routes/read");
app.use('/read',readRouter);
//管理员添加
var personRouter=require("./routes/person");
app.use('/person',personRouter);
//子窗口
var addvoteRouter=require('./routes/addvote');
app.use('/addvote',addvoteRouter);
app.get('/myinfo.html',function (req,res,next) {
  res.render('myinfo.html')
})
app.get('/voterecord.html',function (req,res,next) {
 res.render('voterecord.html');
})


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
