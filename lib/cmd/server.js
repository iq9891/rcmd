const Koa = require('koa');
const serve = require('koa-static');
const webpack = require("webpack");
const opn = require('opn');
const webpackMiddleware = require("koa-webpack-dev-middleware");
const commonConfig = require( '../config/webpack.examples.config' );

// 公共函数
const { root, pkg } = require( '../common' );

const { port } = pkg.fe6rcmd;

const app = new Koa();
const compiler = webpack(commonConfig);

const devMiddleware = webpackMiddleware(compiler, {
  hot: true,
  quiet: true,
  headers: {
    'Cache-control': 'no-cache'
  },
});

app.use(devMiddleware);

const hotMiddleware = require('koa-webpack-hot-middleware')(compiler, {
  log: () => {
    console.log('> 浏览 ' + uri + '\n> 当前路径 ' + root + '\n');
  }
});

app.use(hotMiddleware);

app.use(
  serve(root, {
    hidden: true,
  })
);

app.listen(port);

const uri = 'http://localhost:' + port;

console.log('> 浏览 ' + uri + '\n> 当前路径 ' + root + '\n');

devMiddleware.waitUntilValid(() => {
  console.log('> 浏览 ' + uri + '\n> 当前路径 ' + root + '\n');
  // 打开开发浏览网页
  opn(uri)
});
