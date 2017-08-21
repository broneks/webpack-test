const path = require('path');

module.exports = {
  dir: {
    app: path.resolve(__dirname, '../app'),
    dist: path.resolve(__dirname, '../dist'),
    styles: path.resolve(__dirname, '../app/styles'),
    views: path.resolve(__dirname, '../app/views'),
    assets: path.resolve(__dirname, '../app/assets'),
    images: path.resolve(__dirname, '../app/assets/images'),
    fonts: path.resolve(__dirname, '../app/assets/fonts'),
  },
  file: {
    index: path.resolve(__dirname, '../app/index.html'),
  },
};
