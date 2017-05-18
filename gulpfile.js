var gulp = require('gulp');
var clean = require('gulp-clean');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var config = require('./config.js');
var filePath = config.filePath;
var version = config.version;

// copy图片
gulp.task('buildCopyImg', function () {
    return gulp.src('./images/**/**').pipe(gulp.dest('./dist/'+version+'/images'));
});

// 合并css js
gulp.task('merge',function(){
    for(var item in filePath){
        if(item.indexOf('.css') >= 0){
            gulp.src(filePath[item])
                .pipe(concat(item))
                .pipe(minifyCss())
                .pipe(gulp.dest('./dist/'+version+'/css'));
        }else if(item.indexOf('.js') >= 0){
            gulp.src(filePath[item])
                .pipe(concat(item))
                .pipe(uglify())
                .pipe(gulp.dest('./dist/'+version+'/js'));
        }
    }
});

gulp.task('clean',function(){
    // src的第二个参数的{read:false}，是不读取文件,加快程序。
    return gulp.src('./dist/'+version, {read : false})
        .pipe(clean());
});

gulp.task('build', ['clean'], function(){
    gulp.start('merge', 'buildCopyImg');
});