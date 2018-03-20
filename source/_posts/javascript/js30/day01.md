---
title: 【 JS30 】Day01：JavaScript Drum Kit
date: 2018-01-22
tags:
- JavaScript
- JS30 系列
---

![](/img/js30day/small0.jpg)

> [javascript 30day](https://javascript30.com/)

<a id="more"></a>

### <span style="color:#ff5900">目標：按鍵盤按鍵，使畫面有動態效果及聲音。</span>

## 一、按下鍵盤事件

```js
window.addEventListener('keydown', playSound);
//利用 window 監聽 keydown 事件來偵測使用者按下的按鈕。
```

## 二、連結聲音

```js
function playSound(e) {

    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    // 利用 template literals 加入變數，選擇音檔。

    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    // 選擇按鍵

    if (!audio) return;
    audio.currentTime = 0;
    // 每次按鍵重新播放聲音

    key.classList.add('playing');
    // 加入 css 效果
}
```

## 三、事件動畫效果

```js
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
// function 傳入 forEach 遍輪 key ， 使每個按鍵監聽 transitionend 事件。

function removeTransition(e) {

    if (e.propertyName !== 'transform') return;
    // 跳過 CSS transform 屬性
    
    this.classList.remove('playing');
    // 移除 css 效果
}
```

## 使用技巧

*   forEach
*   template literals
*   arrow function
*   transitionend