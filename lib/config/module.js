const path = require( 'path' );
// 公共函数
const { resolve, pkg } = require( '../common' );

const { entryFolder } = pkg.fe6rcmd;

const entryFolderReg = new RegExp(entryFolder);

module.exports = {
  rules: [
    {
      test: /\.ts(x?)$/,
      loader: 'eslint',
      exclude: /node_modules/,
      enforce: 'pre',
      include: entryFolderReg,
      options: {
        configFile: path.join(__dirname, "../../.eslintrc.js"),
        formatter: require('eslint-friendly-formatter'),
        fix: true,
        cache: true,
      }
    },
    {
      test: /\.tsx/,
      include: entryFolderReg,
      use: [ 'cache', 'ts' ]
    }
  ]
};
