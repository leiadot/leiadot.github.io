---
title: 【ES6】陣列麻吉罵上篇：ForEach、Filter、Map、Reduce
date: 2018-02-05
tags:
  - ES6
categories: CodingLife
photo:
  - '/img/cover/javascript.jpg'
---

在我們初學 Javascript ，最常用到的就是`for`迴圈，但當案子的複雜度增加，
我們常常都要在迴圈外面先建立一個空陣列，而且迴圈都不知道迴到哪去（？）
因此 ES6 中，有新增幾個陣列的方法，在這邊介紹幾個陣列的麻吉罵。

此篇文章的資料及範例程式碼皆擷取自[MDN](https://developer.mozilla.org/zh-TW/)。

[ForEach](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)、[Filter](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)、[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)、[Reduce](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

<!-- more -->

- forEach
  `forEach` 循環陣列的每個元素。
- filter()
  `filter` 遍歷陣列的每個元素，回傳 `true` 時，目前的值會保留在原本的陣列，這會回傳一個新陣列，而不是修改原本陣列的值。
- map()
  `map` 會給你一組一樣長度的新陣列，雖然`filter`也是產生一個新的陣列，但`filter`僅會把有符合`function`檢驗的元素回傳到新陣列（陣列長度不一定相同）。
- reduce()
  使用 `reduce` 把陣列內的內容組合並最終回傳一個結果。

# forEach

```js
arr.forEach(function callback(currentValue[, index[, array]]) {
}[, thisArg]);
```

- callback
  將把`array`的子元素當作參數，各別帶進這個`function`。
- currentValue
  目前被處理中的元素。
- index 選填
  目前被處理中元素的索引值。
- array 選填
  呼叫`forEach`的 array 本身。
- thisArg 選填
  執行`function`的`this`。

```js
const items = ['item1', 'item2', 'item3'];
const copy = [];

for (let i = 0; i < items.length; i++) {
  copy.push(items[i]);
}
```

使用 for 迴圈。

```js
const items = ['item1', 'item2', 'item3'];
const copy = [];

items.forEach(function(item) {
  copy.push(item);
});
```

使用 forEach。

比較下來，forEach 跟 for 迴圈是有同樣效果，但 forEach 省略一長串的寫法。

# filter

```js
var newArray = arr.filter(callback[, thisArg])
```

- callback
  測試陣列中的每個元素，回傳值為`true`的元素值，則保留在新陣列中可帶入三個傳入參數。
  - currentValue
    目前被處理中的元素。
  - index 選填
    目前被處理中元素的索引值。
  - array 選填
    呼叫`forEach`的 array 本身。
- thisArg 選填
  執行`function`的`this`。

```js
var newArray = arr.filter(callback[, thisArg])
```

filter 會將陣列中通過 function 檢驗的元素組成一組新陣列。

```js
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = [];
for (let i = 0; i < words.length; i++) {
  if (words[i].length > 6) {
    result.push(words[i]);
  }
}
console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

使用 for 迴圈。

```js
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

使用 filter，跟原 for 比較，省略使用 if、push 的方法，且程式碼更為乾淨簡潔。

# map

```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
    // Return element for new_array
}[, thisArg])
```

- callback
  為產生新陣列的回呼函式。
- currentValue
  目前被處理中的元素。
- index 選填
  目前被處理中元素的索引值。
- array 選填
  呼叫`map`的陣列。
- thisArg 選填
  執行`function`的`this`。

```js
var kvArray = [{ key: 1, value: 10 }, { key: 2, value: 20 }, { key: 3, value: 30 }];

var reformattedArray = kvArray.map(obj => {
  var rObj = {};
  rObj[obj.key] = obj.value;
  return rObj;
});

// reformattedArray：[{1: 10}, {2: 20}, {3: 30}],
// kvArray is still:
// [{key: 1, value: 10},
//  {key: 2, value: 20},
//  {key: 3, value: 30}]
```

使用 map，map 會給你一組一樣長度的新陣列，filter 同樣產生一個新陣列，
但因新陣列僅有符合 function 檢驗的元素（陣列長度不一定相同）。

# reduce

```js
arr.reduce(callbackFn[(accumlator, currentValue, currentIndex, array)], initialValue);
```

reduce 將組合的初始數值及陣列中的各個值，傳入函數，化為單一值。

- callbackFn -`accumlator`
  用來組合累積回呼函式回傳值的組合器。組合器是上一次呼叫後，所回傳的累算數值。 -`currentValue`
  當次欲組合的元素數值。 -`currentIndex`選填
  原陣列所處理中的元素索引。 -`array` 選填
  呼叫`reduce()`方法的陣列。
- `initialValue` 選填
  組合傳入的初始值，為額外的陣列的初始加值。

當回呼函式第一次被呼叫時，accumulator 與 currentValue 的值可能為兩種不同的狀況：

若在呼叫`reduce()`時有提供`initialValue`（也就是初始值），
則`accumulator`（組合器）將會等於`initialValue`，
且 `currentValue`會等於陣列中的第一個元素值。

若沒有提供 `initialValue`（初始值），則 `accumulator`（組合器）會等於陣列的第一個元素值，
且 `currentValue`將會等於陣列的第二個元素值。

```js
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue;
});

// output:10
```

| callback    | accumulator | currentValue | currentIndex | array           | return value |
| ----------- | ----------- | ------------ | ------------ | --------------- | ------------ |
| first call  | 1           | 2            | 1            | [1, 2, 3, 4 ,5] | 3            |
| second call | 3           | 3            | 2            | [1, 2, 3, 4 ,5] | 6            |
| third call  | 6           | 4            | 3            | [1, 2, 3, 4 ,5] | 10           |
| fourth call | 10          | 5            | 4            | [1, 2, 3, 4 ,5] | 15           |
