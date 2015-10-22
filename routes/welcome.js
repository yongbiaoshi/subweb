var express = require('express');
var router = express.Router();

/* 设置模块属性 */
var result = {module: 'welcome'};

/* GET welcome page. */
router.get('/', function(req, res, next) {
  res.render('welcome', result);
});

module.exports = router;
