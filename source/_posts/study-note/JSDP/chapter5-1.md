---
title: 【讀書筆記】JavaScript Design Pattern Chapter05 物件建立模式（上）
tag:
  - 讀書筆記
  - JSDP
categories: CodingLife
urlname: javascript-design-pattern-object01
photos:
  - /img/cover/books.jpg
date: 2018-11-07 17:56:01
---

<!-- more -->

## 命名空間

可以降低全域變數的需求量，幫忙避免命名衝突和過度的名稱前綴詞。JavaScript 沒有內建的命名空間，為了避免一堆函式、變數、物件污染全域空間，應該要建立一個全域物件。

```jsx

var MYAPP = {};
//全域物件
MYAPP.Parent = function () {};
//建構式
MY.somevar = =1;
//變數
MYAPP.modules.modules1 = {};
MYAPP.modules.modules1.data = {a:1};
//巢狀物件
```

應該用全大寫表示全域變數，讓他特別明顯（另外注意常數也是全大寫）。

缺點：

- 越長的巢狀名稱表示更長
- 唯一的全域實體代表任何程式碼都可以變更這個實體，而接下來的功能也都會使用變更後的狀態。
- 要多打一點字，它相當於在每個變數和函數之前加上前綴詞。

#### 泛用的命名空間函式

有些你正要加入命名空間的屬性也許早已存在了，於是會不小心覆蓋它，因此最好建立命名空間和新增屬性前，先檢查是否存在。

```jsx
if (typeof MYAPP === 'undefined') {
  var MYAPP = {};
}
// 檢查全域

var MYAPP = MYAPP || {};
//簡短寫法
```

但如果遇到巢狀物件，必須對每個物件或屬性檢查，此時需要一個函數幫忙做檢查細節。

```jsx
MYAPP.namespace('MYAPP.module.module2');

//效果等同於：
//var MYAPP = {
//	module: {
//		module2: {}
//	}
//}

var MYAPP = MYAPP || {};

MYAPP.namespace = function(ns_str) {
  var parts = ns_str.split('.'),
    parent = MYAPP,
    i;

  //去除最前投多餘的全域名稱
  if (parts[0] === 'MYAPP') {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};
```

允許下列做法：

```jsx
var m2 = MYAPP.namespace('MYAPP.module.module2');
m2 === MYAPP.module.module2; //true
//將回傳值指派給區域變數
MYAPP.namespace('module.module2');
//忽略開頭的MYAPP
MYAPP.namespace('MYAPP.once.upon.the.time');
//很長的命名空間
```

## 宣告相依性

JavaScript 通常會使用命名空間，並讓良好的模組化，讓你可以只引用你需要的模組。

將與你程式碼相依的模組，宣告在函式或是模組頂端，這樣意味者建立唯一一個區域變數，並指向所需的模組。

```jsx
var myFunction = function() {
  var event = YAHOO.util.Event,
    dom = YAHOO.util.Dom;

  //使用event, dom
};
```

好處：

- 宣告相依性，揭示你程式碼的使用者可以了解他們需要哪些相依模組需要引用
- 宣告在函式頂端，較容易找到並解決相依性
- 使用區域變數比找全域變數快，更比起全域變數的巢狀屬性快。採用相依性模式，只需要在函式使用全域變數一次就好。
- 有些最小化工具會重新命名區域變數，但不會去更改全域變數，因為不安全。

比較：

```jsx
//未使用
function oldFn() {
  alert(MYAPP.modules.m1);
  alert(MYAPP.modules.m2);
  alert(MYAPP.modules.m3);
}
//最小化
alert(MYAPP.modules.m1);
alert(MYAPP.modules.m2);
alert(MYAPP.modules.m3);

//使用
function newFn() {
  var modules = MYAPP.modules;
  alert(m1);
  alert(m2);
  alert(m3);
}
//最小化
var a = MYAPP.modules;
alert(a.m1);
alert(a.m2);
alert(a.m3);
```

## Private 屬性與方法

JavaScript 所有的物件成員都是 Public。

```jsx
var myobj = {
  myprop: 1,
  getProp: function() {
    return this.myprop;
  },
};
console.log(myobj.myprop); // myprop 可被 public 存取
console.log(myobj.getProp()); // getProp() 也是 public
```

#### Private 成員

雖然語言本身沒有提供特殊語法，但可以用閉包來實作，任何屬於閉包作用域的變數都不會暴露在建構式之外，以下舉例：

```jsx
function Gadget() {
  //private 成員
  var name = 'iPod';
  //public 方法
  this.getName = function() {
    return name;
  };
}
var toy = new Gadget();

console.log(tou.name); //undefined
console.log(toy.getName()); //"iPod"
```

在 JavaScript 表現隱私權很容易，將想要保持 Private 的資料用函式包起來，且確保他是函式的區域變數，為了是不要讓他在函式外被存取。

#### 特權方法

存取 private 成員的 public 方法的一個名字。

上一個 `getName()` 就是一個特權函式，因為他對 name 屬性有特別的存取權。

#### 隱私權錯誤

當你直接從特權函式回傳一個 private 變數，且這個變數是個物件或陣列時，外圍的程式碼仍可以更改 private 變數，因為傳遞的是變數的參考。

```jsx
function Gadget() {
  var specs = {
    screen_width: 320,
    screen_height: 480,
    color: 'white',
  };

  this.getSpecs = function() {
    return specs;
  };
}

var toy = new Gadget(),
  specs = toy.getSpecs();
specs.color = 'black';
specs.price = 'free';
console.dir(toy.getSpecs());
```

- 小心！不要回傳想要保持 private 的物件或陣列參考。
- 讓 `getSpecs()` 回傳一個新的物件，物件中僅需要使用者所需要的資料(最低授權原則)。

- 建立一個 specs 物件的複本，你可以使用常用的的複製物件函式。

之後會提到 `extend` ，它會對物件做一個淺層複製（只複製最上一層的參數），另一個為 `extendDeep` 他會以遞迴的方式複製所有的屬性和他們所擁有的巢狀屬性。

最低授權原則：以這個範例來說，假設 Gadget 的使用者對於此元件的大小是否符合感興趣，那僅需要的只有大小而已。因此你給全部，不如新的函式，讓函式回傳包含寬和高的物件，甚至你可能都不需要 getSpecs 方法。

#### 物件實字與隱私權

前面的範例都是使用建構式，那如果使用物件實字仍可能使用 private 成員嗎？

你所需要只是要將 private 成員用函式包起來，如果是物件實字可以使用立即函式來建立閉包。

```jsx
var myobj;
(function() {
  var name = 'oh, mygod';

  myobj = {
    getName: function() {
      return name;
    },
  };
})();

myobj.getName(); // "oh, mygod"
```

用另一個相同概念的方法寫：

```jsx
var myobj = (function() {
  var name = 'oh, mygod';

  return {
    getName: function() {
      return name;
    },
  };
})();

myobj.getName(); // "oh, mygod"
```

#### Prototypes 與隱私權

使用建構式所產生的 private 成員，他們在每次建構式呼叫產生新物件時都重新建立，這是建構式每個 this 成員都有的缺點。

解法：將共同屬性和方法加到 prototype 屬性中，如此所有相同建構式的實例都會共享，實體之間也能共享隱藏的 private 成員。

可以用建構式中的 private 屬性和物件實字的 private 屬性來組合，因為 prototype 也是物件，所以可以用物件實字來建立。

```jsx
function Gadget() {
  var name = 'iPod';

  this.getName = function() {
    return name;
  };
}

Gadget.prototype = (function() {
  var browser = 'mobile webkit';

  return {
    getBrowser: function() {},
  };
})();

var toy = new Gadget();
console.log(toy.getName());
console.log(toy.getBrowser());
```

#### 將 Private 函式揭露成 Public

揭露模式：將 private 方法揭露為 public 方法的模式。

假設物件中的所有功能都對物件來說很關鍵，於是你可能想盡可能保護此物件，但同時希望 public 方法來存取他的一些功能，就很適合用揭露模式。

當揭露方法是 public ，物件會變得很脆弱，時時暴露在可能不小心被修改的風險之下。

先來第一種範例，建立在其中一種私有權模式上物件實字的 private 成員模式：

```jsx
var myarr;

(function() {
  var astr = '[object Array]',
    toString = Object.prototype.toString;

  function isArray(a) {
    return toString.call(a) === astr;
  }

  function indexOf(haystack, needle) {
    var i = 0,
      max = haystack.length;
    for (; i < max; i += 1) {
      if (haystack[i] === needle) {
        return i;
      }
      return -1;
    }
  }
  myarr = {
    isArray: isArray,
    indexOf: indexOf,
    inArray: indexOf,
  };
})();
```

astr 和 toString 為 private 變數，isArray 和 indexOf 為 private 函式，結尾出現 myarr 物件，裡面包含允許揭露的 public 功能。

```jsx
myarr.isArray([1, 2]); // true
myarr.isArray({
  0: 1,
}); // false
myarr.indexOf(['a', 'b', 'z'], 'z'); // 2
myarr.inArray(['a', 'b', 'z'], 'z'); // 2
```

```jsx
myarr.indexOf = null;
myarr.inArray(['a', 'b', 'z'], 'z'); // 2
```

現在如果發生預料之外的事在 public 的 indexOf 上，但 private 的 indexOf 函式仍然是安全的，所以 inArray() 仍然可以運作。
