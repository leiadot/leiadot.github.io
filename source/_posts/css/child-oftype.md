---
title: 【CSS】nth-child 與 nth-of-type
tag:
  - CSS
categories: CodingLife 前端技術筆記
date: 2018-07-23 10:43:55
modified: 2018-07-23 10:43:55
---

早上聽到旁邊的同鞋在討論這個問題，有時候會遇到使用`nth-child`沒反應的狀況，如今是該釐清的時候了。

<!--more-->

```html
<div class="container">
  <h2>Hello</h2>
  <ul>
    <li>1</li>
    <li>2</li>
  </ul>
  <ul>
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
.container ul:nth-child(2){
  background-color: red;
}
```
