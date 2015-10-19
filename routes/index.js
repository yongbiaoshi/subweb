var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var result = {};
  result.title = "系统之家-网站首页";
  // result.now = moment(new Date()).format('llll');//当前日期格式化
  result.now = moment(new Date()).format('YYYY-MM-D日');//当前日期格式化
  res.render('index', result);
});

module.exports = router;
