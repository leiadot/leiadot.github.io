---
title: 【 JS30 】"day21"
tags:
  - JavaScript
  - JS30 系列
date: 2018-03-27 16:20:57
---
![](/img/js30day/small.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：取得裝置地理位置和速度</span>

一、使用 npm 啟動server

因為練習是取用定位，所以 mac 可以用 Xcode 模擬，
或是用npm start 啟動內網ip，連線啟動 server 。 

二、Coding

```js
const arrow = document.querySelector('.arrow'); 
const speed = document.querySelector('.speed-value'); 
// 抓取 DOM

navigator.geolocation.watchPosition((data) => {
  // 使用 watchPosition 取得裝置資料，若成功就回傳
  console.log(data);
  // data.coords.speed 取得速度
  speed.textContent = data.coords.speed;
  // data.coords.heading 取得角度
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
  console.error(err);
});
```

## 使用技巧
- Geolocation.watchPosition()