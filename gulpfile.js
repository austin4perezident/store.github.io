'use strict';

// gulpfile.js

// Define variables.
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var cleancss     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var imagemin     = require('gulp-imagemin');
var notify       = require('gulp-notify');
var postcss      = require('gulp-postcss');
var rename       = require('gulp-rename');
var run          = require('gulp-run');
var runSequence  = require('run-sequence').use(gulp);
var sass         = require('gulp-ruby-sass');
var uglify       = require('gulp-uglify');
var stripDebug   = require('gulp-strip-debug');

// Include paths file.
var paths = require('./_assets/gulp_config/paths');

// Processes SCSS.

// Processes critical CSS, to be included in head.html.
gulp.task('build:styles:critical', function() {
    return sass(paths.sassFiles + '/critical.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    }).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleancss())
        .pipe(gulp.dest('_includes'))
        .on('error', gutil.log);
});

// Processes remaining CSS
gulp.task('build:styles:main', function() {
  // Compile SCSS, run autoprefixer, and minify CSS.
  return sass(paths.sassFiles + '/app.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    }).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleancss())
        .pipe(gulp.dest(paths.jekyllCssFiles))
        .pipe(gulp.dest(paths.siteCssFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

// Builds all styles.
gulp.task('build:styles', ['build:styles:main', 'build:styles:critical']);

// Deletes CSS.
gulp.task('clean:styles', function(callback) {
    del([paths.jekyllCssFiles + 'app.css',
        paths.siteCssFiles + 'app.css',
        '_includes/critical.css'
    ]);
    callback();
});

// Processes JS.
gulp.task('build:scripts', function() {
  // Concatenate and uglify JS.
  return gulp.src([
  			 paths.jsFiles + '/lib' + '/jquery.min.js',
  			 paths.jsFiles + '/lib' + '/jquery.validate.min.js',
  			 paths.jsFiles + '/lib' + '/additional-methods.min.js',
  			 paths.jsFiles + '/lib' + '/bootstrap.min.js',
         paths.jsFiles + '/lib' + '/js.cookie.min.js',
         paths.jsFiles + '/*.js'
     ])
         .pipe(stripDebug())
         .pipe(concat('app.js'))
         .pipe(uglify())
         .pipe(gulp.dest(paths.jekyllJsFiles))
         .pipe(gulp.dest(paths.siteJsFiles))
         .on('error', gutil.log);
});

// Deletes processed JS.
gulp.task('clean:scripts', function(callback) {
    del([paths.jekyllJsFiles + 'app.js', paths.siteJsFiles + 'app.js']);
    callback();
});

// Copies fonts.
gulp.task('build:fonts', ['bootstrap', 'fonts']);

// Places bootstrap fonts in proper location.
gulp.task('bootstrap', function() {
    return gulp.src(paths.fontFiles + '/bootstrap/**.*')
        .pipe(rename(function(path) {path.dirname = '';}))
        .pipe(gulp.dest(paths.jekyllFontFiles + '/bootstrap/'))
        .pipe(gulp.dest(paths.siteFontFiles + '/bootstrap/'))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

// Places fonts in proper location.
gulp.task('fonts', function() {
    return gulp.src(paths.fontFiles + '/fonts/**.*')
        .pipe(rename(function(path) {path.dirname = '';}))
        .pipe(gulp.dest(paths.jekyllFontFiles))
        .pipe(gulp.dest(paths.siteFontFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

// Deletes processed fonts.
gulp.task('clean:fonts', function(callback) {
    del([paths.jekyllFontFiles, paths.siteFontFiles]);
    callback();
});

// Optimizes images.
gulp.task('build:images', function() {
  // Run imagemin.
  return gulp.src(paths.imageFilesGlob)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});

// Deletes processed images.
gulp.task('clean:images', function(callback) {
    del([paths.jekyllImageFiles, paths.siteImageFiles]);
    callback();
});

// Runs jekyll build command.
gulp.task('build:jekyll', function() {
  // Run bundle exec jekyll build with appropriate config file.
  var shellCommand = 'bundle exec jekyll build --config _config.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Deletes the entire _site directory.
gulp.task('clean:jekyll', function(callback) {
    del(['_site']);
    callback();
});

// Main clean task.
// Deletes _site directory and processed assets.
gulp.task('clean', ['clean:jekyll',
    'clean:fonts',
    'clean:scripts',
    'clean:styles',
    'clean:images']);

// Builds site anew.
gulp.task('build', function(callback) {
  // Run all build tasks.
  runSequence('clean',
        ['build:scripts', 'build:styles', 'build:fonts', 'build:images'],
        'build:jekyll',
        callback);
});

// Default Task: builds site.
gulp.task('default', ['build']);

// // Serves site and watches files.
// gulp.task('serve', ['build'], function() {
//   // Watch for changes and run appropriate build tasks when needed.
// });

// var gulp = require('gulp');
// var sass = require('gulp-sass');

// gulp.task('sass', function () {
//   return gulp.src('../css/*.?(s)css')
//     .pipe(sass({
//             outputStyle: 'compressed'
//         }).on('error', sass.logError))
//     .pipe(gulp.dest('/css'));
// });

// gulp.task('default', ['sass']);

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });