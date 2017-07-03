const path = require('path');

module.exports = {
  dir: {
    app: path.resolve(__dirname, '../app'),
    dist: path.resolve(__dirname, '../dist'),
    images: path.resolve(__dirname, '../app/images'),
    styles: path.resolve(__dirname, '../app/styles'),
    views: path.resolve(__dirname, '../app/views'),
  },
  file: {
    index: path.resolve(__dirname, '../app/index.html'),
  },
};
