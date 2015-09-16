var koa = require('koa');
var serve = require('koa-static');
var app = koa();
var path = require('path');
var cwd = __dirname;
var serveIndex = require('koa-serve-index');
var fs = require('fs');

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

app.post('/comment/test.json', function(req, res) {
  fs.readFile('/comment/test.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('/comment/test.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json(comments);
    });
  });
});

app.listen(8000);
console.log('server start at '+ 8000);
