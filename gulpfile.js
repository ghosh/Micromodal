const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const webserver = require('gulp-webserver');
const imagemin = require('gulp-imagemin');

const plugins = [postcssImport(), autoprefixer({browsers: ['> 1%'], cascade: false}), cssnano()];
const port = 5000;
const URL = `/dist/index.html`;

/************************************************************************************
 * The css task for making @import inline, autoprefixing and minifying              *
 ************************************************************************************/

gulp.task('css', () => {
    gulp.src('src/css/*')
        .pipe(postcss(plugins))
        .on('error', function (err) {
            console.log(err.message); //output message with error and line number
            this.emit('end');
        })
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist'));
});


/************************************************************************************
 * The webserver task will start server and livereload                              *
 ************************************************************************************/

gulp.task('webserver', () => {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            port: port,
            open: URL
        }));
});


/************************************************************************************
 * The task to optimize images and copy to dist/images                              *
 ************************************************************************************/

gulp.task('images', () => {
    gulp.src('src/images/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/images'));
});


/************************************************************************************
 * The default tasks (called when you run `gulp` from cli)                          *
 ************************************************************************************/

gulp.task('default', ['webserver']);


/************************************************************************************
 * Rerun or watch the task when a CSS file changes                                  *
 ************************************************************************************/

gulp.task('css:watch', () => {
    gulp.watch('src/css/*.css', ['css']);
});


/************************************************************************************
 * Run this task to make project production ready                                   *
 ************************************************************************************/

gulp.task('build', ['css', 'images']);