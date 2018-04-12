const path = require( 'path' );
// 当前运行的路径
const root = process.cwd();
// 目标目录的包管理
const pkg = require(root + '/package.json');

const defaultConfig = {
  "publicFolder": "examples",
  "entryStyleFile": "index.tsx",
  "entryStyleFolder": "styles",
  "entryFile": "index.tsx",
  "entryFolder": "component",
  "outputFolder": "dist",
  "rootFolder": "src",
  "port": 3000
};
// 如果 package.json 中没有针对 fe6rcmd||config 的配置
if(!pkg.fe6rcmd) {
  if(pkg.config) {
    pkg.fe6rcmd = Object.assign({}, defaultConfig, pkg.config);
  } else {
    pkg.fe6rcmd = Object.assign({}, defaultConfig);
  }
} else {
  pkg.fe6rcmd = Object.assign({}, defaultConfig, pkg.fe6rcmd);
}

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
