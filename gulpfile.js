var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('js:build', function () {
	gulp.src('src/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build'));

	// Don't do anythings with background files, just copy
	gulp.src('src/js/background/*.js')
		.pipe(gulp.dest('build'));
});

gulp.task('html:build', function () {
	gulp.src('src/index.html')
		.pipe(gulp.dest('build'));
});

gulp.task('build', [
	'js:build',
	'html:build'
]);

gulp.task('default', ['build']);