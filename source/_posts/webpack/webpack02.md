---
title: 【 Webpack 】plugin 與 loader
category: 初探 Webpack
tags:
  - webpack
date: 2018-03-19 14:09:08
---
![](/img/webpack/webpack.png)

新手從無到有，初探 webpack 的心得。

此篇介紹 plugin 及 loader 簡單的使用方法。

<!-- more -->

 ## 使用 html-webpack-plugin

 ```
 $ npm install --save-dev html-webpack-plugin
 ```

 在專案資料夾執行命令安裝，安裝完成後，會在`package.json`檔案下發現

 ```json
 "devDependencies": {
    "html-webpack-plugin": "^3.0.6",
    "webpack": "^4.1.1"
  }
 ```

 ### 產生 html 檔

 將`webpack.config.js`更改如下。

 ```js
 var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'app.bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};

```

執行`npm run bulid`，就會產生`index.html`，並自動載入 js 檔。

### 自動載入 title

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'app.bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    title: "hello world"
  })]
};
```
更改`webpack.config`後，標題則會自己更換，但為了不要一個個文件標題都要自行更改，必須使用到 template 。

### template

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'hello world',
        template: './src/index.html',
        filename: 'index.html',
        minify: {
            collapseWhitespace: true,
        },
    })]
};
```
更改`webpack.config`後，新增`src/index.html`的 template 樣板。

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
</body>
</html>
```

執行`npm run build`，因為`minify: {collapseWhitespace: true,},`，
所以輸出的 html 為壓縮形式沒有空格。

```html
<html lang="en"><head><meta charset="UTF-8"><title>hi</title></head><body><script type="text/javascript" src="app.bundle.js"></script></body></html>
```

## loader 介紹

> Loaders are transformations that are applied on the source code of a module. They allow you to pre-process files as you import or “load” them. Thus, loaders are kind of like “tasks” in other build tools, and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript, or inline images as data URLs. Loaders even allow you to do things like import CSS files directly from your JavaScript modules!

官方網站表明，loader 就像其他前端開發任務建構工具一樣，他可以將 typescript 轉換成 js ，
或是將圖片轉換成內嵌 url ，或是直接在 js 模組中導入 css 文件。

## css-loader / style-loader

新增`src/app.css`
```css
body {
  background: pink;
}

```
變更`src/app.js`
```js
import css from './app.css';

console.log("hello world");
```

在一般沒有加裝 loader 的狀況下，webpack 沒有辦法處理 css 文件，
此時執行`npm run build`則會出現錯誤。

```
$ npm install --save-dev css-loader style-loader
```
因此加裝`css-loader`及`style-loader`。

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'app.bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
  })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};
```

然後變更`webpack.config.js`，運行`npm run build`，
再用瀏覽器打開`dist/index.html`，則會發現 css 已經載進 html 頁面。

`test: /\.css$/`表示他是處理 css 文件，在處理 css文件時，則是由陣列右邊執行到陣列左邊（裝飾模式）。
`css-loader`先解析處理，再由`style-loader`則會將 css 嵌入 html。

## sass-loader



```scss
body {
  background: pink;
  p {
    color: red;
  }
}

```
將`app.css`更改為`app.scss`，並修改為巢狀。

```js
import css from './app.scss';

console.log("hello world");
```
更改`app.js`。
```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
</head>
<body>
  <p>hello world</p>
</body>
</html>
```
`src/index.html`輸入`p`段落文字。

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'app.bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
  })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
};
```
更改`webpack.config.js`，則可運行 sass ，打開 source code 會發現裡面只有載入`app.bundle.js`，但有時候需要將 css 和 js 分離，則使用`extract-text-webpack-plugin`。

## extract-text-webpack-plugin

```
$ npm i -D extract-text-webpack-plugin@next
```
安裝套件。

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
        }),
        new ExtractTextPlugin('style.css')
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'sass-loader']
            })
        }]
    }
};
```

更改`webpack.config.js`後，執行`npm run build`，則會發現`index.html`另外載入`style.css`。