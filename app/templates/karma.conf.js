module.exports = function(config) {
	config.set({
		
		frameworks: ['jasmine'],

		preprocessors: {
			'**/*.coffee': ['coffee']
		},

		// list of files / patterns to load in the browser
		files: [
			'app/assets/bower_components/angular/angular.js',
			'app/assets/bower_components/angular-mocks/angular-mocks.js',
			'app/assets/bower_components/rui-angular/rui.js',
			
			'app/src/scripts/**/*.js',
			'app/src/scripts/**/*.coffee',
			'app/src/views/**/*.html',
			'app/test/**/*.js',
			'app/test/**/*.coffee'
		],

		preprocessors: {
			'**/*.coffee': ['coffee'],
			'**/*.html': ['ng-html2js']
		},

		ngHtml2JsPreprocessor: {
			stripPrefix: '<%%= src %>/views/',
			prependPredix: 'templates/',
			moduleName: '<% moduleName %>.templates'
		},

		coffeePreprocessor: {
			// options passed to the coffee compiler
			options: {
				bare: true,
				sourceMap: false
			},
			// transforming the filenames
			transformPath: function(path) {
				return path.replace(/\.js$/, '.coffee');
			}
		},

		// list of files to exclude
		exclude: [],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit'
		reporters: ['progress'],

		// web server port
		port: 9876,

		// cli runner port
		runnerPort: 9100,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};
