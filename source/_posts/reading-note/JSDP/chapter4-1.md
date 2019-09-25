---
title: 【讀書筆記】JavaScript Design Pattern Chapter04 函式（上）
tag:
  - 讀書筆記
  - JSDP
categories: JavaScript Design Pattern
urlname: javascript-design-pattern-function01
photos:
  - /img/cover/books.jpg
description: JavaScript Design Pattern，第四章函式。
date: 2018-11-07 17:49:58
---

<!-- more -->

接下來會學習到不同定義的函式，首先是函式表達式和函式宣告式，接著看函式作用域與 hosting 如何運作。

## 背景

JavaScript 有兩個主要特色：

- 函式屬於 JavaScript 第一級物件（first-class object）
- 函式提供作用域

函式也是物件：

- 可在執行期、程式執行的過程中動態建立
- 可以指定給變數，也可將參考複製給其他變數，可以被擴充，而且除了少數其他狀況外，也可以被刪除
- 可以作為參數傳遞給其他韓式，也可以作為其他函式的回傳值
- 可以有自己的屬性和方法

使用 Function 建構式跟使用 eval 一樣糟糕，因為程式碼使用字串的形式傳遞並執行，就必須跳脫字元，如此讀寫都很不方便。

JavaScript 中沒有大括號內的區域作用域，沒有區塊範圍，區塊並不產生有效的作用域，JavaScript 只有函式作用域，任何在函式裡面宣告的 var 變數 都是區域變數。

## 釐清術語的差別

```jsx
var add = function(a, b) {
  return a + b;
};
```

具名的函式表示式，又稱匿名函式，與函式宣告式的差別是函式物件的 name 屬性會是個空字串，具名的函式表示式和函式宣告式看起來類似，但表示式在結尾需要分號，而表達式不用。

函式實字也是常用的術語，但他可能代表函式表示式也可能代表具名韓式表示式，模凌兩可，最好不要用此術語。

## 宣告式 v.s. 表示式：命名與 Hoisiting

那該使用函數宣告式還是表示式呢？當語法不能使用宣告式就可以使用表示式，例如：將函式物件作為參數傳遞、物件實字內定義方法。

函式宣告式只能出現在 program code 裡面，意思是函式本體或全域空間中，他們定義無法賦值給變數或其他屬性，或作其他函式的參數。

## 函式的 name 屬性

對函式宣告式和具名函式表達式，name 屬性都有定義。對匿名函式表達式說，name 可能為 undefined 或空字串。
name 屬性也會用來遞迴呼叫自己，或是在除錯工具中顯示函式名稱，如果這兩種狀況都沒有需要，用不具名表達式會比較簡單也不囉唆。

技術上來說可以將一個具名函式表示式指派給另一個名稱的變數，但不是所有瀏覽器都支援，因此不建議這樣做。

## 函式的 Hoisting

所有變數無論被定義在函式中哪處，都會在幕後被提升到函式最前端。

```jsx
function foo() {
  console.log('global foo');
}
function bar() {
  console.log('global bar');
}
function hoistMe() {
  console.log(typeof foo); // 'function'
  console.log(typeof bar); //'undefined'

  foo(); // local foo
  bar(); // TypeError:bar is not function

  function foo() {
    console.log('local foo');
  }
  // 變數 foo 和實作都被提升

  var bar = function() {
    console.log('local bar');
  };
  // 僅有變數 bar 被提升，不包含實作，所以是 undefined
}

hoistMe();
```

## 回呼模式

函數是物件，意思就是可以作為參數傳遞給其他函式。

## 回呼與作用域

回呼並非是一次性的匿名函式或者全域函式，而是某個物件的方法，如果回呼的方法使用了 this 去參考其所屬的物件，this 會參考到全域物件，解決方法是除了傳遞回呼函式，額外傳遞回呼函式所屬物件，並使用 call 改變 this 的指向。

## 逾時

當使用 `setTimeout` 或 `setInterval` ，函數在作為變數傳遞時沒有加上括號，因為你不是想立刻執行它，而是指向它，讓 `setTimeout` 或 `setInterval` 稍後可以使用。

## 回傳函式

有個函式做了一個工作，可能是一些初始化，接著就對其回傳值工作，回傳值剛好是另一個函式：

```jsx
var setup = function() {
  alert(1);
  return function() {
    alert(2);
  };
};
var my = setup();
my();
```

```jsx
var setup = function() {
  var count = 0;
  return function() {
    return (count += 1);
  };
};
var next = setup();
next(); //1
next(); //2
next(); //3
next(); //4
```

## 自我定義函式

函式可以動態建立，且可以指派給變數。建立新函式，並指派給同一個變數，此變數原本指向的舊函數就會被覆蓋成新的。

```jsx
var scareMe = function() {
  alert('boo!');
  scareMe = function() {
    alert('double boo!');
  };
};
scareMe();
scareMe();
```

使用這種模式可以顯著提升效能，當函式一部份不需要的狀況下，就可以使用自我定義的函式更新自身的實作。這個模式另一個名字叫做懶惰的函式定義，因為這種函式在第一次使用之前都沒有正確定義，而之後就會變得懶惰。

此函數的缺點在它重新定義自身之前你加到原始函式的屬性都會遺失，如果使用不同名稱，例如新函式指派給另一個變數或是物件的另一個方法，那重新定義的部分就不會執行，而原始的函式本體就會執行。

以另一個例子來說，這次 `scareMe()` 函式要用第一級物件的使用方式：

- 加入一個新的屬性
- 將函式物件指派給新變數
- 函式也作為方法使用

```jsx
// 1.加入一個新屬性
scareMe.property = 'properly';
// 2.賦值給一個不同名稱
var prank = scareMe;
// 3.作為一個方法來使用
var spooky = {
  boo: scareMe,
};

// 用新的名稱呼叫

prank(); //boo
prank(); //boo
console.log(prank.property); // properly
// 用方法呼叫

spooky.boo(); //boo
spooky.boo(); //boo
console.log(spooky.boo.property); // properly

// 用自我定義函式呼叫
scareMe(); //double boo!
scareMe(); //double boo!
console.log(scareMe.property); //undefined
```

當自我定義函式被賦值給一個新變數時，他沒有照你預期，每一次呼叫 `prank();` 都會印出 `boo`，同時覆蓋全域的 `scareMe();` 函式，但 `prank();` 自己仍保有舊有的定義，包含 property 屬性。

這些每次的呼叫都會重新覆蓋 `scareMe();` 的指標，所以最終呼叫它，它擁有的是第一次就被更新的主體，會印出 `double boo!` ，同時也沒有 property 屬性。

## 立即函式

此模式本質上是一個函數表示式，並在定義後立刻執行。
立即函式由下面部分所組成：

- 用函式表示式定義函式
- 在函式最後加上括號，這樣會讓函式立刻執行
- 整個函式包在括號中（如果不將函式賦予給一個值才需要）

立即函式可以賦予程式碼作用域，有時候通常工作只要執行一次，沒有理由再去寫具名函式，有時候工作會需要暫時性變數，初始化後，變數會被洩露為全域變數，立即函式可以避免這個狀況。

### 立即函式的參數

立即函式可以傳遞參數，但不應該傳太多，這樣容易造成理解時的負擔。

### 立即函式的回傳值

立即函式可以有回傳值，而這些函式可以賦值給變數：

```jsx
var result = (function() {
  return 2 + 2;
})();
```

或是省略包著函式的括號，因為將立即函式的回傳值賦值給變數時不需要括號。

```jsx
var result = (function() {
  return 2 + 2; //4
})();
```

但可能會誤導，因為沒注意函式後面的括號，可能會以為 result 指向的是函式，但其實 result 是立即函式的回傳值。

但除了原始型別外，立即函式可以回傳任何型別的值，包含回傳函式，如此就可以利用立即函式私有的作用域儲存 private 資料。

這個範例中，立即函式回傳是一個函式，他會賦值給變數 getResult ，作用是簡單回傳 res ，它已經預先算好，存在立即函式的 closure。

```jsx
var getResult = (function() {
  var res = 2 + 2;
  return function() {
    return res;
  };
})();
```

立即函式也可以用來定義物件屬性，假設你需要一個屬性，但在定義之前需要一些運算才能得到正確的值，而立即函式的回傳值就成為該屬性的值。

```jsx
var o = {
  msg: (function() {
    var who = 'me';
    what = 'call';
    return what + ' ' + who;
  })(),
  getMsg: function() {
    return this.msg;
  },
};

o.msg; //call me
o.getMsg; //call me
```

### 優點及用法

- 將運算包裝，不必留下全域變數
- 將程式模組化，包裝到立即函式中
