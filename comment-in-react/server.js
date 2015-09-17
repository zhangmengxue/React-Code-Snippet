var koa = require('koa');
var serve = require('koa-static');
var path = require('path');
var cwd = __dirname;
var serveIndex = require('koa-serve-index');
var fs = require('fs');
var router = require('koa-router')();
var app = koa();

app.use(serveIndex(cwd,{
  hidden:true,
  view:'details'
}));

var jsx = require('koa-jsx');
app.use(jsx(cwd,{
  reactTools:require('react-tools'),
  next:function(){
    return 1;
  }
}));

var modularize = require('koa-modularize');
var mount = require('koa-mount');
app.use(mount('/comment',modularize(path.resolve(cwd,'comment'))));
app.use(serve(cwd,{
  hidden:true
}));

router.post('/comment/test.json',function *(next){

});


app.listen(8000);
console.log('server start at '+ 8000);
