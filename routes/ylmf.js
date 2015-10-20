var express = require('express');
var moment = require('moment');
var router = express.Router();

/* 设置模块属性 */
var result = {module: 'ylmf'};

/* GET home page. */
router.get('/', function(req, res, next) {
  //TODO

  res.render('ylmf', result);
});

module.exports = router;
