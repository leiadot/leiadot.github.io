---
title: 【JS30】Day09：Dev Tools Domination
tags:
  - JS30系列
date: 2018-02-23 11:39:39
urlname: javascript-30-day09
categories: CodingLife
photo:
  - '/img/js30day/small8.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：了解開發者工具使用方法</span>

## 一、對 DOM 元素按右鍵下中斷點

![](/img/js30day/day9-1.jpg)

1. subtree modifications: 當子元素發生變化時
2. arrtibute modifications: 當元素發生變化時
3. node removal: 當元素被移除時

## 二、console.log 各種用法

1. console.log(''); 一邊的 console.log
2. console.log('%s');
3. console.log('%c');
4. console.wran(''); 出現警告圖示
5. console.error(''); 出現錯誤圖示
6. console.info(''); 出現資訊圖示
7. console.assert(Condition Expression,''); 判斷是否為真，false 則回傳錯誤。

```js
```

8. console.clear(); 清除所有訊息
9. console.dir(); 顯示所有屬性
10. console.groupCollapsed、console.groupEnd 群組化訊息

```js
dogs.forEach(dog => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});
```

11. console.count(); 累加計數

```js
console.count(a);
console.count(a);
console.count(b);
a: 1;
a: 2;
b: 1;
```

12. console.time()、 console.timeEnd() 計算區域範圍執行時間區間
13. console.table()
