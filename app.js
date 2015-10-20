var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//日期格式化工具
var moment = require('moment');
moment.locale('zh-cn');

var index = require('./routes/index');
var ylmf = require('./routes/ylmf');
var shendu = require('./routes/shendu');
var luobo = require('./routes/luobo');
var fanqie = require('./routes/fanqie');
var more = require('./routes/more');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/ylmf', ylmf);
app.use('/shendu', shendu);
app.use('/luobo', luobo);
app.use('/fanqie', fanqie);
app.use('/more', more);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('您访问的页面未找到');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var result = {message: err.message, error: err};
    if(isAjaxReq(req)){
      res.send(result);
    }else{
      res.render('error', result);
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var result = {message: err.message, error: {}};
  if(isAjaxReq(req)){
    res.send(result);
  }else{
    res.render('error', result);
  }
});

//判断是否是Ajax请求
function isAjaxReq(req){
  return req && req.headers && req.headers['X-Requested-With'] == 'XMLHttpRequest';
}

module.exports = app;
