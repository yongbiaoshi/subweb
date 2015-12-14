var express = require('express');
var moment = require('moment');
var User = require('../model/user.js');
var router = express.Router();

/* 设置模块属性 */
var result = {module: 'shendu'};

/* GET home page. */
router.get('/', function(req, res, next) {
  //TODO
  result.moment = moment;
  user1 = new User('shendu', 18);
  user1.date = new Date();
  user2 = new User('ylmf', 19);
  result.users = [];
  result.users.push(user1, user2);
  res.render('shendu', result);
});

module.exports = router;
