const merge = require( 'webpack-merge' );
const chalk = require( 'chalk' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 百分比进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 公共函数
const { resolve, pkg } = require( '../common' );

const { rootFolder = 'src', entryStyleFolder = 'styles', entryStyleFile = 'index.tsx' } = pkg.config;

const webpackBaseConfig = require( './webpack.base.config.js' );

module.exports = merge( webpackBaseConfig, {
  entry: {
    main: resolve(rootFolder + '/' + entryStyleFolder + '/' + entryStyleFile)
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'cache', 'css', 'sass',
          {
            loader: 'postcss',
            options: {
              config: {
                path: '.postcssrc.js'
              }
            }
          }
        ]
      }
    ],
  },
  optimization: {
    minimizer: [
      // 压缩
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  plugins: [
    // 提取
    new MiniCssExtractPlugin({
      filename: pkg.name + '.css'
    })
  ]
} );
