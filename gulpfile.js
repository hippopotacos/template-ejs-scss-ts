/*=========================
sass
=========================*/
// gulpプラグインを読み込みます
const { src, dest, watch, parallel } = require("gulp");
// Sassをコンパイルするプラグインを読み込みます
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

//Sassをコンパイルするタスクです
const compileSass = () =>
    // style.scssファイルを取得
    src("src/scss/**/*.scss")
    // Sassのコンパイルを実行
    .pipe(
         // コンパイル後のCSS
        sass({
            //outputStyle: "expanded"
            outputStyle: "compressed"
        })
    )
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    // cssフォルダー以下に保存
    .pipe(dest("public/assets/css/"));

//Sassファイルを監視し、変更があったらSassを変換します
const watchScss = () => watch("src/scss/**/*.scss", compileSass);


/*=========================
js(webpack)
=========================*/
const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

const bundleJs = () =>
    webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("public/assets/js/"));

const watchJavaScript = () => watch("src/scripts/**/*.ts", bundleJs);


/*=========================
ejs
=========================*/
const rename = require("gulp-rename");
const ejs = require("gulp-ejs");
const replace = require("gulp-replace");

const compileEjs = () =>
    src(["src/ejs/**/*.ejs", "!" + "src/ejs/**/_*.ejs"])
    .pipe(ejs({}, {}, {ext:'.html'}))
    .pipe(rename({ extname: ".html" }))
    .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, "$1"))
    .pipe(gulp.dest("public/"));

const watchEjs = () => watch("src/ejs/**/*.ejs", compileEjs);


/*=========================
実行部分(コマンドnpx gulpを実行時)
=========================*/
exports.default = parallel(watchScss, watchJavaScript, watchEjs);