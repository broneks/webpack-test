const webpack = require('./config/webpack.config.test');

module.exports = function karmaConfig (config) {
  const settings = {
    webpack,
    webpackMiddleware: {
      stats: 'minimal',
    },
    frameworks: ['jasmine'],
    preprocessors: {
      'app/scripts/tests.webpack.js': ['webpack'],
      'app/**/*.html': ['ng-html2js'],
    },
    coverageIstanbulReporter: {
      reports: ['html'],
      fixWebpackSourcePaths: true,
    },
    files: [
      'app/scripts/tests.webpack.js',
    ],
    reporters: ['progress', 'coverage-istanbul'],
    browsers: ['PhantomJS'],
  };

  if (!config.autoWatch) {
    settings.coverageIstanbulReporter.reports.push('text-summary');
  }

  config.set(settings);
};
