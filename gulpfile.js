var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    package = require('./package.json');


var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package : package }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['watch'], function () {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
});

gulp.task('html', function() {
  gulp.src('src/html/**/*.html')
    .pipe(gulp.dest('app'));
});

gulp.task('images', function() {
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('app/assets/img'));
});

gulp.task('components', function() {
  gulp.src('src/components/**/*')
    .pipe(gulp.dest('app/assets/components'));
});

gulp.task('icons', function() {
  gulp.src('src/favicon/**/*')
    .pipe(gulp.dest('app/'));
});

gulp.task('watch', ['css', 'js', 'icons', 'components', 'html', 'browser-sync'], function() {
  gulp.watch('src/scss/**/*.scss', ['css', 'bs-reload']);
  gulp.watch('src/js/**/*.js', ['js', 'bs-reload']);
  gulp.watch('src/html/**/*', ['html', 'bs-reload']);
  gulp.watch('src/favicon/**/*', ['icons', 'bs-reload']);
  gulp.watch('src/img/**/*', ['images', 'bs-reload']);
  gulp.watch('src/components/**/*', ['components', 'bs-reload']);
});
