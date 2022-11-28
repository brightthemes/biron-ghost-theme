const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const colorRgbaFallback = require('postcss-color-rgba-fallback');
const opacity = require('postcss-opacity');
// const pseudoelements = require('postcss-pseudoelements');
const vmin = require('postcss-vmin');
const willChange = require('postcss-will-change');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('cssnano');
const zindex = require('postcss-zindex');
const removeComments = require('postcss-discard-comments');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const babel = require('gulp-babel');

// Define base folders
const asset_src = 'assets/';
const npm_src   = 'node_modules/';
const dest      = 'assets/';

const onError = function( err ) {
  console.log('An error occurred:', gutil.colors.magenta(err.message));
  gutil.beep();
  this.emit('end');
};

gulp.task('fonts', function() {
  return gulp
    .src([
      npm_src + 'feather-icons/dist/feather-sprite.svg'
    ])
    .pipe(gulp.dest('partials'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp
    .src([
      npm_src   + 'lazysizes/lazysizes.min.js',
      npm_src   + 'fitvids/dist/fitvids.min.js',
      asset_src + 'js/scripts/prism.js',
      asset_src + 'js/scripts/script.js'
    ])
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dest + 'js'));
});

// Css processors
var processors = [
  removeComments,
  zindex,
  willChange,
  colorRgbaFallback,
  opacity,
  // pseudoelements,
  vmin,
  cssnano
];

// Build styles from sass
gulp.task('sass', function () {
  return gulp
    .src(asset_src + '/sass/app.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dest + 'css'));
});

// Browsersync init and reload
gulp.task('browsersync', function (callback) {
  browserSync.init({
    port: 3368,
    proxy: 'http://localhost:2368/'
  });
  callback();
});

gulp.task('reload', function (callback) {
  browserSync.reload();
  callback();
});

// Watch for changes in files

gulp.task('watch:scripts', function () {
  gulp.watch(asset_src + 'js/scripts/*.js', gulp.series('scripts', 'reload'));
});

gulp.task('watch:sass', function () {
  gulp.watch(asset_src + 'sass/*.scss', gulp.series('sass', 'reload'));
});

gulp.task('watch:hbs', function () {
  gulp.watch('**/*.hbs', gulp.series('reload'));
});

gulp.task('watch',
  gulp.parallel('watch:scripts', 'watch:sass', 'watch:hbs')
);

// // Default Task
gulp.task('default',
  gulp.series(
    gulp.parallel(
      'scripts',
      'sass'
    ),
    'browsersync',
    'watch'
  ),
);