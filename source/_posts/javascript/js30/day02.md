---
title: 【 JS30 】Day02：CSS + JS Clock
date: 2018-01-22
tags:
- JavaScript
- JS30 系列
---

![](/img/js30day/small1.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：使畫面指針依照電腦時間進行動態效果。</span>

## 一、 調整畫面指針

設定指針的 CSS 下屬性。

```css
transform-origin: 100%;
// 改變位置水平垂直位置
transform: rotate(90deg);
// 改變角度，使指針以 12 點鐘方向為起始
transition-timing-function: cubic-bezier(0.1, 2.7, 0.25, 1);
// 利用貝茲曲線製造出指針動態的彈出效果

```

## 二、取得當下時間

```js
function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    // 取得秒數
    const secondsDegree = ((seconds / 60) * 360) + 90;
    // 計算角度
    secondsHand.style.transform = `rotate(${secondsDegree}deg)`;
    // 使用style transform 動態改變角度

    const mins = now.getMinutes();
    const minsDegree = ((mins / 60) * 360) + 90;
    minsHand.style.transform = `rotate(${minsDegree}deg)`;

    const hour = now.getHours();
    const hourDegree = ((mins / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourDegree}deg)`;

}

setInterval(setDate, 1000);
// 每秒執行一次 setDate function
```
## 使用技巧

*   newDate
*   transform
*   el.style.styleAttribute
