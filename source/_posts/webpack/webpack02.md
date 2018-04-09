---
title: 【 Webpack 】plugin 與 loader
tags:
  - 日安初探 Webpack
  - webpack
date: 2018-03-19 14:09:08
---
![](/img/webpack/webpack.png)

新手從無到有，初探 webpack 的心得。

此篇介紹 plugin 及 loader 簡單的使用方法，承襲上一篇的內容，逐步實作做下去。
介紹的 plgin / loader 如下。

- 利用 template 產出 html 
- 載入 css / sass 並另外產出 css 檔並引入
- 在本地端運行伺服器
- 自動清除殘餘檔案
- babel 及 pug 轉譯
- HMR

<!-- more -->

## Plugin 與 loader 介紹

> Plugin 為外掛程式，普遍常用，在這邊不多作介紹。

> Loaders are transformations that are applied on the source code of a module. They allow you to pre-process files as you import or “load” them. Thus, loaders are kind of like “tasks” in other build tools, and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript, or inline images as data URLs. Loaders even allow you to do things like import CSS files directly from your JavaScript modules!

官方網站表明，loader 就像其他前端開發任務建構工具一樣，他可以將 typescript 轉換成 js ，
或是將圖片轉換成內嵌 url ，或是直接在 js 模組中導入 css 文件。


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

 #### 產生 html 檔

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

執行`npm run build`，就會產生`index.html`，並自動載入 js 檔。

#### 自動載入 title

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

#### template

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

```bash
$ npm i -d extract-text-webpack-plugin@next
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


## webpack-dev-server

之前使用的`webpack -d --watch`適合運作在靜態文件上，但在開發狀態`webpack-dev-server`是更好的選擇。

```
$ npm install -g webpack-dev-server // 全域安裝
$ npm install --save-dev webpack-dev-server // 區域安裝
```

接著執行。

```
$ webpack-dev-server
```

![](/img/webpack/webpack03-1.png)

server 執行成功，port 號為 `8080`。

![](/img/webpack/webpack03-2.png)

我們也可以到`webpack.config.js`改 port 號，設定`open:true`，自動打開瀏覽器。

#### proxy

webpack-dev-server 有提供代理伺服器的功能。

```js
module.exports = {
  entry: './src/app.js',
  ...
  devServer: {
    port: 9000,
    open: true,
    proxy: {
          "/api": {
            target: "https://other-server.example.com"
            }
          }
  }
  ...
};
```

為了避免跨域的狀況，當請求 api 的時候，便會呼叫 `target`。

## babel loader

`babel-loader`就是一個轉譯器，將一些瀏覽器不支援的 js 寫法或檔案，轉譯成瀏覽器可以讀取的檔案。

```
$ npm install --save-dev babel-loader
```
在專案下安裝`babel-loader`。

```js
rules: [
      ...,
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
```
便可執行轉譯。

## clean webpack plugin

主要運用在產出檔案前，將原資料夾檔案清空，一開始我們先更改原本的設定。

`webpack.config.js`
```js
...
entry: {
    'app.bundle': './src/app.js'
},
output: {
    path: __dirname + '/dist',
    filename: '[name].[chunkhash].js'
},
...
```
將產出的 js 檔名更改為 hash 值，避免檔名重複出現錯誤。

這時只要修改`src/app.js`，`webpack`就會重新產生一個 js 檔，
因此需要`clean webpack plugin`將原本的舊的檔案清除，如此一來就不會累積過多的舊檔案。

```
$ npm i clean-webpack-plugin --save-dev
```
在專案資料夾，使用 npm 指令安裝。

```js
...
const CleanWebpackPlugin = require('clean-webpack-plugin');
...
...
plugins: [
    new CleanWebpackPlugin(['dist']),
    ...
  ],
```
呼叫套件，並指定清空檔案的資料夾，這時候再使用`npm run build`觀察，此時發現`dist`資料夾下只剩下一隻 js檔。

## pug-html-loader

pug(jade) 是 html 的樣板語言，猶如 sass 和 css 之間的關係，這邊先不多作解釋。

```
$ npm install --save-dev pug pug-html-loader raw-loader
```
先安裝 pug 、 pug-html-loader 和 raw-loader。
加裝 raw-loader 是因為 pug-html-loader 必須依附在這個 loader 下，
google 未果，我不知道為什麼，如果有人知道，歡迎在下方留言告訴我。

```jade
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5)
  body
    h1 Pug - node template engine
    #root
    #container.col
      if youAreUsingPug
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

為了測試是否能正確將 pug 編譯出來，先將`src/index.html`改為`src/index.pug`，
並將內容更改為 pug 的格式，內容如上。

```js
plugins: [
    ...
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      ...
    }),
    ...
  ],
 module: {
    rules: [
      ...
      { test: /\.pug$/, loader: ['raw-loader', 'pug-html-loader'] }
    ]
  }
```
再將`webpack.config.js`進行修改，並下指令運行，便可成功轉譯。

## 使用 HMR 監看修改的 CSS

`webpack --watch`及`webpack-dev-server` 是監聽文件的變化自動刷新瀏覽器，
而 HMR 不是刷新整個瀏覽器，只會讓已經修改的部分，出現修改後的變化。

先將剛剛修改的 pug template 改回 html template。 

```js

const webpack = require('webpack');
...
...
devServer: {
    port: 9000,
    open: true,
    hot: true
  }
...
...
plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
```

修改`webpack.config.js`，並運行。

```
ERROR in chunk app.bundle [entry]
[name].[chunkhash].js
Cannot use [chunkhash] for chunk in '[name].[chunkhash].js' (use [hash] instead)
```
接下來就會爆出錯誤訊息，需要將`chunkhash`改成`hash`。
`chunkhash`是根據 Entry 文件內容，編譯出對應的 hash 值。
`hash`是只要文件內容有更改，當次被編譯出來的相關文件hash都會變更，而且相同。

另外提一個叫`contenthash`，假設`index.css`被`index.js`引用，
但更改的文件只有`index.js`時，會產生`index.css`也會被重新編譯，
如此會產生重複內容的檔案，這時候輸入`contenthash`只要該文件內容不改變，也不會重新編譯。

```js
output: {
    path: __dirname + '/dist',
    filename: '[name].[hash].js'
},
```

接下來將 output 的檔名進行更改，此時運行時你會發現頁面完全不會改變。

```js
new ExtractTextPlugin({
  filename: 'style.css',
  disable: true
}),
```

只要將`ExtractTextPlugin`修改，便可以自動更新頁面，
這意味著產出 css 和 HMR，只能二選一，我們可以將開發環境和生產環境分離，便可以解決。
