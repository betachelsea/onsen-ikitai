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

gulp.task('watch', function() {
  gulp.watch(['./source/coffee/**/*.coffee'], ['compile-coffee', 'concat-js']);
  gulp.watch(['./source/sass/**/*.scss'], ['compile-sass', 'concat-css']);
  gulp.watch(['./public/main.js', './public/style.css'], ['server']);
});

gulp.task("clean-public", function() {
  del(['./public/style.css', './public/main.js']);
});

gulp.task("compile-coffee", function() {
  del(['./source/dest/js/**/*.js']);
  gulp.src("source/coffee/**/*.coffee")
      .pipe(coffee())
      .pipe(gulp.dest('./source/dest/js'));
});

gulp.task("concat-js", function() {
  gulp.src(["./source/dest/js/**/*.js"])
      .pipe(concat("main.js"))
      .pipe(uglify({preserveComments: 'some'}))
      .pipe(gulp.dest('public/'));
});

gulp.task("compile-sass", function() {
  del(['./source/dest/css/**/*.css']);
  gulp.src("source/sass/**/*.scss")
      .pipe(sass())
      .pipe(gulp.dest('./source/dest/css'));
});

gulp.task("concat-css", function() {
  gulp.src(["./source/dest/css/**/*.css"])
      .pipe(concat("style.css"))
      .pipe(minifyCss())
      .pipe(gulp.dest('public/'));
});

gulp.task("compile", ['clean-public', 'compile-coffee', 'compile-sass', 'concat-js', 'concat-css']);
gulp.task("default", ['compile', 'server', 'watch']);
