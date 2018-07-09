---
title: 【Vue】Vue-cli 安裝
tags:
  - Vue
  - 日安初探Vue
date: 2018-03-23 14:32:01
categories: CodingLife 前端技術筆記
photo:
  - '/img/vue/vue.jpg'
---

版本：vue-cli 2.9.3

<!-- more -->

## 安裝
```
$ npm install -g vue-cli // 全域安裝
```

vue-cli ，必須在 node.js 下安裝，
安裝完之後，可以用`vue -v`檢查版本。

```
$ vue list
```

vue-cli 官方提供多種樣版結構，可使用`vue list`查看樣板種類。

```
$ vue init <template-name> <project-name>
```
這邊我們選擇`webpack`版。

```
Generate project in current directory? Yes
? Project name vuecli-demo
? Project description A Vue.js project
? Author // 預設
? Vue build standalone // 預設
? Install vue-router? // 是否安裝 vue-router
? Use ESLint to lint your code? // 是否使用 eslint 檢測js
? Set up unit tests // 使否單元測試
? Setup e2e tests with Nightwatch? //是否使用 e2e 測試
? Should we run `npm install` for you after the project has been created? Yes, use NPM
//在專案創建好，是否跑 npm install 
```

這邊會有像建置`package.json`一樣的選項讓你填寫，這邊我先選預設，並不安裝其他項目。

```
To get started:

  cd vuecli-demo
  npm run dev
```

接下來根據指令到專案資料夾跑 server ，便完成這次安裝。

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

