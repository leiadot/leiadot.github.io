---
title: 【JS】原型繼承 Prototype
urlname: javascript-prototype
tags:
  - JavaScript
categories: JavaScript
photos:
  - '/img/cover/javascript.jpg'
description: 圖解 JavaScript 中 原形繼承 Prototype。
date: 2018-08-01 16:22:13
modified: 2018-08-01 16:22:13
---

當我們每次在 console 會看到 javascript 物件底下有個 `__proto__`，那到底是什麼呢？

<!--more-->

## 先淺談一下建構式

這是一個點的建構式，有 `x`、`y` 的座標，以及一個 `position` 的 function，我們用建構式先建立兩個 instance。

```js
function Point() {
  this.x = 100;
  this.y = 99;
  this.position = function() {
    console.log(this.x, this.y);
  };
}
const redPoint = new Point();
const bluePoint = new Point();
```

接下來我們來對其中一個物件做改變。

```js
redPoint.x++;
console.log(redPoint);
// Point {x: 101, y: 99, position: ƒ}
console.log(bluePoint);
// Point {x: 100, y: 99, position: ƒ}
```

![](/img/prototype/prototype-01.png)

從上述可以證實兩個物件是獨立的，互不影響，因此他們的狀態可以圖解為上。

## 試看看替建構式加上 prototype

我們把建構式的 function 移除，把他改成 prototype。

```js
function Point() {
  this.x = 100;
  this.y = 99;
  // this.position = function (){
  //   console.log(this.x,this.y);
  // }
}
Point.prototype.position = function() {
  console.log(this.x, this.y);
};
const redPoint = new Point();
const bluePoint = new Point();

console.log(redPoint);
console.log(bluePoint);
```

omg，會發現我們的 function 不見了，打開 `console`。

![](/img/prototype/prototype-02.png)

會發現他在 `__proto__` 裡面，這中間到底發生什麼事了。

![](/img/prototype/prototype-03.png)

我們可以知道，當我們要建立 instance 的時候，他的屬性等等 blabla 會參照建構式，所以 instance 的 `__proto__` 也會參照建構式的 `prototype`。

那既然會參照建構式，那 function 還可以正常執行嗎？

```js
redPoint.position();
// 100 99
```

可以正常執行，我現在想知道 `redPosition` 這個物件是不是真的有這些屬性。

```js
redPoint.hasOwnProperty('x');
redPoint.hasOwnProperty('y');
redPoint.hasOwnProperty('position');
//true
//true
//false
```

為什麼 `position` 是 false ！？ 他明明就可以執行。

![](/img/prototype/prototype-05.png)

原來 js 在呼叫屬性的時候，先在屬性找，找不到，就向上找 `__proto__` ，`__proto__`是連結到建構式的 prototype，就找到 position 執行。

但是我們在 `__proto__` 裡面還看到一個 `__proto__`，打開來看看：

![](/img/prototype/prototype-04.png)

會發現裡面都是我們平時在操縱物件的原生方法，原來我們平常操縱物件的方法都在裡面，因此我們可以理解成這樣。

![](/img/prototype/prototype-06.png)

wowww，一切都說得通了，為什麼我們建立 javascript 物件會有 `__proto__` ，原來那是 javascript 的原型練，所有物件的方法都在裡面，而且物件的 prototype 永遠都保持在最上層。

## 建構式的繼承

```js
function Tire() {}
Tire.prototype = {
  print() {
    return '我是輪胎';
  },
};

function Car() {}

Car.prototype = Object.create(Tire.prototype);
Car.prototype.print = function() {
  return '我是車';
};
function RedCar() {}

RedCar.prototype = Object.create(Car.prototype);
RedCar.prototype.print = function() {
  return '我是紅色的車';
};

const michilin = new Tire();
const honda = new Car();
const redHonda = new RedCar();

console.log(michilin.print());
// 我是輪胎
console.log(honda.print());
// 我是車
console.log(redHonda.print());
// 我是紅車
```

現在有三個建構式，輪胎、車，跟紅車，輪胎繼承在車上，車繼承在紅色車子上，上面各自有可以印出他是什麼的 function，他們再分別建構出了：米其林、宏打、紅宏打。

```js
function Tire() {}
Tire.prototype = {
  print() {
    return '我是輪胎';
  },
};

function Car() {}

Car.prototype = Object.create(Tire.prototype);
Car.prototype.print = function() {
  return '我是車';
};
function RedCar() {}

RedCar.prototype = Object.create(Car.prototype);
// RedCar.prototype.print = function(){
//   return '我是紅色的車'
// }

const michilin = new Tire();
const honda = new Car();
const redHonda = new RedCar();

// console.log(michilin.print())
// console.log(honda.print())
console.log(redHonda.print());
```

今天我把紅宏打的 function 註解掉，他現在應該印不出東西來了。

```js
console.log(redHonda.print());
// 我是車
```

但是他最後還是有執行，印出了`我是車`，代表他繼承了車的 function。

![](/img/prototype/prototype-07.png)

### 物件的繼承

```js
let water = {
  printName() {
    return '我是水';
  },
};
let bottle = {
  printMaterial() {
    return '塑膠';
  },
};

console.dir(bottle);
```

`console.dir` 可以印出物件的屬性。

```js
let water = {
  printName() {
    return '我是水';
  },
};
let bottle = {
  printMaterial() {
    return '塑膠';
  },
};

Object.setPrototypeOf(bottle, water);
console.dir(bottle);
console.dir(bottle.printName());
```

![](/img/prototype/prototype-08.png)

這邊我們可以看到水瓶繼承了水的屬性，所以水瓶可以用水的 function，印出來是`我是水`。

```js
let water = {
  printName() {
    return '我是水';
  },
};
let bottle = {
  printName() {
    return '我是水瓶';
  },
};

Object.setPrototypeOf(bottle, water);
console.dir(bottle.printName());
```

如果我們把`printMaterial`改成`printName`，它理所當然印出`我是水瓶`。

```js
let water = {
  printName() {
    return '我是水';
  },
};
let bottle = {
  printName() {
    return `${super.printName()} ---水瓶`;
  },
};

Object.setPrototypeOf(bottle, water);
console.dir(bottle.printName());
```

但是我們在 `bottle` 裡面使用 `super` ，他可以繼承原型的屬性，所以他印出了`我是水`，但也印出了`---水瓶`，證明他呼叫的是 `bottle` 的 `printName`。

javascript ES6 有出 `class` 的建構式語法糖，有興趣的可以再去看看，感謝大家。
