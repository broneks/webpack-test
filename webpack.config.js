const prod = require('./config/webpack.prod');
const test = require('./config/webpack.test');
const dev = require('./config/webpack.dev');

switch (process.env.APP_ENV) {
  case 'staging':
  case 'release':
  case 'production':
  case 'docker':
    module.exports = prod;
    break;

  case 'test':
    module.exports = test;
    break;

  default:
    module.exports = dev;
}
