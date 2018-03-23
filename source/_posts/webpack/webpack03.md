---
title: 【 Webpack 】打包圖片與壓縮
tags:
  - 初探 Webpack
  - webpack
date: 2018-03-23 19:52:11
---
![](/img/webpack/webpack.png)

新手從無到有，初探 webpack 的心得。

打包圖片與壓縮的介紹。

<!-- more -->

新增`src/img/logo.png`，並在 `src/app.scss` 裡面載入背景圖片
`background: url('./img/logo.png') 0 0 no-repeat;`，
執行之後會報錯，因此我們要加裝`file-loader`。


## Sass 載入圖片

### file-loader

```
$ npm install --save-dev file-loader
```

在專案下安裝。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }
    ]
  }
}
```

更改`webpack.config.js`，執行後有效，但發現圖檔名為 hash 值，因此我們更改`option`。

```js
test: /\.(gif|png|jpe?g|svg)$/i,
use: [
  {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'images/'
    }
  },
```
- name：採用 source 檔名
- ext：副檔名
- outputPath：輸出檔案資料夾

## Html 載入圖片

```
$ npm install --save-dev html-loader
```
這時候又發現沒有辦法在 html 載入圖片，因為缺少一個在 html 中處理圖片的 loader，因此用上述指令安裝。

```js
{
  test: /\.html$/,
  use: [ {
    loader: 'html-loader',
    options: {
      minimize: true
    }
  }],
}
```

新增一個 loader，更改`webpack.config.js`設定。

## 壓縮圖片

```
$ npm install image-webpack-loader --save-dev
```

安裝`image-webpack-loader`。

```js
{
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: './img/'
            }
        },
        {
            loader: 'image-webpack-loader',
            options: {
                bypassOnDebug: true,
            }
        }
    ]
}
```

更改`webpack.config.js`裡面`file-loader`的設定。

```
$ ls -lh src/img
$ ls -lh dist/img
```
輸入指令可以查看圖片大小的落差，有些圖片太小會比較沒有感覺。

另外如果要在 js 檔使用圖片，則須在 js 內引入`import img from './img/logo.png';`。





