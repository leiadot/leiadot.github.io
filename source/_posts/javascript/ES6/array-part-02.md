---
title: 【ES6】陣列麻吉罵下篇：Sort、Every、Find、Some
date: 2018-02-15
tags:
- ES6
- JavaScript
categories: CodingLife
photo:
- '/img/cover/javascript.jpg'
---

在我們初學 Javascript ，最常用到的就是`for`迴圈，但當案子的複雜度增加，
我們常常都要在迴圈外面先建立一個空陣列，而且迴圈都不知道迴到哪去（？）
因此 ES6 中，有新增幾個陣列的方法，在這邊介紹幾個陣列的麻吉罵。

此篇文章的資料及範例程式碼皆擷取自[MDN](https://developer.mozilla.org/zh-TW/)。

[Sort](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)、[Every](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/every)、[Find](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/find)、[Some](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

<!-- more -->

*   Sort
    使用 `sort` 將陣列中的元素排列至其應當的位置上並返回此陣列。
*   Every
    使用 `every` 遍歷陣列的每個元素，當陣列的元素只要有一個不符合函式條件，即回傳`false`，全部的元素都通過條件，即返回`true`。
*   Find
    `find` 遍歷陣列的每個元素，回傳陣列第一個符合函式條件的元素，callback隨即結束，若都不符合，則回傳`undefined`。
*   Some
    使用 `some` 遍歷陣列的每個元素，當陣列的元素只要有一個符合函式條件，即回傳`true`，陣列中全部的元素都不符合條件，即返回`false`。

# sort

```js
arr.sort([compareFunction])
```

`compareFunction`：指定函數來定義排序順序。

```js
var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];
items.sort(function (a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  // a must be equal to b
  return 0;
});

```

| 比較 a , b 元素 | 結果 |
| --- | --- |
| compareFunction(a, b) >0 | 將 `b` 排在比 `a` index還小處 |
| compareFunction(a, b) =0 | 互相不改變順序 |
| compareFunction(a, b) <0 | 將 `a` 排在比 `b` index還小處 |

## every

```js
arr.every(callback[, thisArg])
```

*   callback
    測試元素的函式，可帶入三個傳入參數。
    *   element
        目前被處理中的元素。
    *   index 選填
        目前被處理中元素的索引值。
    *   array 選填
        呼叫`every`的陣列本身。
*   thisArg 選填
    執行`function`的`this`。

```js
function isBigEnough(element, index, array) { 
  return element >= 10; 
} 

[12, 5, 8, 130, 44].every(isBigEnough);   // false 
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

因為第一個`isBigEnough`陣列的`5`不符合函式條件，因為`every`回傳`false`，
第二個`isBigEnough`的陣列元素，全部都符合函式條件，回傳`true`。

## find

```js
arr.find(callback[, thisArg])
```

*   callback
    測試元素的函式，可帶入三個傳入參數。
    *   element
        目前被處理中的元素。
    *   index 選填
        目前被處理中元素的索引值。
    *   array 選填
        呼叫`find`的陣列本身。
*   thisArg 選填
    執行`function`的`this`。

```js
var array1 = [5, 12, 8, 130, 44];

var found = array1.find(function(element) {
  return element > 10;
});

console.log(found);
// expected output: 12

```

`find`執行後，第一個符合`element > 10`條件的數值為`12`，
則`found`的變數值為`12`，且傳入變數`found`為數值，而非陣列。

## some

```js
arr.some(callback[, thisArg])
```

*   callback
    測試元素的函式，可帶入三個傳入參數。
    *   element
        目前被處理中的元素。
    *   index 選填
        目前被處理中元素的索引值。
    *   array 選填
        呼叫`some`的陣列本身。
*   thisArg 選填
    執行`function`的`this`。

```js
function isBiggerThan10(element, index, array) {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true

```

因為第一個`isBiggerThan10`陣列全部不符合函式條件，所以回傳`false`，
第二個`isBiggerThan10`的第一個元素`12`，符合函式條件，則回傳`true`。
