// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   `gulp`
//
// *************************************

// -------------------------------------
//   Plugins
// -------------------------------------
//
// gulp               : The streaming build system
// gulp-sass          : Compile Sass files
// gulp-autoprefixer  : Prefix CSS
// gulp-uglify        : Minify JS using Uglify
// gulp-concat        : Concatenate files
// browser-sync       : Live CSS Reload &amp; Browser Syncing
//
// -------------------------------------

// -------------------------------------
//   Dependencies
// -------------------------------------

var gulp          = require('gulp');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync').create();
var babel 				= require("gulp-babel");
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');

// -------------------------------------
//   Primary Task
// -------------------------------------

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'scripts'], function() {
	gulp.watch('src/styles/**/*.scss', ['styles']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/*.html', ['copy-html']);
	gulp.watch('src/*.html').on('change', browserSync.reload);

	gulp.src("src/js/**/*.js")
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dist"));

	browserSync.init({
		server: './dist'
	});
});

// -------------------------------------
//   Individual Tasks
// -------------------------------------

// ----- Dist ----- //

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'scripts',
	'scripts-dist'
]);

// ----- JavaScript ----- //

gulp.task('scripts', function() {
	gulp.src('src/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src('src/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// ----- styles ----- //

gulp.task('styles', function() {
	gulp.src('src/styles/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.stream());
});

// ----- HTML ----- //

gulp.task('copy-html', function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('./dist'));
});

// ----- Images ----- //

gulp.task('copy-images', function() {
	gulp.src('src/img/*')
		.pipe(gulp.dest('dist/img'));
});
