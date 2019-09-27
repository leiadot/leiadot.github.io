---
title: 【Vue】Vue 與 webpack
tags:
  - Vue
date: 2018-03-26 10:18:05
categories: 前端工程
urlname: vue-cli-2-webpack
description: Vue Cli 2 與 webpack。
photo:
  - '/img/cover/vue.png'
---

版本：vue-cli 2.9.3

<!-- more -->

## 產出的專案資料夾結構

```
.
├── build          // 與 webpack 相關
├── config         // 與 webpack 相關
├── node_modules   // node npm 模組
├── src            // 主要開發環境 source code
|   ├── assets     // 圖片等靜態檔
|   ├── router     // vue 路由器
|   ├── app.vue    // 主要的樣板檔
|   ├── main.js    // 主要的 js 檔，套件 import 的入口文件
|   └── components // vue 元件檔
├── static         // 放置第三方 plugin 位置
├── index.html     // 靜態 html檔
├── package.json
└── package-lock.json
```

當我們使用`npm run dev`啟用 vue-cli 的專案，打開 chrome 的 network 會發現當中除了載入`index.html`，還有一隻`app.js`檔，
可是你會發現專案裡面根本就沒有`app.js`檔，而且`index.html`根本也沒有引入任何的 js 文件。

我們從`npm run dev`開始追根究底，打開`package.json`會發現其中一行 script 指令。

```json
 {
   ...
   "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
   ...
 }
```

看起來我們運作的和`build/webpack.dev.conf.js`非常有關。

```js
const utils = require('./utils');
const webpack = require('webpack'); // webpack 核心編譯工具
const config = require('../config'); // config/index.js
const merge = require('webpack-merge'); // 合併 config
const path = require('path'); // node API 處理文件路徑
const baseWebpackConfig = require('./webpack.base.conf'); //base.config
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
```

打開來會發現裡面有導入很多模組，我們主要看幾個文件，`config/index.js`，仔細看內容。

```js
module.exports = {
  dev: {
    ...
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    ...
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    ...
  }
}
```

裡面分別有`dev`開發版本的基本設定，例如在本地端運行的 port 號 ，或是`build`生產版本的設定，例如首頁的導入設定，
回去看`build`資料夾，裡面有三個 config 檔在不同狀況下讀取不同的檔案，分別是`dev`開發版本、`build`生產版本和`base`共用版本，當中最重要的是`base`，當中有一些 webpack 的基本設定。

```js
...
context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js' // 主要導入的 js
  },
  output: {
    path: config.build.assetsRoot, // 編譯導出的文件路徑 config/index.js
    filename: '[name].js', // 導出文件名稱 [name].js => app.js
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath // 靜態文件的絕對路徑
  },
  resolve: { // import 元件時的設定
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'), // 編寫路徑時 @ 可代替src
    }
  },
  ...// webpack 編譯時，文件處理的相關 loader
  ...
  { // 圖片處理（多媒體及字體以此類推）
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,// 小於10kb會被編譯成 base64 字串打包編譯到 js 文件中
    name: utils.assetsPath('img/[name].[hash:7].[ext]')// 超過大小會被放到/static/img/[圖片名稱].[hash值].副檔名
  }
},
  ...
```

至於為什麼在`static`裡面，可以根據路徑轉向到`utils.js`裡面的`assetsPath`，發現文件又導向`webpack.config.dev/build.js`的`assetsSubDirectory`，發現 template 將路徑設定在`static`。

那剩下關於 webpack plugin/loader 的詳細設定，可以參考[日安初探 webpack 系列文章](https://leiadot.github.io/tags/%E6%97%A5%E5%AE%89%E5%88%9D%E6%8E%A2-Webpack/)。
