const path = require( 'path' );
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 百分比进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const FriendlyErrorsPlugin = require( 'friendly-errors-webpack-plugin' );
const chalk = require( 'chalk' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );
// 公共函数
const { resolve, pkg, root } = require( '../common' );

const { publicFolder = 'examples', entryFile = 'index.tsx', outputFolder = 'dist', entryFolder = 'component' } = pkg.config;

const entryPath = publicFolder + '/' + entryFile;
const outputPath = publicFolder + '/' + outputFolder;

module.exports = {
  entry: {
    main: resolve ( entryPath )
  },
  // 输出
  output: {
    path: resolve( outputPath ),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  cache: true,
  mode: 'development',
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'eslint',
        exclude: /node_modules/,
        enforce: 'pre',
        include: new RegExp(entryFolder + '|' + publicFolder),
        options: {
          formatter: require('eslint-friendly-formatter'),
          fix: true
        }
      },
      {
        test: /\.scss$/,
        use: [ 'cache', 'style', 'css', 'sass' ]
      },
      {
        test: /\.tsx/,
        include: new RegExp(entryFolder + '|' + publicFolder),
        use: [ 'cache', 'ts' ]
      }
    ]
  },
  devServer: {
    contentBase: resolve( outputPath ),
    port: 7005,
    hot: true,
    quiet: true
  },
  resolve: {
    extensions: [ '*', '.js', '.tsx', '.json' ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve( './tsconfig.json' )
      })
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new ProgressBarPlugin({
      format: '📦'+ chalk.blue('构建进度:') + ' '+ chalk.redBright.bold('[:bar]') + ' ' + chalk.magentaBright.bold(':percent') + ' ' + chalk.magentaBright.bold(':elapsed seconds'),
    }),
    new StyleLintPlugin(),
    new HtmlWebpackPlugin( {
      inject: true,
      filename: resolve('./'+ outputPath +'/index.html' ),
      template: resolve('./'+ publicFolder +'/index.html' )
    } ),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // }),
    new webpack.ProgressPlugin((percentage, msg) => {
      const stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(chalk.magenta(msg));
        stream.clearLine(1);
      } else if (percentage === 1) {
        console.log(chalk.green('\n ✅  webpack: 编译完成.\n'));
      }
    })
  ]
}
