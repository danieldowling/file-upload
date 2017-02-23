var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var autoprefixerOptions = {
  browsers: ['last 2 versions'],
  cascade: false
};

gulp.task('styles', function(){
  gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./css/'));
});

//watch task
gulp.task('default', function(){
  gulp.watch('sass/**/*.scss',['styles']);
});
