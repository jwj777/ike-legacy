/*eslint strict: ["error", "global"]*/
'use strict';

//=======================================================
// Include gulp
//=======================================================
var gulp = require('gulp');

//=======================================================
// Include Our Plugins
//=======================================================
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var sourcemaps  = require('gulp-sourcemaps');
var sync        = require('browser-sync');
var babel       = require('gulp-babel');
var rename      = require('gulp-rename');

// Small error handler helper function.
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Export our tasks.
module.exports = {

  // Compile Sass.
  sass: function() {
    return gulp.src('./src/{global,layout,components}/**/*.scss')
      .pipe(
        sass({ outputStyle: 'nested' })
          .on('error', handleError)
      )
      .pipe(prefix({
        cascade: false
      }))
      .pipe(rename(function (path) {
        path.dirname = '';
        return path;
      }))
      .pipe(gulp.dest('./dist/css'))
      .pipe(sync.stream({match: '**/*.css'}));
  },

  // Compile JavaScript.
  js: function() {
    return gulp.src([
      './src/{global,layout,components}/**/*.es6.js'
    ], { base: './' })
      .pipe(
        babel()
          .on('error', handleError)
      )
      .pipe(rename(function (path) {
        // Currently not using ES6 modules so for now
        // es6 files are compiled into individual JS files.
        // Eventually this can use ES6 Modules and compile
        // all files within a component directory into a single
        // foo.bundle.js file. In that case the bundle name should
        // reflect the components directory name.
        path.dirname = '';
        path.basename = path.basename.replace(/\.es6/, '');
        return path;
      }))
      .pipe(gulp.dest('./dist/js'));
  }
};
