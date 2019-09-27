---
title: 【JS30】Day25：Event Capture, Propagation, Bubbling and Once
tags:
  - JS30系列
date: 2018-04-09 09:57:27
urlname: javascript-30-day25
description: JS 30 系列，此篇了解事件監聽 Event Capture、Propagation 與 Bubbling 差別。
categories: 前端工程
photo:
  - '/img/js30day/small24.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：理解事件捕捉、傳遞、氣泡，和單次執行</span>

## 一、事件模型

```html
<div class="one">
  紫色
  <div class="two">
    粉色
    <div class="three">
      橘色
    </div>
  </div>
</div>
```

## 二、建立事件點擊

```js
const divs = document.querySelectorAll('div');

function logText(e) {
  console.log(this.classList.value);
}
divs.forEach(div => div.addEventListener('click', logText));
```

當你做事件點擊的監聽，點擊到`three`，而`two`和`one`會被`console.log`出來，
因為事件氣泡的關係，會不斷向外觸發所有的`div`元素，點擊`three`就會觸發`two`、`one`，點擊`two`，就觸發`one`，

事件氣泡為目標元素被監聽，點擊元素會不斷向外尋找，直到找到目標元素為止，
假設監聽元素是`body`，那點擊`three`，監聽就會向外尋找，觸發順序就為`three`、`two`、`one`、`body`。

事件捕捉為不斷向內觸發，那他就會向內觸發，以此類推。

## 三、監聽事件的第三個參數，capture 屬性

```js
divs.forEach(div =>
  div.addEventListener('click', logText, {
    capture: false, // 預設為false
  }),
);
```

監聽事件有第三個參數，假設不輸入，預設值就為`false`，該監聽事件就為事件氣泡，
如果輸入`true`，該事件就為事件捕捉。

## 四、stopPropagation

```js
function logText(e) {
  console.log(this.classList.value);
  e.stopPropagation();
}

divs.forEach(div => div.addEventListener('click', logText));
```

使用`stopPropagation();`，就不會向外觸發父元素。

```js
function logText(e) {
  console.log(this.classList.value);
  e.stopPropagation();
}

divs.forEach(div =>
  div.addEventListener('click', logText, {
    capture: true,
  }),
);
```

假設在事件捕捉的時候，使用`stopPropagation`，點擊`three`，會觸發`one`，
因為事件捕捉是由外向內觸發，他會向內尋找目標元素，但因為`stopPropagation`的關係，
觸發到最外層的`one`元素，便會停止事件捕捉的監聽。

## 三、第三個參數，once 屬性

```js
button.addEventListener(
  'click',
  () => {
    console.log('Click!!!');
  },
  {
    once: true,
  },
);
```

監聽的`once`屬性，是監聽一次點擊事件後，就會解除對自己本身的事件綁定，
所以再點擊第二次、第三次，他不會被監聽，因為在監聽第一次的時候，已經解除監聽狀態。

## 使用技巧

- addEventListener
- stopPropagation
