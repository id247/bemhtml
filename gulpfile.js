const gulp = require('gulp');
const concat = require('gulp-concat');
const bemxjst = require('gulp-bem-xjst');
const bemhtml = bemxjst.bemhtml;
const bemtree = bemxjst.bemtree;
const path = require('path');
const thru = require('through2');
const gulpEval = require('gulp-eval');
const rename = require('gulp-rename');



gulp.task('bemhtml', function() {
  return gulp.src('*.blocks/**/*.bemhtml.js') // Собираем все шаблоны без учета порядка
	.pipe(concat('all.js')) // Склеиваем в один файл
	.pipe(bemhtml()) // Компилируем и добавляем ядро
	.pipe(gulp.dest('temp')); // Сохраняем в dist
});

gulp.task('bemtree', function() {
  return gulp.src('*.blocks/**/*.bemtree.js') // Собираем все шаблоны без учета порядка
	.pipe(concat('all.js')) // Склеиваем в один файл
	.pipe(bemtree()) // Компилируем и добавляем ядро
	.pipe(gulp.dest('temp')); // Сохраняем в dist
});

gulp.task('html', function() {
	const BEMHTML = require('./temp/all.bemhtml.js');
	const BEMTREE = require('./temp/all.bemtree.js');
  	return gulp.src('desktop.bundles/**/*.bemjson.js') // Собираем все bemjson файлы страниц
  	.pipe(gulpEval())
  	.pipe(thru.obj(function(file, enc, cb) {
	 	// Применяем шаблоны и переименовываем в html
		try {
	  		file.contents = new Buffer(BEMHTML.apply(BEMTREE.apply(file.data)));
		} catch (e) {
			// Сохраняем ошибку, чтобы проще было отлаживать
			console.error(e);
			file.contents = new Buffer(String(e.stack));
		}
		file.path = path.join(path.dirname(file.path), path.basename(file.path).split('.')[0] + '.html');
	  	cb(null, file);
	}))
	.pipe(rename({dirname: ''}))
	.pipe(gulp.dest('dist')); // Сохраняем в dist
});


gulp.task('default', ['bemhtml', 'bemtree', 'html']);