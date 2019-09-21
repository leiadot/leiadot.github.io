---
title: 【讀書筆記】JavaScript Design Pattern Chapter06 程式碼重用模式（下）
tag:
  - 讀書筆記
  - JSDP
categories: CodingLife
urlname: javascript-design-pattern-multiplexing02
photos:
  - /img/cover/books.jpg
date: 2018-11-07 17:59:05
---

<!-- more -->

# 原型繼承

原型繼承模式可以開始討論「modern」的無 class 模式，物件要繼承自其他物件。

假設你有個物件需要重用，需要從這個物件取得功能，已建立第二個物件，會這樣：

```javascript=
var parent = {
  name: 'Papa',
};

var child = object(parent);
alert(child.name); //"Papa"
```

新增的 child 物件希望讓他和 parent 物件有一樣的屬性和方法，這個新的物件由 object 的函式去建立，但 JavaScript 本身沒有這個函式，那我們必須實作這個函式：

```javascript=
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

這邊讓 暫時建構式 F() 的原型指向父物件，最後在回傳這個實體，在這邊的 child 物件本身為空，但他可以使用 parent 的原型。

# 討論

當使用建構式來實作原型繼承模式，注意自身的屬性和建構式原型的屬性都會被繼承：

```javascript=
//父建構式
function Person() {
  //一個自己的屬性
  this.name = 'Adam';
}
//在原型中新增屬性
Person.prototype.getName = function() {
  return this.name;
};

//建立新的 Persons
var papa = new Person();
//繼承
var kid = object(papa);

//測試自身的屬性和來自原型的屬性是不是都被繼承
kid.getName(); //"Adam"
```

另一個變形範例，你可以選擇是否只繼承建構式的原型物件：

```javascript=
// 父建構式
function Person() {
  //一個自己的屬性
  this.name = 'Adam';
}

//在原型中新增了一個屬性
Person.prototype.getName = function() {
  return this.name;
};

//繼承
var kid = obejct(Person.prototype);

typeof kid.getName; //"function" 因為只繼承了 prototype 的函式
typeof kid.name; //"undefined" 而沒有繼承建構式內的屬性
```

## ECMA 5 特性

現在有 `Object.create` 方法，我們不需要再做剛剛 `Object()` 的實作了：

```javascript=
var child = Object.create(parent);
```

`Object.create` 接受了一個額外的參數：一個物件，這個物件的屬性會被加到新物件的屬性內：

```javascript=
var child = Object.create(parent, {
  age: { value: 2 },
});

child.hasOwnProperty('age'); //true
```

# 用複製屬性實作繼承

在這個模式之中，物件像其他物件取得功能的方式，只是簡單的使用複製，只是用迴圈來尋訪父物件的所有成員並複製他們，child 參數是選用的，沒有就會建立一個全新物件並回傳：

```javascript=
function extend(parent, child) {
  var i;
  child = child || {};
  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      child[i] = parent[i];
    }
  }
  return child;
}

var dad = { name: 'Adam' };
var kid = extend(dad);
kid.name; //"Adam"
```

這邊做的是淺拷貝，因為 JavaScript 的物件是使用參考來傳遞，一樣尋訪每個屬性並複製，只要該屬性是物件，那麼也同時改到父物件：

```javascript=
var dad = {
  counts: [1, 2, 3],
  reads: { paper: true },
};
var kid = extend(dad);
kid.counts.push(4);
dad.counts.toString(); //"1,2,3,4"
dad.reads === kid.reads; //true
```

想要避免這個問題就要使用深拷貝，深拷貝會檢查你要複製的屬性是否為物件或陣列，如果是的話會以遞迴的方式進入該物件。

你需要做的就是檢查屬性是否為物件，是的話就已遞迴方式複製每個屬性：

```javascript=
function extendDeep(parent, child) {
  var i,
    toStr = Object.prototype.toString,
    astr = '[object Array]';

  child = child || {};

  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      if (typeof parent[i] === 'object') {
        child[i] = toStr.call(parent[i]) === astr ? [] : {};
        extendDeep(parent[i], child[i]);
      } else {
        child[i] = parent[i];
      }
    }
  }
  return child;
}
```

接下來看新的實作，是否真的深拷貝到物件：

```javascript=
var dad = {
  counts: [1, 2, 3],
  reads: { paper: true },
};
var kid = extendDeep(dad);

kid.counts.push(4);
kid.counts.toString(); //"1,2,3,4"
dad.counts.toString(); //"1,2,3"

dad.reads === kids.reads; //false
kid.reads.paper = false;
kid.reads.web = true;
dad.reads.paper; //true
```

而這個模式完全沒有涉及到原型：只有物件跟物件自身的屬性。

# 混搭

混搭模式，不僅從一個物件複製，可以從任意數量的物件來複製屬性，並將他們混合到一個新物件中，只用迴圈跑過參數列，將傳遞進來的每個物件的每個屬性都複製起來：

```javascript=
function mix() {
  var arg,
    prop,
    child = {};
  for (arg = 0; arg < arguments.length; args += 1) {
    for (prop in arguments[arg]) {
      if (arguments[arg].hasOwnProperty(prop)) {
        child[prop] = arguments[arg][prop];
      }
    }
  }
  return child;
}
```

現在有個通用的混搭模式，可以傳遞任何數量的物件給他，並得到一個新物件：

```javascript=
var cake = mix({ egg: 2, large: true }, { butter: 1, salted: true }, { flour: '3 cups' }, { sugar: 'sure!' });
```

# 借用方法

有時候會發生一個狀況，你只需要物件中的一到兩個方法，，你希望重用他們，但不希望對該物件建立父子物件關係，這時候可以使用借用方法。

此模式是受益於 `call` 及 `apply`，兩者差別在他們接受的參數一個使用陣列表示，一個則接受一個個獨立參數。

這裡有個物件叫 myobj ，而且你知道另一個 notmyobj 物件裡有個 doStuff 方法，我們需要暫時借用他，你傳入你的物件，讓借來方法的 this 綁在 myobj 物件。

```javascript=
// call
notmyobj.doStuff.call(myobj, param1, p2, p3);
// apply
notmyobj.doStuff.apply(myobj, [param1, p2, p3]);
```

## 範例：向陣列借用方法

陣列有些有很好用的方法，而像 arguments 則沒有這些方法，這時可以使用 `slice` 跟陣列借用：

```javascript=
function f() {
  var args = [].slice.call(arguments, 1, 3);
  return args;
}

f(1, 2, 3, 4, 5, 6); // returns [2,3]
```

有個空物件被建立出來，只是為了使用他的方法。
另一種稍微長的方式是向 `Array.prototype.slice.call(...)`，這個方始要輸入比較常，但是可以省略建立空陣列的運算。

## 借用並綁定

不管是透過 call、apply 或是簡單的賦值來借用方法，方法內的 this 所指向的物件都是依賴運算式來決定，最好讓 this 的值在事先就綁定在一個特定的值。

```javascript=
var onder = {
  name: 'object',
  say: function(greet) {
    return greet + ', ' + this.name;
  },
};

//試用
one.say('hi'); //"hi, object"
```

現在有個 two 沒有 `say()` 方法，讓他從 one 那邊借用，`say()` 的 this 指向 two ，因此 this.name 為「another object」：

```javascript=
var two = {
  name: 'another object',
};

one.say.apply(two, ['hello']); //"hello, another object"
```

如果將函式指標賦予給全域變數，或者將函式作為 callback，那這樣的狀況該如何處理：

```javascript=
//將方法指定給變數
//方法內的 this 會指向全域物件
var say = one.say;
say('hoho'); //"hoho, undefined"

//將方法作為回呼傳遞
var yetanother = {
  name: 'Yet another object',
  method: function(callback) {
    return callback('Hola');
  },
};
yetanother.method(one.say); //"Holla, undefined"
```

`say()` 內部的 this 都指向了全域，於是上面整段都不如預期，這時候可以用一個簡單的函式，來將一個物件固定，或是綁在方法：

```javascript=
function bind(o, m) {
  return function() {
    return m.apply(o, [].slice.call(arguments));
  };
}
```

這個 bind 函式接受一個物件 o 和方法 m，將兩者綁定在一起後回傳一個新函式，新的函式透過閉包來存取 o 和 m，所以即使 bind 回傳之後，裡面那個函式也可以存取指向原本的物件跟方法（o 和 m）。

```javascript=
var twosay = bind(two, one.say);
twosay('yo'); //"yo, another object"
```

透過上面的實作可以知道，twosay 被建立成一個全域函式，this 也沒有指向全域物件，而是指向傳遞給 bind 的 two 物件，不管用什麼方式呼叫 twosay，this 都永遠綁定 two。

## Function.prototype.bind()

```javascript=
var newFunc = obj.someFunc.bind(myobj, 1, 2, 3);
// 將 someFunc 和 myobj 綁在一起，並同時域先填好三個參數給 someFunc。
```

bind 的實作：

```javascript=
if (typeof Function.prototype.bind === 'undefined') {
  Function.prototype.bind = function(thisArg) {
    var fn = this,
      slice = Array.prototype.slice,
      args = slice.call(arguments, 1);
    return function() {
      return fn.apply(thisArg, args.concat(slice.call(arguments)));
    };
  };
}
```

這份實作使用了部分應用，並串接參數列，包含傳遞給 bind 的參數（不含第一個），還有之後傳給 bind 所建立的新函數的參數，除了要綁的物件之外，沒有傳其他參數：

```javascript=
var twosay2 = one.say.bind(two);
twosay2('Bonjour'); //"Bonjour, another object"
```

這個範例，我們傳遞一個參數來做部分應用：

```javascript=
var twosay3 = one.say.bind(two, 'hihihi');
twosay3(); //"hihihi, another object"
```
