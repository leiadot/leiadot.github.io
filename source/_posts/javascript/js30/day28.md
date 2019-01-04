---
title: 【JS30】Day28：Video Speed Controller
tags:
  - JS30系列
date: 2018-04-16 10:27:09
categories: CodingLife
photo:
- '/img/js30day/small27.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：滑鼠事件監聽調整速度</span>
與[第 11 天](/_posts/javascript/js30/day11.md)的練習類似。

## 一、命名變數

```js
   const speed = document.querySelector('.speed')
    const bar = document.querySelector('.speed-bar');
    const video = document.querySelector('.flex');
```
## 二、監聽事件

```js
    speed.addEventListener('mousemove', function (e) {
      // 滑鼠移動事件
      const y = e.pageY - this.offsetTop;
      // 觸發位置 = 滑鼠距離整頁頂端的 y 軸位置 - 速率條到整個頁面頂端的距離
      const percent = y / this.offsetHeight;
      // 百分比 = 觸發位置 / 速率條的高度
      const min = 0.4;
      const max = 4;
      const height = Math.round(percent * 100) + '%';
      // 四捨五入百分百
      const playbackRate = percent * (max - min) + min;
      // 計算播放速率比例
      bar.textContent = playbackRate.toFixed(2) + 'x';
      // 使用 toFixed 顯示小數點後兩位的速率文字
      bar.style.height = height;
      // 顯示樣式
      video.playbackRate = playbackRate;
      // 更改影片速率
    });
```
## 使用技巧