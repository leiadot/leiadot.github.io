---
title: 【JS】事件循環 Event-loop
urlname: javascript-event-loop
tags:
  - JavaScript
categories: Front-end
photos:
  - '/img/cover/javascript.jpg'
description: 了解 JavaScript 中 Event-loop 的運作。
date: 2018-07-23 12:20:31
modified: 2018-07-23 12:20:31
---

javascript 身為一個單線程語言，我們必須了解他在運行事件的方法是如何，才能避免一些值在錯誤的時機出現。

<!--more-->

> 程式碼擷取自 [Philip Roberts: What the heck is the event loop anyway?](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)

在了解事件循環前，必須先瞭解幾個專有名詞。

## 單線程 single threaded

意味同一時間，只能做一件事。在 javascript 裡面，則是會依據順序堆疊（stack）執行，而且一次只能執行一段程式碼。

## stack 堆疊

執行堆疊，javascript 為單線程，因此在進入函式中執行程式碼，該函式會被加在堆疊最上方，直到函式執行完成後被抽離堆疊，下方程式碼為堆疊範例。

```js
function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  let squared = square(n);
  console.log(squared);
}

printSquare(4);
```

## 無窮迴圈

如果執行無窮迴圈，堆疊會不斷增加到瀏覽器出現錯誤為止。

```js
function foo() {
  return foo();
}

foo();
```

## Blocking 阻塞

當瀏覽器進行同步請求，在等待期間的狀態，就稱為 **blocking**，blocking 狀態會使瀏覽器形成假死狀態，所有動作無法運行，因此為了避免 blocking 的狀況，所以一般使用非同步請求，關於同步與非同步，請看[此](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests) 。

```js
console.log('hi');

$.get('url', function cb(data) {
  console.log(data);
});

console.log('JSConfEU');
```

## task queue 任務佇列

在取得 web api 的結果後，瀏覽器會將回呼函式推進一個等待的地方，就是任務佇列（task queue ）。等瀏覽器執行完 stack 的程式，便會開始讀取任務佇列的回呼函式，讀取完成之後便會開始執行，再讀取下一個回呼。

## 非同步的事件循環

其實重點在任務佇列的部分已經說完了，就是瀏覽器必須等主任務（stack）執行完後，再開始讀取任務佇列並執行回呼函式，稱為事件循環。

### 範例一：執行順序為 h1 → setTimeout（非同步） → JSConfEU → there

```js
console.log('hi');

setTimeout(function() {
  console.log('there');
}, 5000);

console.log('JSConfEU');
```

### 範例二：執行順序為

setTimeout（非同步） → 接回結果，放入佇列 →
setTimeout（非同步） → 接回結果，放入佇列 →
setTimeout（非同步） → 接回結果，放入佇列 →
setTimeout（非同步） → 接回結果，放入佇列 →

讀取`timeout();`，執行 →`console.log('hi')`，
讀取`timeout();`，執行 →`console.log('hi')`，
讀取`timeout();`，執行 →`console.log('hi')`，
讀取`timeout();`，執行 →`console.log('hi')`，
結束。

```js
setTimeout(function timeout() {
  console.log('hi');
}, 1000);

setTimeout(function timeout() {
  console.log('hi');
}, 1000);

setTimeout(function timeout() {
  console.log('hi');
}, 1000);

setTimeout(function timeout() {
  console.log('hi');
}, 1000);
```

其他可以參考講者寫的一個[事件循環模擬器](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikgewogIHJldHVybiBhICogYgp9CgpmdW5jdGlvbiBzcXVhcmUobikgewogIHJldHVybiBtdWx0aXBseShuLCBuKQp9CgpmdW5jdGlvbiBwcmludFNxdWFyZShuKSB7CiAgdmFyIHNxdWFyZWQgPSBzcXVhcmUobikKICBjb25zb2xlLmxvZyhzcXVhcmVkKQp9CgpwcmludFNxdWFyZSg0KTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)。
