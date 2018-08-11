---
title: 【JS30】Day27：Click and Drag to Scroll
tags:
  - JavaScript
  - JS30系列
date: 2018-04-12 09:18:54
categories: CodingLife
photo:
- '/img/js30day/small26.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：點擊及拖曳使畫面滑動</span>

## 一、命名變數
```js
const slider = document.querySelector('.items');
// 頁面元素
let isDown = false;
// 狀態變數
let startX;
let scrollLeft;
```

## 二、監聽事件
```js
  slider.addEventListener('mousedown', () => {});
  slider.addEventListener('mouseleave', () => {});
  slider.addEventListener('mouseup', () => {});
  slider.addEventListener('mousemove', () => {});
```
分別有滑鼠按下、滑鼠離開、滑鼠放開，及滑鼠拖曳的動作。

## 三、滑鼠按下事件
```js
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    // 狀態變數啟用
    slider.classList.add('active');
    // 增加樣式
    startX = e.pageX - slider.offsetLeft;
    // 按下的起始位置 = 頁面位置 - 目前 item 的左邊距離
    scrollLeft = slider.scrollLeft;
    // 紀錄移動的距離量
  });
```
## 四、滑鼠滑動事件
```js
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    // 假設非按下滑動，就不執行
    e.preventDefault();
    // 取消預設行為，如反白文字之類的
    const x = e.pageX - slider.offsetLeft;
    // 紀錄目前位置 = 頁面位置 - 目前 item 的左邊距離
    const walk = (x - startX) * 3;
    // 紀錄游標距離原本起始值的滑動距離 = (目前位置 - 起始位置)*3
    slider.scrollLeft = scrollLeft - walk;
    // 設定水平的偏移量
});
```
## 、滑鼠離開、滑鼠放開事件

```js
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
    // 取消狀態及樣式
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
    // 取消狀態及樣式
  });
```