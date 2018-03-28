---
title: 【 JS30 】Day22：Follow Along Link Highlighter
tags:
  - JavaScript
  - JS30 系列
date: 2018-03-28 10:31:37
---
![](/img/js30day/small21.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：根據滑鼠游標移動 highlight 位置</span>

一、取得 DOM

```js
const triggers = document.querySelectorAll('a');
// 取得 a 連結
const highlight = document.createElement('span');
// 建立highlight
highlight.classList.add('highlight');
// 新增節點
document.body.append(highlight);
// 加到頁面中
```

二、更改狀態
```js
function highlightLink() {
    const linkCoords = this.getBoundingClientRect();
    // 取得 a 本身距離瀏覽器窗口的位置

    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    }
    // 建立物件，以便存放位置訊息，因為根據 window 捲軸滑動的關係，必須加上scroll移動值。

    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

    // 設定效果的寬高及定位

}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
// 監聽所有 a 連結的滑鼠移入，觸發 highlightLink
```


## 使用技巧

- getBoundingClientRect