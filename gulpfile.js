var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');

//
// Paths
//

var path = {
	'CSS': './src/css/index.css',
	'ALL_CSS': './src/css/*.css',
	'BUILD': './build'
};

//
// The development server
//

gulp.task('default', ['webpack-dev-server', 'watchers']);

//
// CSS
//

gulp.task('css', function () {
	return gulp.src(path.CSS)
		.pipe(postcss([
			precss(),
			autoprefixer({ remove: false, browser: ['> 1%', 'last 3 versions', 'Firefox ESR'] })
		]))
		.pipe(nano())
		.pipe(gulp.dest(path.BUILD));
});

//
// Watchers
//

gulp.task('watchers', function () {
	gulp.watch(path.ALL_CSS, ['css']);
});

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh

gulp.task('build-dev', ['webpack:build-dev'], function() {
	gulp.watch(['app/**/*'], ['webpack:build-dev']);
});

//
// Production build
//

gulp.task('build', ['css', 'webpack:build']);

//
// Webpack Build
//

gulp.task('webpack:build', function (callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function (err, stats) {
		if (err) throw new gutil.PluginError('webpack:build', err);
		gutil.log('[webpack:build]', stats.toString({
			colors: true
		}));
		callback();
	});
});

//
// Webpack Build for Dev
//

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', function (callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError('webpack:build-dev', err);
		gutil.log('[webpack:build-dev]', stats.toString({
			colors: true
		}));
		callback();
	});
});

//
// Webpack Dev Server
//

gulp.task('webpack-dev-server', function (callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = 'eval';
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: '/' + myConfig.output.publicPath,
		stats: {
			colors: true
		}
	}).listen(8080, 'localhost', function (err) {
		if (err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
	});
});
