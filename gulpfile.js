let gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass')(require('sass')),
  prefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  fileinclude = require('gulp-file-include'),
  gcmq = require('gulp-group-css-media-queries')

gulp.task('html_build', function (done) {
  return gulp
    .src('dev/*.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
  done()
})

gulp.task('css_build', function (done) {
  return gulp
    .src('dev/assets/style.sass')
    .pipe(sass())
    .pipe(prefixer())
    .pipe(gcmq())
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream())
  done()
})

gulp.task('js_build', function (done) {
  return gulp
    .src('dev/assets/*.js')
    .pipe(fileinclude())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream())
  done()
})

gulp.task('fonts_build', function (done) {
  gulp
    .src('dev/assets/fonts/*.*')
    .pipe(gulp.dest('dist/fonts/'))
    .pipe(browserSync.stream())
  done()
})

gulp.task('webServer', function (done) {
  browserSync.init({
    server: 'dist',
  })
  gulp.watch('dev/**/*.html', gulp.series('html_build'))
  gulp.watch('dev/**/*.sass', gulp.series('css_build'))
  gulp.watch('dev/**/*.js', gulp.series('js_build'))
  gulp.watch('dev/assets/fonts/*.*', gulp.series('fonts_build'))
  done()
})

gulp.task(
  'default',
  gulp.series('html_build', 'css_build', 'js_build', 'fonts_build', 'webServer')
)
