---
title: 【 JS30 】Day04：Array Cardio Day 1
date: 2018-01-30
category: JavaScript30
tags:
- JavaScript
- JS30
---

![](/img/js30day/small3.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：說明並練習這些在 JS 中常用的幾個陣列方法</span>

## 使用技巧

*   Array.prototype.filter()
*   Array.prototype.map()
*   Array.prototype.reduce()
*   Array.prototype.sort()

## 補充

*   Array.prototype.forEach()

[參考文章：【 ES6 】陣列麻吉罵上篇：ForEach、Filter、Map、Reduce](/2018/02/15/javascript/ES6/array)

**Array.prototype.filter()**

### 一. 使用 `filter` 挑選出生在15世紀的發明家。


```js
const fifteen = inventors.filter(function(inventor) {
    if (inventor.year >= 1500 && inventor.year < 1600) {
        return true; //keep it!!
    }
});

console.table(fifteen);
```

或改寫成 `arrow function`

```js
const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));

```

**Array.prototype.map()**

###二. 給予一組擁有 first 與 last 屬性的陣列。

```js
const fullNames = inventors.map(inventor => ${inventor.first} ${inventor.last});

console.log(fullNames);
```

**Array.prototype.sort()**

### 三. 將發明家陣列從年老到年輕排序。

```js
const ordered = inventors.sort(function(a,b){
  if(a.year>b.year){
    return 1;
  }else{
    return -1;
  }
});
```

```js
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
console.table(ordered);
```

**Array.prototype.reduce()**

### 四. 發明家們總共活了多少年？

```js
const totalYears = inventors.reduce((total, inventor) => {
    return total + (inventor.passed - inventor.year);
}, 0);

console.log(totalYears);
```

### 五. 排序活最久到活最少的發明家

```js
const oldest = inventors.sort(function(a, b) {
    const lastGuy = a.passed - a.year;
    const nextGuy = b.passed - b.year;

    return lastGuy > nextGuy ? -1 : 1;
});

console.table(oldest);
```

### 六. 建立一個名字裡有包含’de’的清單

[https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris](https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris)

```js
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
// 選取所有a連結，並組成陣列

const de = links
    .map(link => link.textContent)
    .filter(streetName => streetName.includes('de'));
```

### 七. 按字母排序名字

```js
const alpha = people.sort((lastOne, nextOne) => {
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
});
console.log(alpha);
```

`people`字串陣列以`Beck, Glenn`結構所組成的，使用`split`方法分割姓名，
拆解為`[aLast, aFirst] = [Beck, Glenn]`的模式，使用`sort`排序後，再傳回`alpha`。

`stringObj.split([separator[, limit]])`

*   回傳為字串分割成的字串陣列。
*   `stringObj` 必要項。要分割的 String 物件或字串常值。 `split` 方法不會修改這個物件。
*   `separator` 選擇項。字串或規則運算式物件，可識別用來分隔字串的一個或多個字元。如果省略，則會傳回包含整個字串的單一元素陣列。
*   `limit` 選擇項。用來限制陣列中所傳回元素個數的值。

### 八. 總結各項例子

```js
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];
{
  car:1
  truck:2
}

const transportation = data.reduce(function(obj, item) {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});

console.log(transportation);
```

初始先予給一個空物件，假設物件沒有`item`的屬性，則新增一個`item`屬性，數值為0，
若有相同的item屬性，則做累加，結束後回傳物件。
