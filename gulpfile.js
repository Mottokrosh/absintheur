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
	'BUILD': './build',
	'FONTS': './src/css/fonts/**/*.{eot,svg,ttf,woff,woff2}',
	'IMG': './src/img/**/*.{png,jpg,gif}'
};

//
// The development server
//

gulp.task('default', ['webpack-dev-server', 'watchers']);

//
// CSS
//

gulp.task('css', ['fonts'], function () {
	return gulp.src(path.CSS)
		.pipe(postcss([
			precss(),
			autoprefixer({ remove: false, browser: ['> 1%', 'last 3 versions', 'Firefox ESR'] })
		]))
		.pipe(nano())
		.pipe(gulp.dest(path.BUILD));
});

//
// CSS Fonts
//

gulp.task('fonts', function () {
	return gulp.src(path.FONTS)
		.pipe(gulp.dest(path.BUILD + '/fonts'));
});

//
// Optimise images
//

gulp.task('images', function () {
	return gulp.src(path.IMG)
		.pipe(imagemin())
		.pipe(gulp.dest(path.BUILD + '/img'));
});

//
// Watchers
//

gulp.task('watchers', function () {
	gulp.watch(path.ALL_CSS, ['css']);
	gulp.watch(path.IMG, ['images']);
});

//
// Production build
//

gulp.task('build', ['css', 'images', 'webpack:build']);

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
	}).listen(8080, '0.0.0.0', function (err) {
		if (err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
	});
});
