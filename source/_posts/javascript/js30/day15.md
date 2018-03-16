---
title: 【 JS30 】Day15：LocalStorage
category: JavaScript30
tags:
  - JavaScript
  - JS30
date: 2018-03-06 09:41:48
---
![](/img/js30day/small14.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：使用 LocalStorage 做 todolist</span>

```js
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];
```

一開始進入 start 作者已經命名好變數。

## 一、送出輸入項目
```js
addItems.addEventListener('submit', addItem);
```
在`input`輸入完，送出項目。

```js
function addItem(e) {
  e.preventDefault();
  // 取消送出資料後的自動刷新頁面    
  const text = (this.querySelector('[name=item]')).value;
  // item 的輸入值為 text 的 key / value，放入 json 中
  const item = {
      text, //es6:text:text
      done: false
  }

  items.push(item);
  //塞入陣列存取
  populateList(items, itemsList);
  //建html
  localStorage.setItem('items', JSON.stringify(items));
  //因為重新整理之後，輸入的資料會消失，則必須將資料輸入到瀏覽器的localStorage 
  this.reset();
  //清除輸入框（form的方法）
        }
```

## 二、新建後新增 html
```js
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
      return `
      <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
      </li>
      `;
  }).join('');
}
```
新增 html 的`li`項目。

```js
const items = JSON.parse(localStorage.getItem('items')) || [];
```
此時`items`必須更改為以上，假設`localStorage`有資料則取用，若沒有資料`items`為空陣列。


## 三、儲存 checkbox 狀態

```js
itemsList.addEventListener('click', toggleDone);
```
`ul`被點擊後，執行。

```js
function toggleDone(e) {
    if (!e.target.matches('input')) return;
    // input （checkbox）才執行動作
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    //true / false 切換

    localStorage.setItem('items', JSON.stringify(items));
    //存入localStorage
    populateList(items, itemsList);
    //更新 html
};

```

## 四、進入頁面
```js
populateList(items, itemsList);
```
假設進入頁面時`localStorage`有資料，在最底下執行`populateList`，以刷新 html 。


## 使用技巧

- localStorage
- dateset