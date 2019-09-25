---
title: 【讀書筆記】JavaScript Design Pattern Chapter06 程式碼重用模式（上）
tag:
  - 讀書筆記
  - JSDP
categories: JavaScript Design Pattern
urlname: javascript-design-pattern-multiplexing01
description: JavaScript Design Pattern，第六章程式碼重用模式。
photos:
  - /img/cover/books.jpg
date: 2018-11-07 17:58:05
---

<!-- more -->

- 「多用物件複合，少用類別繼承。」
- 說到程式碼重用，第一件事想到的就是繼承，但他不是唯一一種方法。

## Classical 繼承模式 v.s. Modern 繼承模式

在有 class 的語言中，每個物件都是某個特定的 class 的一個實體，沒有 class 就無法建立出物件，但在 JavaScript 中，物件僅是名與值，可以立即建立及改變。

JavaScript 有建構式，new 運算子類似 classes 的用法。

```javascript=
Person adam = new Person();
//Java
var adam = new Person();
//JavaScript
```

這兩段語法非常相像，但建構式仍舊是函式，導致許多開發者用 class 的方式來思考 JavaScript，進而發展出模擬 class 的繼承想法，這稱之為「classical」。而所謂的「modern」模式指的是讓你不需要思考 classes 的其他所有模式。

## 使用 Classical 繼承的預期結果

Classical 的實作目標是讓一個 `child();` 建構式所建立的物件可以取得另一個`Parent();`建構式的屬性。

```javascript=
function Parent(name) {
  this.name = name || 'Adam';
}
//父建構式
Parent.prototype.say = function() {
  return this;
};
//新增功能
function Child(name) {}
//子建構式
inherit(Child, Parent);
//繼承
```

`inherit()` 函式做了繼承的工作，但它需要自己實作，非語言提供。

## Classical 模式 #1 —— 預設的模式

最常用的方式，是使用 `Parent()` 建構式建立一個物件，並指派給 `Child()` 的原型。

```javascript=
function inherit(C, P) {
  C.prototype = new P();
  //注意 new 運算子
}
```

prototype 應指向一個物件而非函式，所以它必須指向父建構式所建立的實體，而非建構式本身。之後使用`new Child();` 就會取得 `Parent();` 的原型。

### 追蹤原型鍊

用這個模式，你同時繼承了實體本身的屬性和方法。

1. 用 `new Pserson()` 建立一個物件，他保有 name 的屬性資料。
2. 物件嘗試存取 `say()` ，但建構式沒有這個方法。
3. 往上查找 `Pserson()` 的 prototype。

```javascript=
var kid = new Child();
kid.say(); //"Adam"
```

建構式 `Child()` 和 prototype 都是空白的，**proto** 指向 `inherit()` 函式建立的 `new Pserson()` ，在呼叫 `say()` ，子建構式沒有這個方法，父建構式也沒有這個方法，就會再往上查找父建構式的 prototype。

`say()` 裡面有個參考 `this.name`，再依序從 `kid`、子建構式、子建構式 prototype、父建構式、父建構式 prototype 查找。

```javascript=
var kid = new Child();
kid.name = 'Amy';
kid.say(); //"Amy"
```

`kid.name` 不會修改父建構式的屬性，會在自身直接建立新的屬性，`say()` 再從剛剛的序列查找，查找`this.name`，在 `kid` 物件就找到了。

### 模式 #1 的缺點

- 同時繼承加在 this 本身的屬性和原形的屬性，大多時候你並不想要本身的屬性，這比較像是屬於特定的實例，不適合重用。
- 不能讓參數給予子建構式，再讓子建構式傳遞給父建構式。

```javascript=
var s = new Child('Setch');
s.say(); //"Adam"
//希望出現 Setch，但出現 Adam
```

這個結果不如預期，必須每次需要子物件時執行一次繼承，最後是不斷再建立父建構式。

## Classical 模式 #2 —— 借用建構式

這個模式解決了上個範例的「無法傳遞參數」給父建構式的問題，他借用了父建構式，將子建構式用 this 綁定父建構式，並轉送所有參數：

```javascript=
function Child(a, c, b, d) {
  Parent.apply(this, argument);
}
```

用這個方法，只繼承了在父建構式中加至 this 的屬性，而沒有繼承加到原型的成員，子物件可以取得繼承成員的複製，而不像第一個模式（只是參考）。

範例比較：

```javascript=
function Article() {
  this.tag = ['js', 'css'];
}
var article = new Article();

function Blogpost() {}
Blogpost.prototype = article;
var blog = new BlogPost();

function StaticPage() {
  Article.call(this);
}
var page = new StaticPage();

article.hasOwnProperty('tags'); // true
blog.hasOwnProperty('tags'); // false
page.hasOwnProperty('tags'); // true
```

- 第一種的預設模式使得 blog 物件可以透過原型獲得 tags 的存取權，自身不具有 tags，所以是 false。
- 第二種借用模式，page 自身屬性有 tags，是因為使用了借用建構式，新物件就會取得父建構式 tags 成員的複製，而不是參考。

### 原型鍊

```javascript=
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
};
//父建構式新增新功能
function Child(name) {
  Parent.apply(this.argument);
}
//子建構式繼承父建構式，但不會繼承父原型
var kid = new Child('Amy');
kid.name; //"Amy"
typeof kid.say; //"undefined"
```

Child.prototype 根本沒被使用到，他所指向的是一個空物件。

### 用借用建構式實現多重繼承

```javascript=
function Cat() {
  this.legs = 4;
  this.say = function() {
    return 'meaowww';
  };
}

function Bird() {
  this.wings = 2;
  this.fly = true;
}

function CatWings() {
  Cat.apply(this);
  Bird.apply(this);
}

var jane = new CatWings();
console.dir(jane);
```

### 借用建構式的優點和缺點

- 優點：可以拿到父物件自身屬性的複製，而不是參考，所以不會有意外覆寫到父物件屬性的問題。
- 缺點：prototype 的屬性都沒被繼承

## Classical 模式 #3 —— 借用並設定原型

將前兩個模式組合起來，先借用建構式，接著也將子建構式的原型指向父建構式的實體。

```javascript=
function Child(a, c, b, d) {
  Parent.apply(this, argument);
}
Child.prototype = new Parent();
```

### 優點：

- 子建構式取得了父建構式自身成員的複製
- 取得父建構式原型成員的參考
- 子建構式可以傳遞任何參數給父建構式

### 缺點：

- 父建構式被呼叫了兩次，效率比較差。

### 範例：

```javascript=
function Parent(name) {
  this.name = name || 'Adam';
}
//父建構式

Parent.prototype.say = function() {
  return this.name;
};
//新增原型

function Child(name) {
  Parent.apply(this, arguments);
}
Child.prototype = new Parent();

var kid = new Child('Amy');
kid.name; // "Amy"
kid.say(); //"Amy"

delete kid.name;
kid.say(); //"Adam"
```

`say()` 的原型被繼承了，所以當自身的 `name` 被刪除，就會使用到原型鍊預設的屬性。

## Classical 模式 #4 —— 分享原型

這個模式不像上一個繼承模式一樣，需要呼叫兩次父建構式，這個模式不會引發父建構式的呼叫。

根據經驗來說，重要的成員，且任何需要繼承的事物，都應該放在原型，而不是放在 this 裏，那就可以將子建構式原型設為和父建構式原型相同。

```javascript=
function inherit(C, P) {
  C.prototype = P.prototype;
}
```

但所有物件其實都分享相同原型，導致修改了原型，就會影響所有原型鏈。

## Classical 模式 #5 —— 暫時的建構式

這個模式可以打斷父原型和子原型之間的連結，同時又能受益於原型鏈的優點。

```javascript=
function inherit(C, P) {
  var F = function() {};
  F.prototype = P.prototype;
  C.prototype = new F();
}
```

這個模式和 #1 的預設模式稍有不同，因為這邊的子物件謹繼承原型的屬性，這樣利用了「原型就是為了放置可重用功能的地方」也處理好 this，「讓任何在父建構式加在 this 的成員都不會被繼承」。

建立一個新的子物件，並觀察他的行為：

```javascript=
var kid = new Child();
```

若你存取 `kid.name` 會是 undefined，因為 `name` 是父建構式自身的屬性，而在繼承的過程中，並沒有呼叫 `new Parent()` 代表根本沒有父建構式的屬性。

而當存取 `kid.say()` 的時候，物件在 `new Child()` 根本不存在，因此原型鏈會向上查找，`new F()` 也沒有這個方法，但 `Parent.prototype` 有這個方法，`Parent.prototype` 會讓所有繼承 `Parent()` 的不同建構式和這些子建構式所建立的物件所共享，他們使用的都是同一塊記憶體。

### Superclass

在前一個模式的基礎上，你可以新增一個參考指向原本的父親，這很類似在其他語言的 superclass。

我們將屬性命名為 uber，因為「super」是個保留字，而 superclass 可能會引導不知情開發者的聯想，而誤以為 Javascript 是有 class 的。

```javascript=
function inherit(C, P) {
  var F = function() {};
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
}
```

### 重新設定建構式的參考

現在我們的 classical 繼承函式近乎完美，最後我們要重新設定建構式的參考，如果不設定的話，所以有的子物件就會回報 `Parent()` 是他的建構式，這樣不行的。

假設用前一份 `inherit()` 的實作：

```javascript=
function Parent() {}
function Child() {}

inherit(Child, Parent);

var kid = new Child();
kid.constructor.name; //"Parent"
kid.constructor === Parent; //true
```

constructor 屬性比較少用，但在執行時期用來檢查物件很方便，可以重新設定，讓他指向預期中的建構式。

```javascript=
function inherit(C, P) {
  var F = function() {};
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
  C.prototype.constructor = C;
}
```

這個模式又稱為聖杯繼承模式（holy grail）。

另一種聖杯模式的優化，是避免每次繼承都重複建立暫時（代理）建構式，因為我們建立一次就夠了，需要改變的是他的原型，可以利用一個立即函式，並將 proxy 函式儲存在他的閉包裏。

```javascript=
var inherit = (function() {
  var F = function() {};
  return function(C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
  };
})();
```

### Klass

許多 JavaScript 函式庫都在模擬 class ，並提供新的語法糖，將下來的實作有點不一樣，但有一些共通點：

- 命名都有一組慣例，遵循這個慣例都會被當成 class 的建構式，例如：initialize、\_init 等等。
- Classes 可以繼承其他 classes
- 可以在子 class 中存取父 class（superclass）。

接下來用 JavaScript 來模擬 Class。

```javascript=
var Man = klass(null, {
  __construct: function(what) {
    console.log("Man's constructor");
    this.name = what;
  },
  getName: function() {
    return this.name;
  },
});
```

上述範例，是以一個 klass 函式的形式出現，你在其他狀況可以會看到 Klass 的建構式，或是 Object.prototype 的方式出現，關於 klass 函式的實作，下方會在探討。

這個函式接受兩個參數：

- 父 class 作為繼承用
- 一個新的 class 實作，採用物件實字語法

規定 class 的建構式必須是一個名為 \_\_constructor 的方法。一個 Man 的 class 實作，他不繼承任何 class，意思就是他繼承的是 object。

Man 本身有自己的屬性，建立在 constructor 中，另外還有個 getName 方法，Man class 本身就是建構式，接下來的動作讓它更像 class 實體化：

```javascript=
var first = new Man('Adam'); //logs "Man's constructor"
first.getName(); //"Adam"
```

接下來來擴充新的 class，建立 SuperMan class：

```javascript=
var SuperMan = klass(Man, {
  __construct: function(what) {
    console.log("SuperMan's constructor");
  },
  getName: function() {
    var name = SuperMan.uber.getName.call(this);
    return 'I am' + name;
  },
});
```

這個範例中，給的第一個參數是 class Man，會被繼承，在 `getName()` 它利用 SuperMan 的 uber（super）靜態屬性呼叫父 class 的 `getName()`：

```javascript=
var clark = new SuperMan('Clark Kent');
clark.getName(); //"I am Clark Kent"
```

在 `console.log` 裡面，印出的第一行是「Man's constructor」接著是「SuperMan's constructor」，父建構式會在子建構式之前呼叫。

再來試看看 instanceof 運算子是否回傳預期中的結果：

```javascript=
clark instanceof Man; //true
clark instanceof SuperMan; //true
```

接下來看看 klass 實作：

```javascript=
var klass = function(Parent, props) {
  var Child, F, i;

  //1.
  //新的建構式，在最後會被回傳，且被當 class使用。
  //在函式中呼叫 __consteuct 方法，在那之前會先利用靜態的 uber 屬性呼叫父 class 的 __consteuct ，如果繼承是 Object 的話， uber 有可能未被定義，例如 class 的 Man。
  Child = function() {
    if (Child.uber && Child.uber.hasOwnProperty('__construct')) {
      Child.uber.__construct.apply(this, arguments);
    }

    if (Child.uber.hasOwnProperty('__construct')) {
      Child.prototype.__construct.apply(this, arguments);
    }
  };

  //2.
  //新的建構式，使用了前面的 classical 繼承的聖杯模式
  //如果 沒有需要繼承的 Parent，那就繼承 Object 的 prototype。
  Parent = Parent || Object;
  F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.uber = Parent.prototype;
  Child.prototype.constructor = Child;

  //3.
  //加入實作的方法
  //用迴圈查找所有方法，加到 Child 的原型之中
  for (i in props) {
    if (props.hasOwnProperty(i)) {
      Child.prototype[i] = props[i];
    }
  }
  // 回傳Class
  return Child;
};
```
