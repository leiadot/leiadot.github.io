---
title: 【 Webpack 】分離開發環境和生產環境
tags:
  - webpack
date: 2018-03-20 13:13:08
---
![](/img/webpack/webpack.png)

分離開發環境和生產環境，
在開發環境中 run 本地端 server；
在生產環境中，打包圖片

<!-- more -->

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

## proxy

webpack-dev-server 有提供代理伺服器的功能。

```js
devServer: {
    port: 9000,
    open: true,
    proxy: {
          "/api": {
            target: "https://other-server.example.com"
            }
          }
  }
```

為了避免跨域的狀況，當請求 api 的時候，便會呼叫 `target`。