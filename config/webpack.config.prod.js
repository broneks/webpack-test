const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const appConfig = require('../config.json');
const paths = require('./paths');

const APP_ENV = process.env.APP_ENV;

const extractStylesPlugin = new ExtractTextPlugin({
  filename: 'app.[contenthash].css',
});

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
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name]-chunk.[chunkhash].js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
      minChunks: module => (
        module.context && module.context.indexOf('node_modules') >= 0
      ),
    }),
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify(appConfig[APP_ENV || 'production']),
    }),
    extractStylesPlugin,
    new HtmlWebpackPlugin({
      hash: false,
      inject: 'body',
      template: 'index.html',
      chunks: ['vendor', 'app'],
    }),
    new ManifestPlugin({
      fileName: 'cache-manifest.json',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractStylesPlugin.extract({
          use: [{
            // translates CSS into CommonJS
            loader: 'css-loader?minimize',
          }, {
            // autoprefixer
            loader: 'postcss-loader',
          }, {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              data: '@import "variables";',
              includePaths: [paths.dir.styles],
            },
          }],
        }),
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
        use: [
          'file-loader?name=[path][name].[hash].[ext]',
          'image-webpack-loader',
        ],
      },
      {
        test: /\.html$/,
        exclude: paths.file.index,
        use: [{
          loader: 'file-loader?name=[path][name].[hash].[ext]',
        }, {
          loader: 'extract-loader',
        }, {
          loader: 'html-loader?minimize',
        }],
      },
      {
        test: /^index.html$/,
        loader: 'html-loader?minimize',
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
  devtool: 'hidden-source-map',
};

module.exports = config;
