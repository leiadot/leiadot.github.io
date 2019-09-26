---
title: 【讀書筆記】JavaScript Design Pattern Chapter05 物件建立模式（下）
tags:
  - 讀書筆記
  - JSDP
categories: JavaScript Design Pattern
urlname: javascript-design-pattern-object02
photos:
  - /img/cover/books.jpg
description: JavaScript Design Pattern，第五章物件建立模式。
date: 2018-11-07 17:56:10
---

<!-- more -->

## 模組模式

模組模式提供了結構化，所以被廣泛使用，JavaScript 沒有專給套件用的特殊語法，而模組模式提供工具，來建立自成一體且去耦合的程式碼。

模組模式是數種模式的組合：

- 命名模式
- 立即函式
- Private 成員和特權方法
- 宣告相依性

第一步：建立命名空間——參考之前使用 namespace() 建立出 utility 模組範例：

```jsx
var MYAPP = namespace('MYAPP.utilities.array');
```

第二步：定義模組。此模組使用一個立即執行函式，如果需要隱私權就提供 private 作用域，立即函式會回傳一個物件：真正的模組，有自己 public 介面，給模組的客戶使用：

```jsx
MYAPP.utilities.array = (function() {
  return {
    //...
  };
})();
```

接著新增一些 public 方法：

```jsx
MYAPP.utilities.array = (function() {
  return {
    inArray: function(needle, haystack) {
      //...
    },
    isArray: function(a) {
      //...
    },
  };
})();
```

### 揭示模組模式

前面介紹隱私權模式的時候已經討論過揭露模式，請參考前面範例，就是讓縮有方法保持 private 而僅在最後建立 public API。

### 產生建構式的模組

有時候建構式建立物件會更方便，唯一的差別就是包裝模組的立即函式回傳的不是物件，是函式。

```jsx
MYAPP.utilities.array = (function() {
  // 宣告相依性
  var uobj = MYAPP.utilities.object,
    ulang = MYAPP.utilities.lang,
    // private 屬性跟方法
    Constr;

  //Public API —— 建構式
  Constr = function(o) {
    this.elements = this.toArray(o);
  };
  //Public API —— 原型
  Constr.prototype = {
    consturctor: MYAPP.utilities.Array,
    version: '2.0',
    toArray: function(obj) {
      for (var i = 0, a = [], len = obj.length; i < len; i += 1) {
        a[i] = obj[i];
      }
      return a;
    },
  };
  // 回傳建構式
  // 給新的命名空間
  return Constr;
})();

var arr = new MYAPP.utilities.Array(obj);
```

### 引進全域物件

你可以傳遞參數給包裝模組的建構式，通常是全域變數的參考，甚至是全域物件的本身，引入全域物件可以幫忙加速立即函式的執行，因為引入的變數對函式來說而言已經是區域的。

```jsx
MYAPP.utilities.module = (function(app, global) {
  //全域物件的參考
  //還有全域命名空間的物件
  //現在都為區域
})(MYAPP, this);
```

## 沙盒模式

沙盒模式提供一個環境讓模組執行，此環境不會影響其他模組或沙盒。

除此之外，也解決了命名模式的缺點：

- 命名模式依賴一個全域變數，不可能在同一頁面上讓同一個函式庫或程式的兩種版本同時執行，因為他們都需要全域符號。
- 命名空間需要輸入很長的明稱，執行時需要解析多層的命名。

### 一個全域建構式

全域物件的差別：

- 命名空間模式：全域物件。
- 沙盒模式：全域建構式。

利用這個建構式來建立物件，並同時傳遞一個回呼函式，此函式會讓沙盒看起來像一個孤立的環境。此建構式看起來像上個 MYAPP 範例。

```jsx
new Sandbox(function (box)){
	//here is the code
});
```

再新增兩個特性：

- 建立物件時可以使用 new ，也可以不用。
- 建構式可以額外接受一些設定值參數，來指定該物件實體所需要的模組名稱。

略過 new 並用虛構的「ajax」、「event」模組來建立：

```jsx
Sandbox(['ajax', 'event'], function(box) {
  //console.log(box);
});
```

拆成個別參數傳遞的用法：

```jsx
Sandbox('ajax', 'dom', function(box) {
  //console.log(box);
});
```

當沒有傳遞任何模組的時候：

```jsx
Sandbox('*', function (box) {
	//console.log(box);
}
Sandbox(function (box) {
	//console.log(box);
});
```

巢狀化：

```jsx
Sandbox('dom', 'dom', function(box) {
  Sandbox('ajax', function(box) {
    //兩邊的 box 物件是不同的
    // ajax
  });
  //這邊的程式不會有 ajax 模組
});
```

這邊可以看到，程式碼被包進回呼函式來保護全域命名空間。除此之外也可以利用函式也是物件的特性，將資料用靜態屬性的方式儲存在沙盒建構式中。

### 新增模組

沙盒建構式也是物件，可以新增一個名為 modules 的靜態屬性，這屬性又是另一個物件：

```jsx
Sandbox.modules = {};
Sandbox.modules.dom = function(box) {
  box.getElement = function() {};
  box.getStyle = function() {};
  box.foo = 'bar';
};
Sandbox.modules.event = function(box) {
  // box.constructor.prototype.m = "mm"
  // 如有必要則存取沙盒的原型
  box.attachEvent = function() {};
  box.dettachEvent = function() {};
};
```

這個範例中加入了 dom 模組與 event 模組，每個函式都接受 box 實體為參數，可能會新增屬性或方法到這個 box 裡面。

### 實作建構式

沙盒建構式實作範例：

```jsx
function Sandbox() {
  //將參數轉為陣列
  var args = Array.prototype.slice.call(argument),
    callback = args.pop(),
    modules = (atgs[0] && typeof atgs[0] === "string") ? args : args[0],
    i;

  // 確保函式是建構式呼叫
  if (!(this instanceof Sandbox)) {
    return new Sandbox(modules, callback);
  }

  // 依照需要為 this 增加屬性
  this.a = 1;
  this.b = 2;

  // 現在將模組新增至核心的 this 物件
  // 沒有指定模組或是用 * 來表示所有模組

  if (!module || modules === '*') {
    modules = [];
    for (i in Sandbox.modules) {
      if (Sandbox.modules.hasownProperty(i)) {
        modules.push(i);
      }
      //初始所需要的模組
      for (i = 0; i < modules.length; i += 1) {
        Sandbox.modules[modules[i]](this);
      }
      //執行回呼
      callback(this);
    }
  }

Sandbox.prototype = {
	name: "My App",
	version: 1.0,
	getName: function () {
		return this.name;
	}
}

```

- 檢查 this 是否為 Sandbox 的實體，如果不是，表示呼叫 Sandbox 沒有加 new ，那麼就以建構式的方式再呼叫函式。
- 可以在建構式中，新增屬性到 this ，也可以新增屬性到此函式的原型。
- Sandbox 中所使用的模組名稱可以用陣列、個別參數、\* 字號，或不填入參數。
- 你可以只載入最基礎的模組，所需的模組都可以用命名慣例找到外部檔案並載入。
- 如果已經知道所需模組便可初始化，意思是呼叫所有模組的實作函式。
- 建構式最後一個參數是回呼，會在新被建立好的實體中呼叫，這個回呼就是 Sandbox ，他會取得一個裝好全部所需功能的 box 物件。

## 靜態成員

- 靜態的屬性和方法不會在實體之間有所改變。
- 以 class 為基礎的語言，靜態成員使用特別的語法建立並使用，也可以有 private 成員。

### Public 靜態成員

JavaScript 沒有特別的語法來表達靜態成員，但你可以使用建構式，並新增屬性到建構式中， 這樣如同擁有 class 語言的語法，因為建構式跟函式一樣都是物件，也可以擁有屬性，新增屬性可參考上一章記憶模式。

這個例子定義了一個建構式，有一個靜態方法和一個實體方法，靜態方法不需要 Gadget 物件就可以運作，但實體方法則需要。

```jsx
//建構式
var Gadget = function() {};
//靜態方法
Gadget.isShiny = function() {
  return 'u bet';
};
//加在原型中的一般方法
Gadget.prototype.setPrice = function(price) {
  this.price = price;
};
```

一般的方法要透過實體呼叫，而靜態方法可以直接透過建構式呼叫。

```jsx
// 呼叫靜態方法
Gadget.isShiny(); // "u bet"
// 建立一個實體然後呼叫方法
var iphone = new Gadget();
iphone.setPrice(500);
```

無法試圖用靜態方法呼叫實體，也同樣不能用實體呼叫靜態方法。

```jsx
typeof Gadget.setPrice; // "undefined"
typeof iphone.isShiny; // "undefined"
```

有時候讓實體也使用靜態方法會很方便，只要在原型新增就可以了，並以此方法作為外觀，指向原本的靜態方法。

```jsx
Gadget.pototype.isShiny = Gadget.isShiny;
iphone.isShiny(); // "u bet"
```

**小心！呼叫 `Gadget.isShiny()` 會將 this 指向建構式；呼叫 `iphone.isShiny();` 而 this 將指向 iphone。**

```jsx
//建構式
var Gadget = function(price) {
  this.price = price;
};
//一個靜態方法
Gadget.isShiny = function() {
  //這裡永遠都會運作
  var msg = 'u bet';
  if (this instanceof Gadget) {
    msg += ', it costs $' + this.price + '!';
  }

  return msg;
};

//將一個一般的方法加到原型
Gadget.prototype.isShiny = function() {
  return Gadget.isShiny.call(this);
};
//測試呼叫靜態方法
Gadget.isShiny(); // "u bet"
//測試一個實體，並非用靜態的方式呼叫
var a = new Gadget('499.99');
a.isShiny(); // "u bet , it costs $499.99!"
```

### Private 靜態成員

- 由同個建構式建立的物件之間都可分享的成員
- 建構式之外不可存取的成員

```jsx
var Gadget = (function() {
  var counter = 0;

  return function() {
    console.log((counter += 1));
  };
})(); // 立即執行
```

這個範例有一個靜態屬性名稱 `counter` ，參考前面討論過的 private 屬性，現在也是需要建立一個閉包來裝 private 成員，讓函式執行並回傳一個函式。將回傳的函式指派給變數 Gadget。

```jsx
var g1 = new Gadget(); //logs 1
var g2 = new Gadget(); //logs 2
var g3 = new Gadget(); //logs 3
```

因為每個物件都讓 counter 值增加，這種靜態屬性就成為一個 ID ，這種唯一識別符非常有用。

接下來承上範例，來試看看特權方法

```jsx
//建構式
var Gadget = (function() {
  //靜態變數/屬性
  var counter = 0;
  NewGadget;
  //新的實作
  NewGadget = function() {
    counter += 1;
  };
  //特權方法
  NewGadget.prototype.getLastId = function() {
    return counter;
  };
  //覆蓋原本的建構式
  return NewGadget;
})(); // 立即執行
```

```jsx
var iphone = new Gadget();
iphone.getLastId(); // 1
var ipod = new Gadget();
ipod.getLastId(); // 2
var ipad = new Gadget();
ipad.getLastId(); //3
```

無論 public 還是 private ，他們可以包含非特定於實體的方法和資料，且不會隨著新的實體又重新建立，這種靜態屬性實作有點類似之後會講的單體建構式。

## 物件常數

JavaScript 沒有常數，一種常見的變通方法就是使用命名慣例將變數全部大寫。

```jsx
Math.PI;
Math.SQRT2;
Number.MAX_VALUE;
```

你也可以為你的常數使用相同命名慣例，並讓他們變成建構式靜態屬性。

```jsx
var Widget = function() {
  //實作
};

Widget.MAX_HEIGHT = 320;
Widget.MAX_WIDTH = 480;
```

假設真的需要一個不可變動的值，可以建立 private 屬性，並提供一個 getter 方法且不要有 setter。

一個泛用的 constant 物件實作，提供這些方法：

```jsx
set(name, value);
//用來定義一個新的常數
isDefined(name);
//檢查常數是否存在
get(name);
//取得常數值
```

下面這份實作允許原始型別為常數值，且採用額外的保護措施（hasOwnProperty），以確保是用內建屬性的名稱來宣告屬性，並每個常數名稱再額外隨機產生一個前綴詞。

```jsx
var constant = function() {
  var constants = {},
    ownProp = Object.prototype.hasOwnProperty,
    allowed = {
      string: 1,
      number: 1,
      boolean: 1,
    },
    prefix = (Math.random() + '_').slice(2);
  return {
    set: function(name, value) {
      if (this.isDefined(name)) {
        return false;
      }
      if (!ownProp.call(allowed, typeof value)) {
        return false;
      }
      constants[prefix + name] = value;
      return true;
    },
    isDefined: function(name) {
      return ownProp.call(constants, prefix + name);
    },
    get: function(name) {
      if (this.isDefined(name)) {
        return constants[prefix + name];
      }
      return null;
    },
  };
};
```

實作範例：

```jsx
//檢查是否定義過
constant.isDefined('maxwidth'); //false
//定義常數
constant.set('maxwidth', 480); //true
//再檢查一次
constant.isDefined('maxwidth'); //true
//嘗試重新定義
constant.set('maxwidth', 320); //false
//確認常數值
constant.get('maxwidth'); //480
```

## 鏈接模式

鏈接模式允許你讓物件一個接著一個呼叫多個方法，既不需要將前一次操作賦值給變數，也不需要將你的呼叫拆成多行。

當建立的方法不具有意義的回傳值時，你可以讓他們回傳 this ，也就是方法所運作的實體物件，這樣就能讓物件的使用者直接呼叫下一個方法：

```jsx
var obj = {
  value: 1,
  increment: function() {
    this.value += 1;
    return this;
  },
  add: function(v) {
    this.value += v;
    return this;
  },
  shout: function() {
    alert(this.value);
  },
};
//鏈接呼叫
obj
  .increment()
  .add(3)
  .shout(); //5
//逐一呼叫
obj.increment();
obj.add(3);
obj.shout(); //5
```

### 鏈接模式的優點與缺點

優點：

- 少打字
- 幫助思考，看能不能建立更小更專門的函式，可提升維護性

缺點：

- debug 困難（又稱為火車事故）

## method() 方法（sugar method）

對於習慣 method() 思考，JS 可能會讓他們困惑，這就是為什麼有些程式員會把 JS 寫得 class-like，提出 method() 的作者（Douglas Crockford）承認這個方法並不是推薦的方式，但可能會在未來某些應用程式中碰到。

使用建構式就像在 Java 中使用 class ，也讓你可以在建構式本體中，新增實體的屬性到 this，但在 this 上新增方法非常沒效率，會造成每個實體都重新建立，這就是為什麼可重用的方法需要新增在 prototype 上。

定義一個 class 的方法類似這樣：

```jsx
var Person = function(name) {
  this.name = name;
}
  .method('getName', function() {
    return this.name;
  })
  .method('setName', function(name) {
    this.name = name;
    return this;
  });
```

**注意建構式是如何鏈接 `method` 的呼叫，這用到鏈接模式，幫助你單一敘述定義整個 class。**

這個 method 接受兩個參數：

- 新方法的名稱
- 新方法的實作

這些鏈接的新方法就會新增到 Person 的 class 裡面，而方法的實作也就是一個函式，內部的 this 會指向 Person 所建立的物件。

用 Person() 建立新物件：

```jsx
var a = new Person('Adam');
a.getName(); //'Adam'
a.setName('Eve').getName(); // 'Eve'
```

注意範例的 setName，可以這樣是因為 setName 回傳 this。

最後這是 method 模式實作的方法：

```jsx
if (typeof Function.prototype.method !== 'function') {
  //先檢查是否已經建立過了
  Function.prototype.method = function(name, implementation) {
    this.prototype[name] = implementation;
    //將 implementation 傳遞的函式加到建構式的原型中，this 會指向建構式
    //原型就會被擴充
    return this;
  };
}
```
