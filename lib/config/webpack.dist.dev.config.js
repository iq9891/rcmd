const merge = require( 'webpack-merge' );

const webpackBaseConfig = require( './webpack.base.config.js' );

// 公共函数
const { pkg } = require( '../common' );

module.exports = merge( webpackBaseConfig, {
  output: {
    filename: pkg.name + '.js'
  },
} );
