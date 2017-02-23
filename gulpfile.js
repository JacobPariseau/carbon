(function () {
  'use strict'

  const gulp = require('gulp');
  const watch = require('gulp-watch');
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

  const patterns = {
    less: source + 'styles/**/*.less',
    css: source + "styles/**/*.css",
    js: source + "scripts/**/*.js",
    mustache: source + 'templates/*.mustache',
    mustachePartials: source + 'templates/**/*.mustache',
    image: source + "img/*.png"
  };
  gulp.task('less', function () {
    return gulp.src(patterns.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(bin + 'css'));
  });

  gulp.task('css', function () {
    return gulp.src(patterns.css)
    .pipe(cleanCSS())
    .pipe(gulp.dest(bin + 'css'));
  });

  gulp.task('scripts', function () {
    return gulp.src(patterns.js)
    .pipe(uglify())
    .pipe(gulp.dest(bin + 'js'));
  });

  gulp.task('template', function () {
    return gulp.src(patterns.mustache)
    .pipe(mustache({}))
    .pipe(rename({extname: ".html"}))
    .pipe(htmlmin({collapseWhitespace: true }))
    .pipe(gulp.dest(bin))
    .on('error',function () {
      gutil.beep();
    });
  });

  gulp.task('images', function () {
    return gulp.src(patterns.image)
    .pipe(gulp.dest(bin + 'img'));
  });

  gulp.task('clean', function () {
    return del([bin]);
  });

  gulp.task('build', ['clean'], function () {
    return gulp.start('css', 'less', 'scripts', 'template', 'images');
  });

  gulp.task('watch', function () {
    watch(patterns.mustachePartials, function () {
      gulp.start('template');
    });
    watch(patterns.image, function () {
      gulp.start('images');
    });
    watch(patterns.less, function () {
      gulp.start('less');
    });
    watch(patterns.css, function () {
      gulp.start('css');
    });
    watch(patterns.js, function () {
      gulp.start('js');
    })
  });
})();
