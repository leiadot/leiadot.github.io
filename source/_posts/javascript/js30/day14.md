---
title: 【JS30】Day14： JavaScript References VS Copying
tags:
  - JS30系列
date: 2018-03-05 12:42:34
categories: CodingLife
photo:
- '/img/js30day/small13.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：理解 javascript reference 與 copy</span>

## 原始型別

```js
  let age = 100;
  let age2 = age;

  console.log(age, age2);
  //100,100

  age = 200;

  console.log(age, age2);
  //200,100
```

原始型別都是 Call by value，所以複製時不影響，當`age = 200`，
因為`age2`已經被定義過，則`age`的改變不會影響`age2`。

## 陣列

```js
  const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
  const team = players;
  
  team[3] = 'Lux';

  console.log(team,players);

  //['Wes', 'Sarah', 'Ryan', 'Lux']
  //['Wes', 'Sarah', 'Ryan', 'Lux']
```
陣列為 Call by reference ，因為我們更新`team`，
但`team`本身沒有陣列可以更改，`team`本身參照`player`的原始陣列，
所以如果你修改原始陣列，或當你更新任何陣列，他就會被修改，陣列參照不同於數字、布林及字串。

假設你是想複製且更新一份陣列。
```js
const team2 = players.slice();
const team3 = [].concat(players);
const team4 = [...players];
const team5 = Array.from(players);
```

## 物件

```js
const person = {
    name: 'Wes Bos',
    age: 80
};

const captain = person;
captain.number = 99;
```
物件和陣列相同，屬於 call by reference ，因此為了不要污染到`person`。

```js
const cap3 = {...person};
```
或

```js
const cap2 = Object.assign({}, person, {
    number: 99,
    age: 12
});
console.log(cap2);
```

如此，可覆寫原本屬性與值的配對，且`person`則不會被污染到，但有例外的是。

```js
const wes = {
    name: 'Wes',
    age: 100,
    social: {
        twitter: '@wesbos',
        facebook: 'wesbos.developer'
    }
};

const dev = Object.assign({}, wes);

dev.social.twitter = '@coolman'

console.log(dev.social);
// Object { twitter: '@coolman' , facebook: 'wesbos.developer'}
console.log(wes.social);
// Object { twitter: '@coolman' , facebook: 'wesbos.developer'}
```
`Object.assign`僅能做一層複製。

```js
const dev2 = JSON.parse(JSON.stringify(wes));
```
可使用以上做破解。
因為使用`JSON.stringify`，將原本物件的內容，全部轉換成字串，
回到原始型別，在用`JSON.parse`轉成物件，則全部內容都能被複製成功。

## 使用技巧 
- slice()
- concat()
- es6 Spread
- Array.from()
- Object.assign()