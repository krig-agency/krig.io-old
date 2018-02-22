# krig.io
Website for KRIG community.

* Development: http://knacka.krig.io/ (knacka branch)
* Production: http://krig.io/ (master branch)

## Get started

1. Clone or download repo.
2. Make sure your got [Node.js](http://nodejs.org/download), [Sass](http://sass-lang.com/tutorial.html), [Git](http://git-scm.com) and latest [Gulp-cli](https://www.npmjs.com/package/gulp-cli) installed globally on your local machine.
3. Run `yarn install` in your project directory.
4. Run `gulp` to fire up browsersync and watching files.

## Info

The application uses the Gulp4 package (which is still in beta) to enable better series and parallel builds.  
To run gulp 4, the latest (1.4.0+) gulp-cli package is required to be installed globally or accessed from the `node_modules/.bin` dir.  

To list all available gulp tasks, type `gulp --tasks` in the terminal. To start the default task, just run the `gulp` command and let the script build and watch for changes.

The `/app` directory is only intended for files built by gulp.  
All code edits are supposed to be made in the `/src` directory.

WebPack is used for JavaScript, the language level is set to 2017, and it will compile the code to ES5 on build.  
The JS entrypoint is in the `/src/js/scripts.js` file.  
To add a new entrypoint, check the `compile-js` task in the gulpfile.
