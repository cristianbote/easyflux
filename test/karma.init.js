// Karma configuration
// Generated on Wed Mar 18 2015 23:25:33 GMT+0200 (GTB Standard Time)

module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/**/*.js',
      'test/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.js': 'coverage'
    },
    reporters: ['spec'],
    coverageReporter: {
      type: 'lcovonly'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
