/**
 * 用户Controller
 */

var express = require('express');
var router = express.Router();

/**
 *  GET users listing.
 * @param  {[request]} req   [请求]
 * @param  {[response]} res   [响应]
 * @param  {[function]} next) {             res.send('respond with a resource');} [返回用户列表]
 * @return {[json]}       [返回user listing]
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
  res.render('userlist', {users: [{"name": "wlb"}, {"name": "fyj"}, {"name": "hff"}]});
});

var array = [];
array.push("array");
array.push("byte");
array.push("string");

for(var i = 0; i < array.length; i++) {
    console.log(array[i]);
}

module.exports = router;
