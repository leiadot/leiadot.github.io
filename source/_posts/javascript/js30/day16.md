---
title: 【JS30】Day16：Mouse Move Shadow
tags:
- JavaScript
- JS30系列
date: 2018-03-12 10:28:03
---
![](/img/js30day/small15.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：滑鼠移動時，CSS 的陰影跟著移動。</span>

## 一、設立目標區域
```js
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
```
```js        
function shadow(e) {
    const {
        offsetWidth: width,
        offsetHeight: height
    } = hero;
    // 利用解構賦值取得目標寬高
    let {
        offsetX: x,
        offsetY: y
    } = e;
    // 取得滑鼠位置

    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }
    // 如果在目標區域外 則加入目標座標值
```
## 二、設定偏移量

```js
const walk = 100;
const xWalk = Math.round((x / width * walk) - (walk / 2));
const yWalk = Math.round((y / height * walk) - (walk / 2));
// 並四捨五入偏移值

text.style.textShadow =
  ` ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)`;

}
// 加入 textShadow

hero.addEventListener('mousemove', shadow);
```
## 使用技巧
- 解構賦值