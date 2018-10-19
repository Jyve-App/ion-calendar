const concat = require('gulp-concat')
const gulp = require('gulp')

gulp.task('sass', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(concat('ion-calendar.bundle.scss'))
    .pipe(gulp.dest('dist'))
})
