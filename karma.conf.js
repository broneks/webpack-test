const webpack = require('./config/webpack.config.test');

module.exports = function karmaConfig (config) {
  config.set({
    webpack,
    frameworks: ['jasmine'],
    preprocessors: {
      'app/scripts/**/*.js': ['coverage'],
      'app/scripts/tests.webpack.js': ['webpack'],
      'app/**/*.html': ['ng-html2js'],
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },
    files: [
      'app/scripts/tests.webpack.js',
    ],
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    failOnEmptyTestSuite: false,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
  });
};
