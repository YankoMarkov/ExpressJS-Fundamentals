const gulp = require('gulp')
const minifyHtml = require('gulp-htmlmin')
const rename = require('gulp-rename')

gulp.task('minify', () => {
  return gulp.src('views/*.html')
    .pipe(minifyHtml({collapseWhitespace: true}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('views'));
})