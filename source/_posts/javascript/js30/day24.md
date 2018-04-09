---
title: 【 JS30 】Day24：Sticky Nav
tags:
  - JavaScript
  - JS30 系列
date: 2018-03-30 10:36:20
---
![](/img/js30day/small.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：偵測頁面高度固定導覽列</span>

## 一、取得頁面元素及偵測高度
```js
const nav = document.querySelector('#main');
// 導覽列
const topOfNav = nav.offsetTop;
// 導覽列頂部到 top 的距離
```

## 二、新增 class 及判斷

```js
function fixNav() {
  if (window.scrollY >= topOfNav) {
    // 假設頁面高度超過距離
      document.body.classList.add('fixed-nav');
      // body就增加 class
      
  } else {
      document.body.classList.remove('fixed-nav');
      // 若沒有就移除 class
  }
}

window.addEventListener('scroll', fixNav);
// 監聽滾動事件
```

## 三、新增 fixed 樣式
```css
.fixed-nav .site-wrap {
  transform: scale(1);
}

/* 當出現 fixed-nav ，site-wrap 縮放比改為 1 */

.fixed-nav nav {
  position: fixed;
  box-shadow: 0 5px rgba(0,0,0,0.1);
}

/* 當出現 fixed-nav ，把 nav 固定，並加上陰影*/

.fixed-nav li.logo {
  max-width: 500px;
}

/* 當出現 fixed-nav ，顯示並增加 logo 寬度*/

```

## 四、debug

```js
function fixNav() {
  if (window.scrollY >= topOfNav) {
    // 假設頁面高度超過距離
      document.body.paddingTop = nav.offsetHeight + 'px';
      // 當 position 被設定為 fixed ，物件便會浮動固定在畫面上，所以需要動態增加 offsetHeight 的高度，避免彈跳現象。
      document.body.classList.add('fixed-nav');
      // body就增加 class
      
  } else {
      document.body.style.paddingTop = 0;
      // 若沒有就還原頁面。
      document.body.classList.remove('fixed-nav');
      // 若沒有就移除 class
  }
}
```

## 使用技巧