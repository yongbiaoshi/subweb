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

/**
 *  GET users listing.
 * @param  {[request]} req   [请求]
 * @param  {[response]} res   [响应]
 * @param  {[function]} next) [返回用户列表]
 * @return {[json]}       [返回user listing]
 */
router.get('/list', function(req, res, next) {
  var users = [];
  users.push({"name": "wlb"}, {"name": "fyj"}, {"name": "hff"}, {"name": "xb"});
  res.render('userlist', {users: users});
});

module.exports = router;
