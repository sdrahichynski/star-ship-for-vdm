'use strict';

var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		autoprefixer = require('gulp-autoprefixer'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		sass = require('gulp-sass'),
		watch = require('gulp-watch'),
		riraf = require('rimraf'),
		reload = browserSync.reload;

var path = {
		build: {
				html: 'build/',
				js: 'build/js/',
				css: 'build/css/',
				img: 'build/img/',
				fonts: 'build/fonts/'
		},
		src: {
				html: 'src/*.html',
				js: 'src/js/main.js',
				scss: 'src/scss/main.scss',
				img: 'src/img/**/*.*',
				fonts: 'src/fonts/**/*.*'
		},
		watch: {
				html: 'src/**/*.html',
				js: 'src/js/**/*.js',
				scss: 'src/scss/**/*.scss',
				img: 'src/img/**/*.*',
				fonts: 'src/fonts/**/*.*'
		},
		clean: './build'
};


var config = {
		server: {
				baseDir: "./build"
		},
		tunnel: false,
		host: 'localhost',
		port: 9000,
};


gulp.task('webserver', function () {
		browserSync(config);
});

gulp.task('html:build', function(){
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('scss:build', function(){
	gulp.src(path.src.scss)
		.pipe(sass())
		.pipe(autoprefixer({cascade: true, indentation: "tabs"
		}))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
		gulp.src(path.src.img)
			.pipe(imagemin({
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()],
					interlaced: true
			}))
			.pipe(gulp.dest(path.build.img))
			.pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
		gulp.src(path.src.fonts)
			.pipe(gulp.dest(path.build.fonts))
});

gulp.task('js:build', function() {
		gulp.src(path.src.js)
				.pipe(gulp.dest(path.build.js))
				.pipe(reload({stream: true}));
});

gulp.task('build', [
		'html:build',
		'js:build',
		'scss:build',
		'fonts:build',
		'image:build'
]);

gulp.task('watch', function(){
		watch([path.watch.html], function(event, cb) {
				gulp.start('html:build');
		});
		watch([path.watch.scss], function(event, cb) {
				setTimeout(function()
					{
						gulp.start('scss:build');
					}, 200);
		});
		watch([path.watch.js], function(event, cb) {
				gulp.start('js:build');
		});
		watch([path.watch.img], function(event, cb) {
				gulp.start('image:build');
		});
		watch([path.watch.fonts], function(event, cb) {
				gulp.start('fonts:build');
		});
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);