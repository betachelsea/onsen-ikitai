// http://qiita.com/teitei_tk/items/6a9833e4308b3769811d
var gulp = require("gulp"),
    del = require("del"),
    coffee = require('gulp-coffee'),
    uglify = require('gulp-uglify'),
    sass = require("gulp-sass"),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    server = require('gulp-express'),
    browserify = require('browserify');

gulp.task('server', function() {
  server.run({ file: './app.js' });
});

gulp.task("clean-public", function() {
  del(['./public/dest/**/*.css', './public/dest/**/*.js'])
});

gulp.task("compile-coffee", function() {
  gulp.src("source/coffee/**/*.coffee")
      .pipe(coffee())
      .pipe(gulp.dest('./public/dest'));
});

gulp.task("compile-js", function() {
  gulp.src(["./public/dest/**/*.js"])
      .pipe(concat("application.js"))
      .pipe(uglify({preserveComments: 'some'}))
      .pipe(gulp.dest('./'));
});

gulp.task("compile-sass", function() {
  gulp.src("source/sass/**/*.scss")
      .pipe(sass())
      .pipe(gulp.dest('./dest/css'));
});

gulp.task("compile-css", function() {
  gulp.src(["./dest/css/**/*.css", "!./style.css"])
      .pipe(concat("style.css"))
      .pipe(minifyCss())
      .pipe(gulp.dest('./'));
});

gulp.task("compile", ['clean-public', 'compile-coffee', 'compile-sass', 'compile-js', 'compile-css']);
gulp.task("default", ['compile', 'server']);