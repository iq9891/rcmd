const path = require( 'path' );
// 当前运行的路径
const root = process.cwd();
// 目标目录的包管理
const pkg = require(root + '/package.json');

module.exports = {
  root,
  pkg,
  resolve: function(dir) {
    return path.join(root, '', dir);
  },
  zeroFill: function(time) {
    return time < 10 ? '0' + time : time.toString();
  },
};
