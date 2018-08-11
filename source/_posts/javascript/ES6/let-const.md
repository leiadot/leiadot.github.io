---
title: 【ES6】 let、const
date: 2018-04-17 21:09:34
tags:
- ES6
- JavaScript
categories: CodingLife
photo:
- '/img/cover/javascript.jpg'
---


之前其實就有發過相關的文章，可是因為 github 沒有上傳 source code 結果被我弄爆了，這次挑精簡的寫重點，詳細的可以 google ，很多大神都有寫相關的文章。

<!-- more -->

## 變數宣告

在 javascript 裡面命令宣告不外乎就是`var`、`let`、`const`。

### var
- 函式作用域
- 變數提升

#### 函式作用域

`var`為函式作用域，就是以函式當作變數是否有效的界線，這樣無疑會造成許多全域變數的產生。

```js
for (var i = 0; i < 3; i++) {
  console.log('hi');
}
console.log(i);
// hi
// hi
// hi
// 10
```
會得到這種迴圈體外可以存取得到變數`i`的現象，因為函式作用域的關係，導致`i`變成全域變數。

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```
承上範例，因為`i`為全域變數，導致不管在迴圈體內輸入的`i`值為多少，輸出的`console.log`仍然為`10`。

#### 變數提升

```js
console.log(abc); // undefined
var abc = 10;
```
`var`會發生變數提升的現象，在變數宣告前使用變數，輸出值為`undefined`。

### let、const
- 區塊作用域
- 變數提升
- 不可重複宣告
- 減少 IIFE 的應用

#### 區塊作用域

```js
if(true){
  let a = 0;
}
console.log(a);
// ReferenceError: a is not defined
```
區塊作用域顧名思義變數僅在區塊內有效。

### 變數提升

```js
console.log(b);
let b = 10;
// ReferenceError: b is not defined
```
因為報錯的關係，許多人以為`let`和`const`不會做變數提升，事實上仍然會，只是因為 ES6 為了避免執行錯誤，將變數移至暫時性死區。
暫時性死區的定義是，在變數宣告前使用變數，所使用的變數仍然存在，但是不可使用，只有等到宣告變數後，才可以使用該變數。

### 不可重複宣告

```js
{
  let a = 10;
  let a = 1;
}
// Uncaught SyntaxError: Identifier 'a' has already been declared
```
不允許在相同作用域裡面，重複宣告同一個變數。

### 減少 IIFE 的應用

**IIFE**

```js
(function () {
  var tmp = 1;
  console.log(tmp);
}());
// 1
```
**區塊作用域**
```js
{
  let tmp = 2;
console.log(2);
}
// 2
```

### let
- 變數宣告
- 迴圈循環重新綁定

#### 變數宣告

```js
let a = 10;
a = a + 1;
console.log(a);
// 11
```
`let`為變數宣告，可重複指定，用法類似於`var`。

#### 迴圈循環重新綁定

```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```
因為區塊作用域的關係，`i`只在迴圈體內有效，每次遍歷都是重新綁定的變數，javascript 引擎內部會記住上一輪迴圈的數值，基於上一輪的計算，初始化本輪的變數`i`。

### const 
- 常數宣告
- 不可重複指定

#### 常數宣告

```js
const a;
// Uncaught SyntaxError: Missing initializer in const declaration
```
`const`是針對常數做的定義，在常數做宣告時，必定要賦予值。


#### 不可重新指定

```js
const a = 10;
a = 11;
// Uncaught TypeError: Assignment to constant variable.
```
不可重新指定的意思是不可用等號運算子做指定運算，如上所示，但宣告一個常數，不表示為不可改變。

```js
const b = {}
b.obj = 123;
console.log(b);
//{obj: 123}
```
如果宣告的常數像是物件、陣列，都是屬於`by reference`，因此不會產生錯誤。