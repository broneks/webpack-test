const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const appConfig = require('./config.json');
const ENV = process.env.APP_ENV;

const paths = {
  app: path.resolve(__dirname, 'app'),
  dist: path.resolve(__dirname, 'dist'),
  images: path.resolve(__dirname, 'app/images'),
  styles: path.resolve(__dirname, 'app/styles'),
  views: path.resolve(__dirname, 'app/views'),
};

const extractStylesPlugin = new ExtractTextPlugin({
  filename: 'app.[contenthash].css',
  disable: ENV === 'development'
});

const config = {
  context: paths.app,
  resolve: {
    alias: {
      app: paths.app,
      styles: paths.styles,
      images: paths.images,
      views: paths.views,
    },
  },
  entry: './scripts/app.js',
  output: {
    path: paths.dist,
    filename: 'app.[chunkhash].js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(appConfig.local),
    }),
    extractStylesPlugin,
    new HtmlWebpackPlugin({
      hash: false,
      inject: true,
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractStylesPlugin.extract({
          use: [{
            // translates CSS into CommonJS
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
          }, {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              data: '@import "global";',
              includePaths: [paths.styles],
            },
          }],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
      {
        // fonts
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: path.resolve(paths.app, 'index.html'),
        loader: 'file-loader?name=[path][name].[hash].[ext]',
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
        test: /index.html$/,
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
};

module.exports = config;
