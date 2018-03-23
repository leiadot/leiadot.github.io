---
title: 【 NodeJS 】Firebase 資料庫
tags:
  - NodeJS
  - NodeJS 前後端開發實戰筆記
  - 六角學院
date: 2018-03-04 22:36:12
---
![](/img/nodejs_hexschool.png)

六角學院 2018 首推 Node.js 課程，
日安在這邊會寫下自己簡單的筆記，除了讓自己方便複習，也提供大家參考。

> [NodeJS 前後端開發實戰](http://www.hexschool.com/courses/nodejs.html)

<!-- more -->

# firebase
免費版在空間上及效能上相當足夠，須申請 google 帳號。 

## 環境講解
1. 建立專案
2. 選擇將 firebase 加入網路應用程式
3. 將 code 貼入 html head 標籤中，做 firebase 初始化

## ref 路徑、 set 新增
- ref：尋找資料庫路徑
- set：新增資料

寫入資料，如果`ref`沒有指定路徑，會從根目錄往下尋找。
```js
firebase.database.ref().set('hi');
```
※ 如果你沒有驗證通過，仍然無法寫入資料。

firebase 全部為**物件**格式，不能為陣列內容。

```js
firebase.database().ref('student1/name').set(
  {
student1:{
    name:'tom',
    num:'1'
  },
  student2:{
    name:'john',
    num:'2'
  }
  });
```
則根目錄會新增兩個`student`物件，若更改物件內容，如下。
```js
firebase.database().ref('student1/name').set('bob');
```
則`tom`則會被替換為`bob`。

