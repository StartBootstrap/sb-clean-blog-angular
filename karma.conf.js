// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const angularJSON = require('./angular.json')

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        coverageReporter: {
            watermarks: {
                statements: [90, 100],
                functions: [90, 100],
                branches: [90, 100],
                lines: [90, 100],
            },
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, `./coverage/${angularJSON.defaultProject}`),
            reports: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true,
            thresholds: {
                statements: 100,
                lines: 100,
                branches: 100,
                functions: 100,
            },
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome_with_debugging', 'ChromeHeadlessNoSandbox'],
        singleRun: false,
        restartOnFileChange: true,
        customLaunchers: {
            Chrome_with_debugging: {
                base: 'Chrome',
                chromeDataDir: require('path').resolve(__dirname, '../.chrome'),
                // flags: ['--auto-open-devtools-for-tabs'],
            },
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },
    });
};
