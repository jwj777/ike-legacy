const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const sassLint = require("gulp-sass-lint");
const eslint = require("gulp-eslint");

function handleError(err) {
  console.log(err.toString());
  this.emit("end");
}

function css() {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sass().on("error", handleError))
    .pipe(
      rename(function (path) {
        path.dirname = "";
        return path;
      })
    )
    .pipe(gulp.dest("./dist/css"));
}

function compress() {
  return gulp
    .src("./src/**/*{.png,.jpg,.svg}")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [
          {
            removeViewBox: false,
          },
        ],
      })
    )
    .pipe(
      rename(function (path) {
        path.dirname = "";
        return path;
      })
    )
    .pipe(gulp.dest("./dist/assets"));
}

function lintCss() {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}

function lintJs() {
  gulp.src("./src/**/*.js").pipe(eslint()).pipe(eslint.format());
}

exports.watch = function () {
  gulp.watch("./sass/**/*.scss", ["sass"]);
};

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
  lintCss();
  lintJs();
  css();
  compress();
  cb();
  js();
}

function lint(cb) {
  lintCss();
  lintJs();
  cb();
}

  // Compile JavaScript.
  function js() {
    return gulp
      .src(
        [
          "./src/{global,layout,components}/**/*.js",
          "./src/{global,layout,components}/**/*.es6.js",
        ],
        { base: "./" }
      )
      .pipe(
        rename(function (path) {
          path.dirname = "";
          path.basename = path.basename.replace(/\.es6/, "");
          return path;
        })
      )
      .pipe(gulp.dest("./dist/js"));
  }

exports.default = build;
exports.lint = lint;
