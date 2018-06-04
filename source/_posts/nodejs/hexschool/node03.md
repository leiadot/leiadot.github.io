---
title: 【NodeJS】Firebase 資料庫（上）
tags:
  - NodeJS
  - NodeJS前後端開發實戰筆記
  - 六角學院
date: 2018-03-04 22:36:12
---
![](/img/nodejs_hexschool.png)

六角學院 2018 首推 Node.js 課程，
日安在這邊會寫下自己簡單的筆記，除了讓自己方便複習，也提供大家參考。

> [NodeJS 前後端開發實戰](http://www.hexschool.com/courses/nodejs.html)

版本：node 8.10.0、npm 5.6.0、firebase realtime database

<!-- more -->

# 一、firebase
免費版在空間上及效能上相當足夠，須申請 google 帳號。 
＊規則為權限相關

## 環境講解
1. 建立專案
2. 選擇將 firebase 加入網路應用程式
3. 將 code 貼入 html head 標籤中，做 firebase 初始化

＊若要顯示資料記得移至`body`結尾。

# 資料讀取與寫入

## ref 路徑、 set 新增
- ref：尋找資料庫路徑
- set：新增資料

寫入資料，如果`ref`沒有指定路徑，會從根目錄往下尋找。
```js
firebase.database().ref().set('hi');
```
※ 若規則裡面的寫入、讀取權限沒打開，驗證無法通過，仍然無法寫入資料。

firebase 全部為**物件**格式，不能為陣列內容。

```js
firebase.database().ref('student1/name').set(
  {
student1:{
    name:'tom',
    num:'1'
  },
  student2:{
    name:'john',
    num:'2'
  }
  });
```
則根目錄會新增兩個`student`物件，若更改物件內容，如下。
```js
firebase.database().ref('student1/name').set('bob');
```
則`tom`則會被替換為`bob`。

## once 顯示資料到網頁上

```html
<h1 id="title"></h1>
```
將資料庫的資料顯示在`h1`的 html tag 中。
```js
var myName = firebase.database().ref('myName');
// 選取資料庫路徑
myName.once('value', function(snapshot) {
// 使用once抓取資料庫資料，撈出 value 的內容，放到 function 的 snapshot 中
    var str = snapshot.val();
    // 將資料命名變數
    document.getElementById('title').textContent = str;
    // 顯示在 h1 中
})
```
如此，資料庫的資料便會顯示，但只能讀取一次，必須刷新頁面才會重抓資料。
```js
firebase.database().ref('myFriends').set({
    friend1: 'tom',
    friend2: 'coco'
});
const friendsRef = firebase.database().ref('myFriends');
friendsRef.once('value', function(snapshot) {
    console.log(snapshot.val())
})
```

也可以寫入物件資料，並撈出讀取。

## on 資料即時顯示

```js
var myName = firebase.database().ref('myName');
// 選取資料庫路徑
myName.on('value', function(snapshot) {
// 使用on抓取資料庫資料，即時同步顯示
    var str = snapshot.val();
    // 將資料命名變數
    document.getElementById('title').textContent = str;
    // 顯示在 h1 中
})
```

`on`和`once`最大的差異性在於，`on`不需要刷新頁面即可與資料庫同步，`once`則僅會載入一次，更新須再刷新頁面。

# firebase 非同步觀念

```js
var myName = firebase.database().ref('myName');
// 選取資料庫路徑
myName.on('value', function(snapshot) {
// 使用on抓取資料庫資料，即時同步顯示
    console.log(snapshot.val());
})
console.log('QQ');
```
因為 firebase 為非同步執行，firebase會先回傳資料，而此時 js 會向下非同步執行`console.log('QQ')`，再執行 firebase 的內容，若是資料量少，firebase 也有可能會先回傳資料。

## 使用 push 新增資料

```js
const todos = firebase.database().ref('todos');
todos.push((content:'今天要吃飯')); 
```

當`push`後，firebase 會產生一個亂數，類似 hush 值的概念。

```js
const data = {
  todos:{
    "L9d_dx40X2uCl-fG0OL":{
      content:'今天要吃飯'
    },
    "L9d_dx40X2uCl-fG0OL":{
      content:'今天要洗澡'
    }
  }
}
```

## 使用 remove、child 移除資料

```js
const todos = firebase.database().ref('todos');
// 直接尋找路徑
const todos = firebase.database().ref().child('todos');
// ref()找到資料庫根目錄，向下尋找子目錄 todos
todos.child('L9d_dx40X2uCl-fG0OL').remove();
// 找到子目錄項目後，刪除
```

## for-in 語法講解

```js
for(variable in Obj|Array){

  statements;
}
```
`for-in`語法為拉出索引。

```js
const colors:['red','blue','green']
const kaohsiung=[
  {
    father:'tom',
    mom:'mary'
  },
  {
    father:'bob',
    mom:'jane'
  }
]
const todos =[
  num1:{
    content:'刷牙'
  },
  num2:{
    content:'洗澡'
  }
]
```

上面有三種陣列，分別來表示不一樣的結果。

```js
for (let item in colors){
  console.log(item);
}
// 0
// 1
// 2
```
撈出索引值。
```js
for (let item in kaohsiung){
  console.log(kaohsiung[item].father);
}
// tom
// bob
```
撈出內容。
```js
for (let item in todos){
  console.log(item);
}
// num1
// num2
```
撈出 key。

```js
for (let item in todos){
  console.log(todos[item]);
}
// {content:'刷牙'}
// {content:'洗澡'}
```

撈出物件資料

```js
for (let item in todos){
  console.log(todos[item].content);
}
// 刷牙
// 洗澡
```

撈出 value 。
