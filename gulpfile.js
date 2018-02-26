const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const pkg = require('./package.json');
const replace = require('gulp-replace');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const outDir = 'app';
const env = process.env.ENV;

const includes = [
  { name: 'assets/js/scripts.js', dev: 'assets/js/scripts.js', prod: 'assets/js/scripts.min.js' },
  { name: 'assets/css/style.css', dev: 'assets/css/style.css', prod: 'assets/css/style.min.css' }
];

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

let cssCompile = () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(outDir + '/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package: pkg }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outDir + '/assets/css'))
    .pipe(browserSync.reload({stream: true}));
};
cssCompile.displayName = 'compile-css';
cssCompile.description = 'Builds and moves the SCSS files in the src/scss directory to the app/assets/css directory.';
gulp.task(cssCompile);

let jsLint = () => {
  return gulp.src('src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
};
jsLint.displayName = 'lint-js';
jsLint.description = 'Runs ESLint with semistandard code standard.';
gulp.task(jsLint);

let jsCompile = () => {
  return gulp.src('src/js/**/*.js')
    .pipe(webpack(
      {
        entry: {
          scripts: './src/js/scripts.js'
          // If more than one entrypoint exists, add it here and a new file will be created on build.
        },
        output: {
          filename: '[name].js'
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
    .pipe(header(banner, { package: pkg }))
    .pipe(gulp.dest(outDir + '/assets/js'))
    .pipe(uglify())
    .pipe(header(banner, { package: pkg }))
    .pipe(sourcemaps.write('.'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(outDir + '/assets/js'));
};
jsCompile.displayName = 'compile-js';
jsCompile.description = 'Builds the JavaScript sourcecode with Webpack.';
gulp.task(jsCompile);

let sync = () => {
  return browserSync.init(null, {
    server: {
      baseDir: 'app'
    }
  });
};
sync.displayName = 'browser-sync';
sync.description = 'Initializes browser sync.';
gulp.task(sync);

let reSync = () => {
  return browserSync.reload();
};
reSync.displayName = 'browser-reload';
reSync.description = 'Reloads the page that browser sync serves.';
gulp.task(reSync);

let moveHtml = () => {
  let g = gulp.src('src/html/**/*.html');
  for (let i = 0; i < includes.length; i++) {
    g = g.pipe(replace(includes[i].name, env === 'production' ? includes[i].prod : includes[i].dev));
  }
  return g.pipe(gulp.dest('app'));
};
moveHtml.displayName = 'move-html';
moveHtml.description = 'Moves all static html files from /src to /app.';
gulp.task(moveHtml);

let moveImages = gulp.parallel(
  function moveImg () {
    return gulp.src('src/img/**/*')
      .pipe(gulp.dest(outDir + '/assets/img'));
  },
  function moveFavicon () {
    return gulp.src('src/favicon/**/*')
      .pipe(gulp.dest(outDir + '/'));
  }
);
moveImages.displayName = 'move-images';
moveImages.description = 'Moves images from the /src/img & /src/favicon directories to the /app directory.';
gulp.task(moveImages);

let watchTask = function watch () {
  gulp.watch('src/js/**/*.js').on('all', gulp.series('compile-js', 'lint-js', 'browser-reload'));
  gulp.watch('src/scss/**/*.scss').on('all', gulp.series('compile-css', 'browser-reload'));
  gulp.watch('src/html/**/*').on('all', gulp.series('move-html', 'browser-reload'));
  gulp.watch(['src/favicon/**/*', 'src/img/**/*']).on('all', gulp.series('move-images', 'browser-reload'));
};
watchTask.displayName = 'watch';
watchTask.description = 'Watches files for changes and invokes its given move or compile scripts..';
gulp.task(watchTask);

let build = gulp.series(gulp.parallel('compile-css', 'compile-js', 'move-html', 'move-images'), 'lint-js');
build.displayName = 'build';
build.description = 'Builds the source.';
gulp.task(build);

let defaultTask = gulp.series(
  'build',
  gulp.parallel('browser-sync', 'watch')
);
defaultTask.displayName = 'default';
defaultTask.description = 'Default task. Rebuilds the application and starts the watcher.';
gulp.task(defaultTask);
