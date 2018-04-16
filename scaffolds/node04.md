---
title: 【 NodeJS 】Firebase 資料庫（上）
tags:
  - NodeJS
  - NodeJS 前後端開發實戰筆記
  - 六角學院
date: 2018-04-10 15:26:02
---
![](/img/nodejs_hexschool.png)

六角學院 2018 首推 Node.js 課程，
日安在這邊會寫下自己簡單的筆記，除了讓自己方便複習，也提供大家參考。

> [NodeJS 前後端開發實戰](http://www.hexschool.com/courses/nodejs.html)

版本：node 8.10.0、npm 5.6.0、firebase realtime database

<!-- more -->

## 在 firebase 上，即時顯示物件資料

```js
const ref = firebase.database().ref();
ref.on('value',function(snapshot){
  const path = document.getElementById('content');
  path.textContent = JSON.stringify(snapshot.val(),null,3);
  // 轉成字串值、過濾字串、縮排
})
```

## forEach、orderByChild 資料排序

```js
people.orderByChild('old').on('value',
(snapshot)=> snapshot.forEach(
    (item)=>item.val())
);
```
路徑>>排序('屬性')>>讀取>> forEach 依序撈出資料
先抓取路徑，執行排序、讀取，再由`forEach`依序撈出資料。

## orderByChild 資料排序規則

1. 當子鍵值為`null`
2. `false`
3. `true`
4. 數字由小到大
5. 字串字母排序
6. 物件

## startAt、endAt、equalTo 搜尋區間規則或相等數值
```js
people.orderByChild('weight').startAt(55).endAt(70).on('value',
(snapshot)=> snapshot.forEach(
    (item)=>item.val())
);
```
路徑>>排序('屬性')>>讀取>>過濾>> forEach 依序撈出資料

## limit 限制筆數

```js
people.orderByChild('weight').startAt(55).limitToFirst(3).on('value',
(snapshot)=> snapshot.forEach(
    (item)=>item.val())
);
```

`limitToFirst(n);`為撈出前 n 筆資料，`limitToLast(n);`為撈出後 n 筆資料。
路徑>>排序('屬性')>>讀取>>過濾>>限制筆數>>forEach 依序撈出資料

## newDate()

```js
const time = new Date();
time.getFullYear();
// 2018
time.getMonth();
// 3，索引從 0 開始

```
為了瞭解資料建立時間，必須先瞭解 js 原生時間語法。

## timeStamp 時間戳記

timeStamp 是從 unix 時間至今所經過的時間毫秒，可將時間格式放入`new Date();`中取得。

## UI 時間介接

```js
const now = new Date();
const time = now.setHours(0,0,0,0);
```

使用`setHours`可將現在時間轉換成 timeStamp。

## reverse 資料翻轉調整

```js
todos.on('value',(snapshot)=>{
  let str = '';
  let data = [];
  snapshot.forEach((item)=>{
    data.push(item.val());
  });

  data.reverse();

  for(let item in data){
    str+=`<li>${data[item].content}</li>`
  }

  list.innerHTML = str;

})
```

使用`forEach`依序撈出資料，放入空陣列，反轉資料後再顯示。