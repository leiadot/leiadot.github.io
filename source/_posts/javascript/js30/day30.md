---
title: 【JS30】Day30：Whack A Mole Game
tags:
  - JS30系列
date: 2018-04-18 09:57:19
urlname: javascript-30-day30
categories: Front-end
description: JS 30系列是加拿大全端開發者 Wesbos 攝錄的一系列非常好的教材，此篇教如何製作打地鼠的小遊戲。
photo:
  - '/img/js30day/small29.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：做一個打地鼠的小遊戲</span>

## 一、抓取頁面元素及命名變數

```js
const holes = document.querySelectorAll('.hole');
// 洞
const scoreBoard = document.querySelector('.score');
// 分數顯示
const moles = document.querySelectorAll('.mole');
// 地鼠
let lastHole;
// 最後一次出現的地洞
let timeUP = false;
// 結束遊戲時間
let score = 0;
// 分數
```

## 二、亂數選擇地鼠出沒的洞

```js
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
  // 產生一個小數點後四捨五入的亂數時間區間
}
function randomHole(holes) {
  // 亂數產生地洞
  const idx = Math.floor(Math.random() * holes.length);
  // 亂數取得地洞
  const hole = holes[idx];
  // 賦予 DOM

  if (hole === lastHole) {
    // 避免亂數重複
    return randomHole(holes);
  }
  lastHole = hole;
  // 紀錄最後出現的地洞
  return hole;
}
```

## 三、地鼠出沒

```js
function peep() {
  // 地鼠出現
  const time = randomTime(200, 1000);
  // 取得出現的時間
  const hole = randomHole(holes);
  // 取得出現的地洞
  hole.classList.add('up');
  // 加上 class 出現 css 動畫效果
  setTimeout(() => {
    hole.classList.remove('up');
    // 時間到移除 css 動畫
    if (!timeUp) peep();
    // 遊戲時間未結束 跑出下一隻地鼠
  }, time);
}
```

## 四、遊戲開始及打擊地鼠

```js
function startGame() {
  timeUp = false;
  // 時間重置
  scoreBoard.textContent = 0;
  score = 0;
  // 分數表初始化

  peep();
  // 執行地鼠出現
  setTimeout(() => (timeUp = true), 10000);
  // 十秒後時間結束
}

function bonk(e) {
  if (!e.isTrusted) return;
  // 防止腳本操作
  score++;
  // 加分
  this.classList.remove('up');
  // 移除 css 動畫
  scoreBoard.textContent = score;
  // 更新分數
}

moles.forEach(mole => mole.addEventListener('click', bonk));
//監聽每隻地鼠綁定 bonk 函式
```
