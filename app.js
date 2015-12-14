var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redis = require('redis');
var RedisStore = require('connect-redis')(session);
var domain = require('domain');


//日期格式化工具
var moment = require('moment');
moment.locale('zh-cn');

var localeConfig = require('./appconfig.js');
var errorHandler = require('./routes/error.js');
var welcome = require('./routes/welcome.js');
var index = require('./routes/index.js');
var ylmf = require('./routes/ylmf.js');
var shendu = require('./routes/shendu.js');
var luobo = require('./routes/luobo.js');
var fanqie = require('./routes/fanqie.js');
var more = require('./routes/more.js');

var redisClient = redis.createClient(localeConfig.redis);

redisClient.on("error", function (err) {
  console.log("Redis Client Error :" + err);
});
redisClient.set('foo', 123);
redisClient.get('foo', function(err, res){
  if(err) {
    console.log('Redis 连接失败');
  }
  else{
    console.log('Redis 连接正常，测试数据-foo:', res);
  }
});


var app = express();

app.use(function(req, res, next){
  var reqDomain = domain.create();
  reqDomain.on('error', function(err){
    errorHandler(err, req, res, next);
  });
  reqDomain.run(next);
});

//session配置
app.use(session({
  secret: "subweb",
  store: new RedisStore({client: redisClient}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 10*60*1000
  }
}));

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

app.use(function(req, res, next){

  console.log("request url: ", req.originalUrl);

  if(!req.session){
    return next(new Error('oh no, session store connections is lost! Host : ' + config.redis.host));
  }
  req.session.webname = 'subweb';
  req.session.save(function(err){
    // session saved
    next(err);
  });
});

// filter
app.use('/', welcome);
app.use('/index', index);
app.use('/ylmf', ylmf);
app.use('/shendu', shendu);
app.use('/luobo', luobo);
app.use('/fanqie', fanqie);
app.use('/more', more);

//关闭Redis连接
// redisClient.end();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('您访问的页面未找到');
  err.status = 404;
  next(err);
});

// error handlers
app.use(errorHandler);
// 当异常未被捕获的时候
process.on('uncaughtException', function (err) {
  console.error("uncaughtException ERROR");
  if (typeof err === 'object') {
    if (err.message) {
      console.error('ERROR: ' + err.message);
    }
    if (err.stack) {
      console.error(err.stack);
    }
  } else {
    console.error('argument is not an object');
  }
});



module.exports = app;
