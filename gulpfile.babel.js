import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import runElectron from 'gulp-run-electron';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import gulpIf from 'gulp-if';
import electronMocha from 'gulp-electron-mocha';

const autoFix = false; // TODO: make this with args!

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return autoFix && file.eslint != null && file.eslint.fixed;
}

function compile(doWatch) {
  const bundler = watchify(browserify('./src/js/renderer.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', () => {
        this.emit('end');
      })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./build'));
  }

  if (doWatch) {
    bundler.on('update', () => {
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
}

gulp.task('js:build', () => {
  // Don't do anythings with background files, just copy
  gulp.src('src/js/background/*.js')
    .pipe(gulp.dest('build'));

  return compile();
});

gulp.task('html:build', () => {
  gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('build', [
  'js:build',
  'html:build',
]);

gulp.task('watch', () => watch());

gulp.task('run-electron', () => {
  gulp.src('.')
    .pipe(runElectron());
});

gulp.task('test', () => {
  gulp.src('./src/**/*.spec.js')
    .pipe(electronMocha({
      electronMocha: {
        renderer: true,
        compilers: 'js:babel-core/register',
        // interactive: true
        // 'no-timeout': true
      },
    }));
});

gulp.task('lint:js', () => {
  gulp.src(['./src/js/**/*.js', '!./src/js/**/*.spec.js', '!node_modules/**'])
    .pipe(eslint({
      fix: autoFix,
    }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./src/js')))
    .pipe(eslint.failAfterError());
});

gulp.task('lint:gulp', () => {
  gulp.src('./gulpfile.babel.js')
    .pipe(eslint({
      fix: autoFix,
    }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')))
    .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint:js', 'lint:gulp']);

gulp.task('default', ['watch', 'build', 'run-electron']);
