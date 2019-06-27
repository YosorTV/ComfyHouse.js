const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const mincss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const ghpages = require('gh-pages');
ghpages.publish('dist', function(err) {});
reload = browserSync.reload;

const path = {
    build: {
        html: 'dist/',
        js: 'dist/js',
        css: 'dist/css',
        img: 'dist/img',
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        scss: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
    },
    clean: './dist'
};

const config = {
    server: {
        baseDir: './dist'
    },
    host: 'localhost',
    port: 3000,
    notify: false
}

gulp.task('html:build', () =>
    gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({
        stream: true
    }))
);

gulp.task('js:build', () => 
    gulp.src(path.src.js)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({
        stream: true
    }))
);

gulp.task('scss:build', () =>
    gulp.src(path.src.scss)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(mincss())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({
        stream: true
    }))
);

gulp.task('img:build', () =>
    gulp.src(path.src.img)
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{
            removeViewBox: false
        }],
        use: [pngquant()],
        interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({
        stream: true
    }))
);


gulp.task('build', ['html:build', 'js:build', 'scss:build', 'img:build']);

gulp.task('watch', ['build'], () =>
    gulp.watch(path.src.scss, ['scss:build']),
    gulp.watch(path.src.html, ['html:build']),
    gulp.watch(path.src.js, ['js:build']),
    gulp.watch(path.src.img, ['img:build']),
)

gulp.task('webserver', () =>
    browserSync(config));

gulp.task('clean', (cb) =>
    rimraf(path.clean, cb));

gulp.task('default', ['build', 'webserver', 'watch']);