const webpack = require('webpack');
const path = require('path');
const glob = require("glob");

// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
// production: 最適化された状態で出力される
// development: ソースマップ有効でJSファイルが出力される
const MODE = "development";

const srcDir = "./src/scripts";
const entries = glob.sync("**/**.ts", {
  ignore: "**/_*.ts",
  cwd: srcDir
})
.map(function (key) {
  // [ '**/*.ts' , './src/**/*.ts' ]という形式の配列になるので
  // [ '**' , './src/**/*.ts' ]に変えてエントリーの名前をページ名（フォルダ名）とする
  const entryName = key.split('/');
  return [entryName[0], path.resolve(srcDir, key)];
});
// 配列→{key:value}の連想配列へ変換
const entryObj = Object.fromEntries(entries);
console.log(entryObj);

module.exports = {
  mode: MODE,

  // メインのJS
  entry: entryObj,

  // 出力ファイル
  output: {
    filename: '[name]/main.js',
  },

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ],
      }
    ]
  },

  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],

  devtool: 'source-map',

  watchOptions: {
      ignored: /node_modules/
  },

  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js',
    ],
  },

}