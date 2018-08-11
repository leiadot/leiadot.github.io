---
title: 【JS30】Day07：Array Cardio Day 2
date: 2018-02-13
tags:
- JavaScript
- JS30系列
categories: CodingLife
photo:
- '/img/js30day/small6.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：說明並練習這些在 JS 中常用的幾個陣列方法</span>

## 使用技巧

*   Array.prototype.some()
*   Array.prototype.find()
*   Array.prototype.findIndex()

[參考文章：【 ES6 】陣列麻吉罵下篇：Sort、Every、Find、Some](/2018/02/15/javascript/ES6/array02)

**Array.prototype.some()**

### 一. 使用 `some` 確認陣列是否有元素 >=19 。

```js
const isAdult = people.some(function(person) {
    const currentYear = (new Date()).getFullYear();
    if(currentYear - person.year >= 19) {
    return true;
    }
});
//Output:true
```

或改寫成 `arrow function`

```js
const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);

console.log({isAdult});
```

`some`會遍歷整個陣列的元素傳進`function`，確認元素是否符合條件，假設其中一個元素符合條件，
即返回`true`，假設整個陣列都沒有元素符合條件，返回`false`。

**Array.prototype.every()**

### 二. 使用 `every` 確認陣列是否有元素 >=19。

```js
const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
console.log({allAdults});
```

`every`會遍歷整個陣列的元素傳進`function`，檢查陣列中所有元素是否符合條件，符合條件即回傳`true`，
只要有一個元素不符合，則回傳`false`。

**Array.prototype.find()**

### <span id="三-尋找-id-是-823424-的留言">三. 尋找 id 是 823424 的留言。

```js
const comment = comments.find(function(comment) {
    if (comment.id == '823423') {
        return true;
    }
});
console.log(comment);
//Output:{text: "Super good", id: 823423}
```

試著自己改寫`arrow function`。

```js
const comment = comments.find(comment => comment.id == '823423');
console.log(comment);
```

`find`會遍歷整個陣列，假使有元素符合條件，及返回元素值為
`true`的元素，
和`filter`不同的差別為，`find`只會回傳第一個符合條件的元素值。

**Array.prototype.findIndex()**

### <span id="四刪除-id-為-823434-的留言">四.刪除 id 為 823434 的留言

```js
const index = comments.findIndex(comment => comment.id === 823423);
console.log(index);
//Output:1
comments.splice(index, 1);
```

或是將`comments.splice(index, 1);`改寫成

```js
const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ];
```