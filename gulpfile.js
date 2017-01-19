var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	runElectron = require("gulp-run-electron"),
	browserify = require('browserify'),
	watchify = require('watchify'),
	babel = require('babelify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	mocha = require('gulp-mocha');

function compile(watch) {
	var bundler = watchify(browserify('./src/js/renderer.js', { debug: true }).transform(babel));

	function rebundle() {
		bundler.bundle()
			.on('error', function(err) { console.error(err); this.emit('end'); })
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(uglify())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('./build'));
	}

	if (watch) {
		bundler.on('update', function() {
			console.log('-> bundling...');
			rebundle();
		});
	}

	rebundle();
}

function watch() {
	return compile(true);
};

gulp.task('js:build', function () {
	return compile();
});

gulp.task('html:build', function () {
	gulp.src('src/index.html')
		.pipe(gulp.dest('build'));
});

gulp.task('build', [
	'js:build',
	'html:build'
]);

gulp.task('watch', function () {
	// gulp.watch('src/js/**/*.js', ['js:build']);
	// gulp.watch('src/js/**/*.js', ['js:build', runElectron.rerun]);
	return watch();
});

gulp.task('run-electron', function () {
	gulp.src('.')
		.pipe(runElectron());
});

gulp.task('test', function() {
	gulp.src('./test/test.js', {read: false})
		.pipe(mocha());
});

gulp.task('default', ['watch', 'build', 'run-electron']);