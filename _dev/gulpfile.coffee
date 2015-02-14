gulp = require 'gulp'
gulputil = require 'gulp-util'
coffee = require 'gulp-coffee'
sass = require 'gulp-sass'
plumber = require 'gulp-plumber'
watch = require 'gulp-watch'

# coffeeの設定
gulp.task 'coffee_task', ->
  gulp.src('src/**/*.coffee')
    .pipe(plumber())
    .pipe(coffee({bare:true}))
    .pipe gulp.dest('../public/js')

# sassの設定
gulp.task 'sass_task', ->
  gulp.src './src/scss/**/*.scss'
    .pipe sass()
    .pipe gulp.dest('../public/css')

gulp.task 'watch', ->
  watch "./src/scss/**/*.scss", ->
    gulp.start 'sass_task'
  watch "src/**/*.coffee", ->
    gulp.start 'coffee_task'

gulp.task('default',["watch"])
