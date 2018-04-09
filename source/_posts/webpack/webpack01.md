---
title: 【 Webpack 】認識 webpack
tags:
  - 日安初探 Webpack
  - webpack
date: 2018-03-19 13:43:56
---
![](/img/webpack/webpack.png)

新手從無到有，初探 webpack 的心得。

webpack 的基本介紹、比較，以及如何運用相關套件簡單運行。

版本：webpack 4.1.1

<!-- more -->

## 定義

> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it recursively builds a dependency graph that includes every module your application needs, then packages all of those modules into one or more bundles.


webpack ，簡單來說就是一個模組打包工具，可以將開發中的資料，如html 文件、sass、圖片等資料，
模組化，利用`loader`、`plugin`轉換成瀏覽器可以閱讀的資料並打包。


## 比較

有些人會拿 webpack 跟 gulp 之類的工具做比較，讓我們先看看 gulp 官網的解釋。

> gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something.

gulp ，用於在開發流程中，自動執行較耗時或較痛苦的任務，
意思是 gulp 為任務執行工具，可以通過定義`task`自動化來執行處理任務。

gulp 為任務執行工具，注重的是開發流程； webpack 強調模組化開發，處理壓縮文件、圖片等。

## 安裝

webpack 必須運行在 `node.js` 的環境下。

```
$ npm install -g webpack
```

全域安裝 webpack。

```
webpack -v
```

安裝完後檢測版本，確認是否已經安裝。

## npm 初始化

先進到你要存放的目錄

```
$ mkdir webpack-demo
$ cd webpack-demo
$ npm init
```

接下來會出現`package.json`配置，可以全部 enter 跑預設。

```
name: (webpack-demo)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
```
接下來在`webpack-demo`下面出現`package.json`。

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
這些都是關於這個專案的內容，可以根據專案狀況更改。

```
$ npm install --save-dev webpack
```

接下來在專案上安裝 webpack 。

```json
"devDependencies": {
    "webpack": "^4.1.1"
  }
```

`package.json`就會出現 webpack 的安裝資料。

## 運行 webpack

現在來試著運作 webpack ，在目錄下新增`src/app.js`，內容如下。

```js
console.log('hello webpack');
```

在 terminal 輸入指令。

```
$ webpack ./src/app.js --output ./dist/app.bundle.js
```

目錄資料結構就變成這樣

```
.
├── dist
|   └── app.bundle.js
├── node_modules
├── package.json
└── src
    └── app.js
```

`app.bundle.js`
![](/img/webpack/webpack01.png)


## webpack 指令

### watch

```
webpack --watch ./src/app.js ./dist/app.bundle.js
```
`watch`指令可以監聽檔案狀況做變更。

```
$ webpack -p ./src/app.js ./dist/app.bundle.js
```

`-p`指令可以產出生產版壓縮過的檔案。

如果想看其他指令可以在 terminal 輸入

```
$ webpack --help
```

假設你只有在專案上面安裝 webpack，則輸入

```
$ npx webpack --help 
```

## 配置 webpack

在根目錄創建`webpack.config.js`的檔案，內容如下。

```js
module.exports = {
  entry: './src/app.js',
  output: {
    filename: './app.bundle.js'
  }
};
```
`entry`為 source code，`output`是輸出的目標文件，配置完後，在 terminal 輸入 `webpack` 即可運行。

## 快速下 webpack 指令

```
$ npm install webpack-cli -d
```

安裝`webpack-cli`，再改寫目前的`package.json`。

```json
{
  "name": "wepback-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack -d --watch",
    "prod": "webpack -p"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.8.1"
  }
}
```

改寫之後，在 terminal 輸入指令。

```
$ npm run build
```
則會運行`webpack -d --watch`。
```
$ npm run prod
```
則會運行`webpack -p`。

使用`script`指令的好處是把所有命令集中在一起，方便維護查看，
其他開發者只要看`package.json`就可以知道大概運行的開發指令是什麼。

