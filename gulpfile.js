const gulp = require('gulp');

const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css')

const mustache = require('gulp-mustache');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');

const uglify = require('gulp-uglify');
const path = require('path');
const del = require('del');

const source = './source/';
const bin = './site/';

gulp.task('less', function () {
  return gulp.src(source + 'styles/**/*.less')
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes')]
  }))
  .pipe(cleanCSS())
  .pipe(gulp.dest(bin + 'css'));
});

gulp.task('css', function () {
  return gulp.src(source + "styles/**/*.css")
  .pipe(cleanCSS())
  .pipe(gulp.dest(bin + 'css'));
});

gulp.task('scripts', function () {
  return gulp.src(source + "scripts/**/*.js")
  .pipe(uglify())
  .pipe(gulp.dest(bin + 'js'));
});

gulp.task('template', function () {
  return gulp.src(source + 'templates/*.mustache')
  .pipe(mustache({}))
  .pipe(rename({extname: ".html"}))
  .pipe(htmlmin({collapseWhitespace: true }))
  .pipe(gulp.dest(bin));
});

gulp.task('clean', function () {
  return del([bin]);
});

gulp.task('build', ['clean'], function () {
  return gulp.start('css', 'less', 'scripts', 'template');
});
