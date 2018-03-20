---
title: 【 JS30 】Day12：Key Sequence Detection
tags:
- JavaScript
- JS30 系列
date: 2018-03-01 13:15:42
---
![](/img/js30day/small11.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：只有輸入某段特別密碼，才會出現特效。</span>

```js
const pressed = []; //保存已輸入值的陣列
const secretCode = 'wesbos'; //密碼

window.addEventListener('keyup', (e) => {
  console.log(e.key);
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  if (pressed.join('').includes(secretCode)) {
    console.log('DING DING!');
    cornify_add();
  }
  console.log(pressed);
}); 
```

使用`keyup`監聽按鍵行為，觸發時利用陣列的`push`塞入已經按下按鍵的內容，
利用`splice`來控制陣列的長度，使陣列為最後輸入的五個字元，
再以`join`、`includes`來驗證輸入值是否和密碼相同，若相同則出現特效。

## 使用技巧
- splice
- include
- join

## splice 刪除

**array.splice(start[, deleteCount[, item1[, item2[, ...]]]])**

- **start**
索引位置（從 0 開始），如果索引大於陣列長度，則索引值會被設為陣列長度；
如果索引為負值（從 -1 開始），則會從陣列最後一個元素往前更動，
且若此負數的絕對值大於陣列長度，則會被設置為 0 。

- **deleteCount**，選擇性。
表示要刪除原本陣列數量的整數。

- **item1,item2...**，選擇性。
從`start`位置起始，要加入到陣列的元素。 

回傳：一個被包含刪除的元素陣列，如果只有一個元素被刪除，
依舊是回傳包含一個元素的陣列，倘若沒有元素被刪除，則會回傳空陣列。

## include 包含
**arr.includes(searchElement[, fromIndex])**

- **searchElement**
要搜尋的元素

- **fromIndex**，選擇性。
預設值為 0 ，要在此陣列搜尋`searchElement`的位置。
如果是負數，則自`array.length - fromIndex`開始搜尋，預設值為 0 。

回傳：布林值

## join 合併字串
**arr.join([separator])**

- **separator**，選擇性。
用來隔開陣列中每個元素的字串。

如果必要的話，separator 會自動被轉成字串型態，未傳入參數，陣列中的元素將預設用英文逗號（「,」）隔開。
如果 separator 是空字串，合併後，元素間不會有任何字元。

回傳：一個合併所有陣列元素的字串。假如`arr.length`為 0，將回傳空字串。  