---
title: 【 NodeJS 】NodeJS 介紹與模組原理
tags:
  - NodeJS
  - NodeJS 前後端開發實戰筆記
  - 六角學院
date: 2018-02-28 10:53:02
---
![](/img/nodejs_hexschool.png)

六角學院 2018 首推 Node.js 課程，
日安在這邊會寫下自己簡單的筆記，除了讓自己方便複習，也提供大家參考。

> [NodeJS 前後端開發實戰](http://www.hexschool.com/courses/nodejs.html)

版本：node 8.10.0、npm 5.6.0

<!-- more -->

# NodeJS 介紹

## V8 引擎介紹

v8 為 javascript 引擎，可執行 javascript 程式碼，NodeJS 仰賴 v8 引擎，chrome 瀏覽器也同為 v8 引擎開發。

NodeJS 無法仰賴 GUI 圖形界面，須了解基本命令提示字元指令：
```
cd 移動路徑
cd .. 回到上一層
dir (win)瀏覽所在目錄
ls  (mac)瀏覽所在目錄
```

## 使用 NodeJS 編譯核心

安裝 NodeJS 後，輸入`node`+`enter`，可以寫入 javascript 程式碼，跳出nodeJS環境，可輸入`ctrl`+`C`。

## 透過 NodeJS 執行 JS 檔案
1. 命令提示字元先到專案位置到`app.js`檔的資料夾。
2. 輸入`node app.js`，即執行。

## 使用 VS Code 執行與除錯 NodeJS
1. VS Code 偵錯功能（Ctrl+Shift+D），下中斷點按下執行控制鍵，可讓偵錯主控台會顯示。

# Node 模組原理

## Global 全域物件
瀏覽器的全域物件為`window`，`global`為 NodeJS 的全域物件，但受限於檔案內讀取，
無法讓`global`繼承，因為 NodeJS 讓 js 為單一檔案模組化，不希望隨意污染全域變數。

## require、module exports 模組設計

```
project┬ app.js
       └ data.js
```

**如何在`app.js`取用`data.js`的變數**

```js
@app.js
var content = require('./data');
// ./ 同層取用 data

console.log(content);
// 1
```
```js
@data.js
var data = 1;

module.exports = data;
// ./ 匯出資料
```

或將資料改成物件格式

```js
@data.js
var data = 2;

module.exports = {
  content:data;
  title:'title';
};
```
則輸出
```js
@app.js
var content = require('./data');
console.log(content);

// { content:2;  title:'title';}
```

## exports 模組設計

```js
@data.js

exports.data = 2;
```

```js
@app.js

var content = require('./data');
console.log(content.data);

// { data:2; }
```

所以 `exports.data = 2`等同於`module export = { data:2; }`，無法共用。

## NodeJS 核心模組 - createServer

NodeJS 有內建的核心模組，例如`http`。

```js
var http = require('http');
http.createServer(function(request, response){
  console.log(request); //使用者請求，顯示使用者相關資訊
  response.writeHead(200,'{"Content-Type":"text/plain"}'); //回傳格式 （文字）
  response.write('hello!!'); //文字內容
  response.end(); //結束請求
}).listen(8080); //監聽port
```

|常用通訊埠 port 代號|
|---|
|FTP：21|
|http：80|
|遠端桌面：3389|

## __dirname、__filename

__dirname：資料夾路徑名稱
__filename：檔案名稱

## Node 模組 - Path

```js
var path = require('path');

console.log(path.dirname('xx/yy/zz.js')); //輸出資料夾路徑
console.log(path.join(__dirname,'/xx')); //合併路徑
console.log(path.basename('xx/yy/zz.js')); //抓檔名
console.log(path.extname('xx/yy/zz.js')); //抓副檔名
console.log(path.parse('xx/yy/zz.js'))//分析路徑

//xx/yy
//Desktop/project/xx
//zz.js
//.js
//{root:'/', dir:'/xx/yy', base:'zz.js',ext:'.js',name:'zz'}
```

> [ Node.js Path API ](https://nodejs.org/api/path.html)
