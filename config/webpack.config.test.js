const webpack = require('webpack');

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
  plugins: [
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify(appConfig.local),
    }),
  ],
  module: {
    rules: [
      {
        test: /^(?!.*test\.js).*\.js$/,
        exclude: /(node_modules|bower_components|tests.webpack.js)/,
        loader: 'istanbul-instrumenter-loader',
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
  devtool: 'inline-source-map',
};

module.exports = config;
