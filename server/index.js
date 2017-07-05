// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
var logger = require('morgan');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
var routerFs = require('../modules/fs');
// 引入Express
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
const dirTree = routerFs.readDirDeepSync(path.resolve(__dirname.split('server')[0], 'routes'));
console.log(dirTree)
routerFs.genRouteByDirTree(dirTree).forEach((route) => {
  console.log(route)
  app.use(route.route, require(route.path));
});
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})
// 监听8088端口
app.listen(8080, function () {
    console.log('>>>')
});
