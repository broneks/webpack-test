const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appConfig = require('../config.json');
const paths = require('./paths');

const config = {
  context: paths.dir.app,
  resolve: {
    alias: {
      app: paths.dir.app,
      styles: paths.dir.styles,
      views: paths.dir.views,
      fonts: paths.dir.fonts,
      images: paths.dir.images,
    },
  },
  entry: {
    app: './scripts/app.js',
  },
  output: {
    path: paths.dir.dist,
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: module => (
        module.context && module.context.indexOf('node_modules') >= 0
      ),
    }),
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify(appConfig.local),
    }),
    new HtmlWebpackPlugin({
      hash: false,
      inject: 'body',
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{
          // adds CSS to the DOM by injecting a <style> tag
          loader: 'style-loader',
        }, {
          // translates CSS into CommonJS
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
        }, {
          // compiles Sass to CSS
          loader: 'sass-loader',
          options: {
            data: '@import "variables";',
            includePaths: [paths.dir.styles],
          },
        }],
      },
      {
        // fonts
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: paths.file.index,
        loader: 'file-loader?name=[path][name].[ext]',
      },
      {
        // images
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
      {
        test: /\.html$/,
        exclude: paths.file.index,
        use: [{
          loader: 'file-loader?name=[path][name].[ext]',
        }],
      },
      {
        test: /^index.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader?cacheDirectory=true',
          'eslint-loader',
        ],
      },
    ],
  },
  stats: {
    modules: false,
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 9000,
    contentBase: paths.dir.dist,
    compress: true,
  },
};

module.exports = config;
