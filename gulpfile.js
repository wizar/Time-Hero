var gulp = require('gulp');

gulp.task('js:build', function () {
	gulp.src('src/js/*.js')
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