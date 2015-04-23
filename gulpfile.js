var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    reactify = require('reactify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass');

gulp.task('default', function() {
    runSequence('clean', 'build', 'copy');

    watch(['src/**/*.jsx', 'src/**/*.js'], function() {
        gulp.start('build-js');
     });

    watch('src/**/*.scss', function() {
        gulp.start('build-css');
     });
});

gulp.task('copy', function() {
    gulp.src('src/**/*.html', {base: 'src/'})
        .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
    gulp.src('src/**/*.spec.js')
        .pipe(plumber())
        .pipe(mocha());
});

gulp.task('build', function() {
    runSequence('build-js', 'build-css');
});

gulp.task('build-js', function() {
    var b = browserify({
        transform: [reactify],
        debug: true,
        entries: ['./src/main.jsx']
    });
    b.bundle()
        .pipe(source('main.jsx'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-css', function() {
    gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});
