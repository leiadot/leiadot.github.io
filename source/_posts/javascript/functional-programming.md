---
title: 【JS】Functional Programming
urlname: javascript-functional-programming
tag:
  - JavaScript
categories: JavaScript
photos:
  - '/img/cover/javascript.jpg'
description: 了解 JavaScript 中 Functional Programming 的定義。
date: 2018-11-16 18:06:34
modified: 2018-11-16 18:06:34
---

<!--more-->

## 什麼是 Functional Programming

Functional Programming 是一種程式設計範例，但把函式本身上升到一等公民的位置，
就像是物件導向編程（Object-oriented Programming）一樣，是一種寫程式的方法。

## Expression, no Statement

- 概念：僅有表達式，沒有陳述式。
- 表達式：一個運算過程，一定有回傳值。
- 陳述式：表現某個行為，例如：賦值給變數。

## First Class Function 一級函式：

### 函式可以被賦值給變數。

```javascript=
const greet = function(msg) {
  console.log(`Hello ${msg}`);
};
greet('Semlinker'); // Output: 'Hello Semlinker'
```

### 函式可以當參數被傳遞。

```javascript=
const logger = function(msg) {
  console.log(`Hello ${msg}`);
};
const greet = function(msg, print) {
  print(msg);
};
greet('Semlinker', logger);
```

### 函式可以當作回傳值。

```javascript=
const a = function(a) {
  return function(b) {
    return a + b;
  };
};
const add5 = a(5);
add5(10); // Output: 15
```

## Pure Function 純函數

- 概念：給這個函式相同的輸入值，無論這個函數在哪個時間、哪個地點，得到都會是同一個結果，並且沒有副作用。

```javascript=
// impure
var minimum = 21;

var checkAge = function(age) {
  return age >= minimum;
};

// pure
var checkAge = function(age) {
  var minimum = 21;
  return age >= minimum;
};
```

### Side Effect 副作用

- 概念：與函式外部環境相互作用的都是副作用。
- 副作用可能包含以下（但不僅僅只有以下）：
  - 更改檔案系統
  - 在資料庫寫入紀錄
  - 發送一個 http 請求
  - 可變資料
  - 印出至畫面 / log
  - 取得使用者輸入
  - DOM 查詢
  - 存取系統狀態

### immutable 不可變性

概念：建立某個變數之後就不能再更改其值。

```javascript=
var statement = 'I am an immutable value';
var otherStr = statement.slice(8, 17);
```

我們可以說 statement 是 immutable，因為他的變形是由 otherStr 儲存。

## Partial Application 部分應用

概念：提供部分參數給其函式應用

### 一般函式：

```javascript=
function map(list, unaryFn) {
  return [].map.call(list, unaryFn);
}

function square(n) {
  return n * n;
}

map([2, 3, 5], square); // => [4, 9, 25]
```

- map：接受一組陣列跟函式
- square：接受一個數值

### 實作部分應用

```javascript=
function mapWith(list, unaryFn) {
  return map(list, unaryFn);
}
```

接著把二元函式變成疊層的一元函式：

```javascript=
function mapWith(unaryFn) {
  return function(list) {
    return map(list, unaryFn);
  };
}
```

所以當我們把參數傳進去：

```javascript=
mapWith(square)([2, 3, 5]); // => [4, 9, 25]

var squareAll = mapWith(square);
squareAll([2, 3, 5]); // => [4, 9, 25]
squareAll([1, 4, 7, 6]); // => [1, 16, 49, 36]
```

如此可以減少傳遞 square 函式，隨時抽取變換陣列。

## Curry 柯里化

概念：只傳遞一個參數給函式並呼叫，回傳另一個函式來處理剩下的參數。

```javascript=
var add = x => y => x + y;

var add2 = add(2);
var add200 = add(200);

add2(2); // =>4
add200(50); // =>250
```

## Compose 組合函式

概念：將兩個簡短的函式，當作堆樂高一樣組成一個比較複雜的函式。

```javascript=
var add10 = value => value + 10;
var mult5 = value => value * 5;
//兩個簡短的函式
var mult5AfterAdd10 = value => 5 * (value + 10);
//重寫一個新的

var mult5AfterAdd10 = value => mult5(add10(value));
//但我們不想寫新的，所以把它組合起來。
```

```javascript=
var compose = function(f, g) {
  return function(x) {
    return f(g(x));
  };
};

//或者
var compose = (f, g) => x => f(g(x));

var add1 = x => x + 1;
var mul5 = x => x * 5;

compose(
  mul5,
  add1,
)(2);
// =>15
```

## Point Free

概念：減少不必要的命名變數。

```javascript=
//這不 Piont free
var f = str => str.toUpperCase().split(' ');

var toUpperCase = word => word.toUpperCase();
var split = x => str => str.split(x);

var f = compose(
  split(' '),
  toUpperCase,
);

f('abcd efgh');
// =>["ABCD", "EFGH"]
```

## High-order function 高階函式

### 要點

- 高階函式一定是一級函式
- 以一個函式當參數傳遞
- 同時回傳一個函式當作是回傳值

```javascript=
function makeAdder(constantValue) {
  return function adder(value) {
    return constantValue + value;
  };
}

var add10 = makeAdder(10);
console.log(add10(20)); // prints 30
console.log(add10(30)); // prints 40
console.log(add10(40)); // prints 50
```

> ### 參考資料
>
> [30 天精通 RxJS (02)： Functional Programming 基本觀念](https://ithelp.ithome.com.tw/articles/10186465) > [想学函数式编程？ - 收藏集 - 掘金](https://segmentfault.com/a/1190000009190906) > [JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/) > [JavaScript 函数式编程（一）](https://segmentfault.com/a/1190000006046508) > [SegmentFault 技术周刊 Vol.16 - 浅入浅出 JavaScript 函数式编程](https://segmentfault.com/a/1190000007784565) > [函数式编程中局部应用（Partial Application）和局部套用（Currying）的区别](https://segmentfault.com/a/1190000000765247)
