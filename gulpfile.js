const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    package = require('./package.json'),
    eslint = require('gulp-eslint'),
    webpack = require('webpack-stream'),
    gulpSequence = require('gulp-sequence');


const banner = [
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

gulp.task('lint-js', function() {

  return gulp.src('src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('compile-js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(webpack(
      {
        entry: {
          scripts: './src/js/scripts.js'
          // If more than one entrypoint exists, add it here and a new file will be created on build.
        },
        output: {
          filename: '[name].js',
        },
        module: {
          loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }]
        }
      }
    ))
    .pipe(sourcemaps.init())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/js'));
});

gulp.task('js', (cb) => { gulpSequence('compile-js', 'lint-js')(cb); });

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

gulp.task('default', ['watch']);

gulp.task('html', function() {
  gulp.src('src/html/**/*.html')
    .pipe(gulp.dest('app'));
});

gulp.task('images', function() {
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('app/assets/img'));
});

gulp.task('icons', function() {
  gulp.src('src/favicon/**/*')
    .pipe(gulp.dest('app/'));
});

gulp.task('watch', gulpSequence(['css', 'js', 'icons', 'html'], 'browser-sync', function(cb) {
  gulp.watch('src/scss/**/*.scss', ['css', 'bs-reload']);
  gulp.watch('src/js/**/*.js', ['js', 'bs-reload']);
  gulp.watch('src/html/**/*', ['html', 'bs-reload']);
  gulp.watch('src/favicon/**/*', ['icons', 'bs-reload']);
  gulp.watch('src/img/**/*', ['images', 'bs-reload']);
}));
