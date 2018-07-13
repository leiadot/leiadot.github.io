---
title: 【Webpack】source-map
tags:
  - Webpack
date: 2018-03-23 23:19:20
categories: CodingLife 前端技術筆記
photo:
- '/img/webpack/webpack.png'
---

新手從無到有，初探 webpack 的心得。

有時候看到別人的`webpack.config.js`會看到一段`devtool: 'source-map'`，
不太了解這是什麼，也不太了解那有什麼用處，現在就來看看。

版本：webpack 4.1.1

<!-- more -->

因為有時候要檢查出錯的程式碼，但是從 webpack 產出的檔案都是已經被編譯過的，
就算找到 bug 位置，可是不知道具體 source code 位置，還是沒辦法做即時修正。

## 一、在 js 中使用

```js
module.exports = {
  entry: {
    ...
  },
  devtool: 'source-map'
}
```

修改`webpack.config.js`，開發者工具會連結到`src/app.js` 有 bug 的位置。

## 二、在 css 中使用

```js
{
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      //resolve-url-loader may be chained before sass-loader if necessary
      use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
  })
}
```
一樣修改`webpack.config.js`，就會在開發者工具 css 的部份看到 `app.scss`。


