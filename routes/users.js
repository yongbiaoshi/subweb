'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
  res.render('userlist', {userList: []});
});

var array = [];
array.push("array");
array.push("byte");
array.push("string");
for(var i = 0; i < array.length; i++) {
    console.log(array[i]);
}

module.exports = router;
