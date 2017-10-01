const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');


// The css task for making @import inline, autoprefixing and minifying
gulp.task('css', () => {
  var plugins = [postcssImport(), autoprefixer({browsers: ['> 1%'], cascade: false}), cssnano()];
  return gulp.src('assets/styles/style.css')
    .pipe(postcss(plugins))
    .pipe(rename('site.min.css'))
    .pipe(gulp.dest(''));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['css']);


// Rerun the task when a file changes
gulp.task('watch', () => {
  gulp.watch('assets/styles/*.css', ['css']);
});
