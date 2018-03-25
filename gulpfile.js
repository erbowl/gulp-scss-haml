var gulp = require('gulp');
var uglify = require('gulp-uglify');
var haml = require('gulp-ruby-haml');
var sass = require('gulp-sass');
var browserSync =require('browser-sync');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');


// hamlタスク設定
gulp.task('haml', function() {
  gulp.src('./src/haml/*.haml')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(haml())
    .pipe(gulp.dest('public'));
});
// 「uglify」タスクを定義する
gulp.task('uglify', function () {
  // タスクを実行するファイルを指定
  gulp.src('./src/js/*.js')
    // 実行する処理をpipeでつないでいく
    .pipe(uglify()) // uglifyを実行
    .pipe(gulp.dest('public')) // 圧縮したファイルをdistに出力
});
// SassとCssの保存先を指定
gulp.task('sass', function(){
  gulp.src('./src/scss/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sass())
    .pipe(gulp.dest('public'));
});

gulp.task('browser-sync', function() {
    return browserSync.init({
        server: './public',
        reloadDelay: 1000
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// watchタスクを定義
gulp.task('watch',['browser-sync'], function() {
  // 監視するファイルと、実行したいタスク名を指定
  gulp.watch('./src/*/*', ['default']);
  gulp.watch('./public/*', ['bs-reload']);
});

gulp.task('default', ['uglify','haml','sass']);
