---
title: 【 JS30 】Day18：Adding Up Times with Reduce
tags:
- JavaScript
- JS30 系列
date: 2018-03-16 10:29:06
---
![](/img/js30day/small17.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：使用 reduce 總和所有播放影片的時間</span>

## 一、抓 DOM
```js
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
const seconds = timeNodes.map(node => node.dataset.time);
```
使用`[...]`或`Array.from()`先將取用到的`dataset`的 nodelist 轉換成陣列。

## 二、加總計算

```js
const seconds = timeNodes
                  .map(node => node.dataset.time)
                  .map(timeCode => {
                      const [mins, secs] = timeCode.split(':').map(parseFloat);
                      return (mins * 60) + secs;
                      console.log(mins, secs)
                  })
                  .reduce((total, vidSecondes) => total + vidSecondes);
```
使用`map`轉換成新陣列，取用`dataset`的數值，使用`split`刪除`:`符號分割，
並從字串轉換為數字，分鐘轉換秒數加總，再使用`reduce`做陣列加總。

## 三、計算小時

```js
let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft);
```
計算小時，將秒數轉換成小時後，使用`Math.floor()`取用整數，
再使用`%`計算剩餘的秒數，再以同樣的方法轉換分鐘，便可以計算出所有影片的小時/分鐘/秒數。

## 三、計算分鐘

## 使用技巧