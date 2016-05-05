"use strict";

const gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer-stylus'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jpegtran = require('imagemin-jpegtran'),
    plumber = require('gulp-plumber'),
    webserver = require('gulp-webserver'),
    ts = require('gulp-typescript'),
    argv = require('yargs').argv;

const BUILD_PATH = '../StaticResources/CC_Assets_CW/App';

gulp.task('stylus', () => {
    gulp.src('./assets/styl/main.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [
                autoprefixer({browsers: ['> 1%', 'IE 8']})
            ]
        }))
        .pipe(sourcemaps.write())
        .pipe(plumber())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('icon-font', () => {
    gulp.src(['./assets/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: 'johnson',
            path: './_icons.styl',
            targetPath: '../../../assets/styl/icons.styl',
            fontPath: '../fonts/johnson/'
        }))
        .pipe(iconfont({
            fontName: 'johnson',
            // prependUnicode: true,
            formats: ['ttf', 'eot', 'woff'],
            timestamp: Math.round(Date.now() / 1000),
            normalize: true,
            fixedWidth: true,
            centerHorizontally: true,
        }))
        .on('glyphs', (glyphs, options) => {
            console.log(glyphs, options);
        })
        .pipe(plumber())
        .pipe(gulp.dest('./build/fonts/johnson'));
});

gulp.task('imagemin', () => {
    gulp.src('./assets/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant(), jpegtran()]
        }))
        .pipe(plumber())
        .pipe(gulp.dest('./build/images'));
});

gulp.task('typescript', () => {
    let tsProject = ts.createProject('./tsconfig.json');
    let tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./build/js'));
});

gulp.task('serve', () => {
    gulp.src('./build')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            directoryListing: true
        }));
});

gulp.task('relocate-resources', () => {
    gulp.src('./build/**/*')
        .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('watch', () => {

    gulp.watch(['./assets/styl/**.styl', './assets/styl/Stylistic/styl/**/*.styl'], ['stylus']);
    gulp.watch('./assets/typescript/**.ts', ['typescript']);
    gulp.watch('./assets/icons/**/*.svg', ['icon-font']);
    gulp.watch('./assets/images/**/*', ['imagemin']);

    if (argv.prod || argv.P) {
      gulp.watch(['./assets/styl/**.styl', './assets/styl/Stylistic/styl/**/*.styl'], ['stylus', 'relocate-resources']);
      gulp.watch('./assets/typescript/**.ts', ['typescript', 'relocate-resources']);
      gulp.watch('./assets/icons/**/*.svg', ['icon-font', 'relocate-resources']);
      gulp.watch('./assets/images/**/*', ['imagemin', 'relocate-resources']);
    }
});

gulp.task('default', () => {
    gulp.start('icon-font', 'stylus', 'typescript', 'imagemin', 'watch', 'serve');
});
