var errorHandler = function(err, req, res, next){
  var handler = this;

  handler.isAjaxReq = function(req){
    return req && req.headers && req.headers['X-Requested-With'] == 'XMLHttpRequest';
  };
  console.log('env', req.app.get('env'), ' process.env.NODE_ENV : ', process.env.NODE_ENV);
  console.log('捕获到错误！！-- erro code : ', err.status || 500);
  res.status(err.status || 500);
  //production error handler
  var result = {message: err.message, error: {}};
  // development error handler will print stacktrace
  if(req.app.get('env') === 'development'){
    result.error = err;
  }
  if(handler.isAjaxReq(req)){
    res.send(result);
  }else{
    res.render('error', result);
  }
};

module.exports = errorHandler;
