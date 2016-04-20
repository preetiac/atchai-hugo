var del  = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');


// Vars
var sass_src = 'themes/atchai/static/src/sass/index.sass';
var sass_out = 'themes/atchai/static/dist/css/';
var sass_options = {
	file: 'index.min.css',
	outputStyle: 'expanded',
	sourceMap: true,
	sourceMapEmbed: true
};


// Tasks
gulp.task('default', ['sass']);
gulp.task('sass:clean', function(cb){
	return del([
		sass_out + sass_options.file
	], cb);
});
gulp.task('sass', ['sass:clean'], function(){
	return gulp.src(sass_src)
		.pipe(sass(sass_options).on('error', sass.logError))
		.pipe(rename(sass_options.file))
		.pipe(gulp.dest(sass_out));
});