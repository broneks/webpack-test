/* eslint-disable global-require */

switch (process.env.APP_ENV) {
  case 'staging':
  case 'release':
  case 'production':
  case 'docker':
    module.exports = require('./config/webpack.prod')();
    break;

  case 'test':
    module.exports = require('./config/webpack.test')();
    break;

  default:
    module.exports = require('./config/webpack.dev')();
}
