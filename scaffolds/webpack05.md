---
title: 【 Webpack 】分離開發環境與生產環境
tags:
  - 日安初探 Webpack
  - webpack
date: 2018-03-23 23:44:51
---
![](/img/webpack/webpack.png)

新手從無到有，初探 webpack 的心得。
有些套件和 loader 適用在開發環境，但有些適用在生產環境，
那要怎麼去分離，而共同需要的部分又要怎麼去區分呢？
<!-- more -->

原本的`webpack.config.js`檔，我們把它拆解成三個部分。

```
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```
分別是共同版本、開發版本、生產版本。