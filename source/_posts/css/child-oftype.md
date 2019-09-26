---
title: 【CSS】nth-child 與 nth-of-type
urlname: css-child-of-type
tags:
  - CSS
categories: CSS
description: 了解在 CSS 中，nth-child 與 nth-of-type 的差異點，並簡單記錄下來。
photo:
  - '/img/cover/css.jpg'
date: 2018-07-23 10:43:55
modified: 2018-07-23 10:43:55
---

早上聽到旁邊的同學在討論這個問題，有時候會遇到使用`nth-child`沒反應的狀況，如今是該釐清的時候了。

<!--more-->

```html
<div class="container">
  <h2>Hello</h2>
  <ul class="ul01">
    <li>1</li>
    <li>2</li>
  </ul>
  <ul class="ul02">
    <li>3</li>
    <li>4</li>
    <li>
      <span>span1</span>
      <span>span2</span>
    </li>
  </ul>
</div>
```

```css
.container ul:nth-child(2) {
  background-color: red;
}
```

現在有一段程式碼，原本我預期的狀況`ul02`會吃到底色，因為我選擇的是`container`下第二個`ul`，但吃到底色的`ul01`。
為什麼呢？因為`nth-child`在數 DOM 元素的時候不看 tag ，意思就是他在數元素的時候不會幫你過濾元素 type 。

假設我們將 CSS 選擇器更改為 `.container ul:nth-child(1)`，會發現沒有元素吃到 CSS，因為他選擇的是`container`下的第一個元素，而且必須為`ul`。
換句話說在`container`下的第一個元素如果不是`ul`，他就不會吃到 CSS， 在`container`下第一個元素是`h2`，所以他不會吃到 CSS ，如果你希望選擇`container`下第一個`ul`，必須使用`.container ul:nth-of-type(1)`。

對於後代選擇器使用`nth-child`也有一個很特殊的發現，如果選擇器更改為`.container :nth-child(2)`或`.container *:nth-child(2)`，你會發現從`container`開始各階層下的第二個元素都會被選擇到。
如果更改為`.container *:nth-of-type(2)`，各元素類型的第二個選擇器會被選擇到。

這邊要注意的是，`of-type`選擇器會以元素類型做區隔，而`nth-child`會計算到所有元素。
