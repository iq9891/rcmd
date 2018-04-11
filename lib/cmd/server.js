const Koa = require('koa');
const serve = require('koa-static');
var webpack = require("webpack");
var opn = require('opn');
var webpackMiddleware = require("koa-webpack-dev-middleware");
const commonConfig = require( '../config/webpack.examples.config' );
const root = process.cwd();
// 目标目录的包管理
const pkg = require(root + '/package.json');

const { port = 1989 } = pkg.config;

const app = new Koa();
var compiler = webpack(commonConfig)

const devMiddleware = webpackMiddleware(compiler, {
  hot: true,
  quiet: true,
  headers: {
    'Cache-control': 'no-cache'
  },
});

app.use(devMiddleware);

var hotMiddleware = require('koa-webpack-hot-middleware')(compiler, {
  log: (sss) => {
    console.log('> 浏览 ' + uri + '\n> 当前路径 ' + process.cwd() + '\n')
  }
});

app.use(hotMiddleware)

app.use(
  serve(root, {
    hidden: true,
  })
);

app.listen(port);

var uri = 'http://localhost:' + port;

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> 浏览 ' + uri + '\n> 当前路径 ' + process.cwd() + '\n')

devMiddleware.waitUntilValid(() => {
  console.log('> 浏览 ' + uri + '\n> 当前路径 ' + process.cwd() + '\n')
  // 打开开发浏览网页
  opn(uri)
  _resolve()
})
