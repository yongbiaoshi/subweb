var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "系统之家-网站首页"});
});

module.exports = router;
