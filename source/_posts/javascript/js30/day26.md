---
title: 【JS30】Day26：Stripe Follow Along Nav
tags:
  - JS30系列
date: 2018-04-10 09:20:10
categories: CodingLife
photo:
- '/img/js30day/small25.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：滑動的次導覽列</span>

## 一、抓取頁面元素及建立事件

```js
const triggers = document.querySelectorAll('.cool > li');
// 抓取各別的選單
const background = document.querySelector('.dropdownBackground');
// 抓取白底部分
const nav = document.querySelector('.top');
// 抓取主導覽列

function handleEnter() {
    this.classList.add('trigger-enter');
    // 新增 class
    setTimeout(() => this.classList.add('trigger-enter-active'), 150)
    // 0.15毫秒後新增 class
    background.classList.add('open');
    // 新增白底樣式的 class
}

function handleLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
    // 移除相關class
}
triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter))
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave))
```
事件僅有滑鼠滑入及滑出的效果，

## 二、新增動態效果

```js
function handleEnter() {
    this.classList.add('trigger-enter');
    // 新增 class
    setTimeout(() => this.classList.add('trigger-enter-active'), 150)
    // 0.15毫秒後新增 class
    background.classList.add('open');
    // 新增白底樣式的 class

    const dropdown = this.querySelector('.dropdown');
    // 取得導覽底下的下拉導覽
    const dropdownCoords = dropdown.getBoundingClientRect();
    // 取得下拉導覽的資訊
    const navCoords = nav.getBoundingClientRect();
    // 取得導覽列的資訊

    const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top,
        left: dropdownCoords.left
    }
    // 取得下拉導覽座標

    background.style.setProperty('width', `${coords.width}px`);
    background.style.setProperty('height', `${coords.height}px`);
    background.style.setProperty('transform', `translate(${coords.left}px,${coords.top}px)`)
        // 設定白底樣式滑入的寬高及定位
}

```

## 三、Debug 錯位與快速滑動
```js
function handleEnter() {
...
...
  const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left
            // 減去主導覽列的定位
    }
...
...
}
```
假設主導覽列上方有新增元素，則下拉導覽列會錯位，為了避免錯位，因此必須扣除掉主導覽列的定位。
```js
setTimeout(() => 
this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
```
為了避免快速滑動導覽列產生錯亂，因此在`setTimeout`上增加判斷，
假設前者導覽有`trigger-enter`的class，便增加`trigger-enter-active`，
假設沒有，則會一直顯示白色導覽列的部分，內容不會被顯示出來。