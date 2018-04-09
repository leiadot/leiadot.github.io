---
title: 【 NodeJS 】NPM與除錯
tags:
  - NodeJS
  - NodeJS 前後端開發實戰筆記
  - 六角學院
date: 2018-03-01 15:41:13
---
![](/img/nodejs_hexschool.png)

六角學院 2018 首推 Node.js 課程，
日安在這邊會寫下自己簡單的筆記，除了讓自己方便複習，也提供大家參考。

> [NodeJS 前後端開發實戰](http://www.hexschool.com/courses/nodejs.html)

版本：node 8.10.0、npm 5.6.0

<!-- more -->

# NPM

## 甚麼是 npm

node.js 的套件管理工具。node.js 提供核心模組， npm 為其他開發者所設計的模組。

```
$ node -v
$ npm -v
```

可在 terminal 查詢版本號。

## npm init - 開發自己的 package.json

到達專案位置，輸入下列指令新增`package.json`。

```
$ npm init
```
輸入指定內容
```
name: (project) npm-test //專案名稱
version: (1.0.0) //版本號
description: //描述
enter point: (app.js) //主要執行切入的js
test command: //測試程式碼
git repository: //git數據庫
keywords: //關鍵字尋找npm
author: //作者
license: (ISC) //是否為open source
```

## 安裝 npm 流程

在專案位置安裝 npm 套件 - express。

```
$ sudo npm install express --save
```
package.json 會出現
```js
{
  "dependencies": {
    "express": "^4.16.2"
  }
}
```
在執行的 js 檔，導入 express 模組。
```js
var express = require('express');
```

## npm 版本號介紹

**npm:^1.12.0**
1  - 主要版本號
12 - 次要版本號
0: - bug 修正 
^  - 安裝
~  - 安裝 bug 修正
lastest - 最新的版本 

## npm install 的妙用

假設`node_modules`遺失， 在 terminal 的專案位置輸入`npm install`，
npm 會根據`package.json`，安裝回原本的模組資料。

## --save , --save-dev ,-g 差異

--save：安裝模組，並寫入在`package.jon`的`dependencies`，node 應用程式上線會用的 npm ，建議使用此。
--save-dev：安裝模組，並寫入`package.jon`的`devdependencies`，node 應用程式測試用的 npm 程式。
※ jshint、mocha

-g：全域安裝，不會裝在`package.json`，安裝路徑為`user/local/lib/node_modules/`。

## 執行 npm 內容流程

```
$ sudo npm install nodemon -g
```
推薦套件：nodemon - 每次變更後，可以自動儲存更新變更。
```
$ nodemon app.js
```
安裝至全域後，使用 nodemon ，執行 app.js ，
假設有更新， nodemon 會更新執行 js 檔。

## 其他指令

`npm list`：顯示安裝的 NPM 列表

`npm uninstall [模組名稱]`：刪除專案裡的 NPM

# 除錯

## 程式出錯莫驚慌，log 探索自己來

**錯誤訊息**
```
ReferenceError ___ is not defined
at Obj.<anonymous>(路徑)
```
## node 內建除錯模組

```
$ node debug app.js
```
除錯 app.js ，進入 debug 模式。（ctrl+C 離開）

**debug模式指令**
`n`：next，下一行。
`c`：cont，到中斷點。（在 js 中可輸入 `debugger;` 為中斷點）
`repl`：觀察上下文環境內容

## node 內建 chrome dev tools

```
$ node --inspect --debug-brk app.js
```
輸入指令，顯示以下，貼入 chrome 網址列。
```
chrome-devtools://devtools/remote...
```
可使用 chrome 的中斷點除錯工具。

## VS code 定義瀏覽

偵錯時，程式碼右鍵（移至定義/預覽定義）。


## npm 小秘笈

```
$ npm list -g --depth=0 查詢自己的全域套件
$ npx <plugin> --help 查詢區域套件指令 
```





