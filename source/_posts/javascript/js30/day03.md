---
title: 【 JS30 】Day03：JS Playing with CSS Variables
date: 2018-01-29
tags:
- JavaScript
- JS30 系列
---
![](/img/js30day/small2.jpg)

> [javascript 30day](https://javascript30.com/)

<a id="more"></a>

### <span id="目標讓使用者可調整邊距顏色-寬度及模糊度"><span style="color:#ff5900">目標：讓使用者可調整邊距顏色、寬度，及模糊度</span></span>

# <span id="js-playing-with-css-variables-and-js-day03">JS Playing with CSS Variables and JS Day03</span>

## <span id="一-將欲改變的屬性命名-css-變數">一、將欲改變的屬性命名 css 變數</span>

```css
:root {
–base: #ffc600;
–spacing: 50px;
–blur: 10px;
}
// 變數命名

img {
padding: var(–spacing);
background-color: var(–base);
filter: blur(var(–blur));
}
// 呼叫變數
```

## 二、監聽 input

```js
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {

    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    // 使用 document.documentElement.style.setProperty('變數名稱', '數值');

}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

## 使用技巧

*   css variables
*   data-attribute
*   forEach