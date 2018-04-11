// 公共函数
const { resolve, pkg } = require( '../common' );

const { entryFolder = 'component' } = pkg.config;

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
        formatter: require('eslint-friendly-formatter'),
        fix: true
      }
    },
    {
      test: /\.tsx/,
      include: entryFolderReg,
      use: [ 'cache', 'ts' ]
    }
  ]
};
