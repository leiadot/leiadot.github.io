---
title: 【JS30】Day17：Sort Without Articles
tags:
- JavaScript
- JS30系列
date: 2018-03-15 09:24:14
categories: CodingLife
photo:
- '/img/js30day/small16.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：排除某些文字下進行陣列排序</span>

## 一、排序陣列

```js
const sortedBands = band.sort(function(a,b){
  if(a > b){
    return 1
  }else{
    return -1
  };

});
```

將原本的陣列做排序，但因為有`a`、`an`、`the`等冠詞，造成無法正確依照字母順序做排序。

## 二、使用正規表示法過濾冠詞

```js
function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();

```

## 三、排序過濾好的陣列

```js
const sortedBands = bans.sort((a,b)=> strip(a):strip(b) ? 1:-1);
```
這邊使用三元運算子及箭頭函式。

## 四、渲染 DOM

```js
document.querySelector('#bands').innerHTML = 
      sortedBands.map(band => `<li>${band}</li>`).join('');
```
這邊加上`join();`是因為在陣列裡面，字串的區隔是逗號，
如果不寫入`join`，則會把逗號一起渲染。

## 使用技巧

- 正規表示法
- map
- join
- sort