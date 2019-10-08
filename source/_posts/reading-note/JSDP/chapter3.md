---
title: 【讀書筆記】JavaScript Design Pattern Chapter03 實字與建構式
tags:
  - 讀書筆記
  - JSDP
categories: Front-end
urlname: javascript-design-pattern-construction
photos:
  - /img/cover/books.jpg
description: JavaScript Design Pattern，第三章實字與建構式。
date: 2018-11-07 17:49:00
---

此章解釋為何實字標記會比內建建構式（`new Object()`、`new Array()`）還好，主要傳達就是訊息的延伸（避免用建構式並用實字替代）。

<!-- more -->

## 物件實字

- 名值對的雜湊表，類似其他語言的關聯式陣列。
- 值可以是原始型別或另一個物件，稱之屬性；值可以是函式，稱為方法。
- JavaScript 允許任何時刻改變、移除、增加屬性和方法。

## 物件實字語法

- 將物件用大括號（`{}`）包起來
- 以逗號分格每個屬性和函式
- 分號分隔屬性名稱和屬性值
- 將物件賦予給變數，記得右大括號後要加上分號

## 用建構式創造物件

JavaScript 沒有 class，但有建構函式，它使用非常類似其他語言以 class 為基礎的物件建立語法。

```jsx
var car = { goes: 'far' };
// 實字
var car = new Object();
car.goes = 'far';
//建構式
```

實字是更好的物件建立模式，程式碼比較短，且實字不需要作用域的判斷，意思就是你可能會創造其他相同名稱的區域建構式，而解譯器需要你從呼叫的 `Object()` 所在的作用域，一路向外查找整個作用域鍊，直到找到 `Object()` 建構式。

## 自訂建構式

以 `new` 來呼叫建構式，會經過以下流程：

- 建立一個空物件，參考至 this 變數，並繼承此函式的原型
- 藉由 this 的參考，將屬性和方法加入到此物件
- 這個 this 所參考的物件，會隱晦地回傳出去

如下

```jsx
var Person = function(name) {
  // 使用物件實字
  // 建立一個空物件
  // var this = {};

  this.name = name;
  this.say = function() {
    return "I'm" + this.name;
  };

  //return this;
  //隱晦回傳
};
```

將 `say()` 方法加入 this ，每次呼叫 `new Person()` 一次，一個新的函式就會建立在記憶體中，這樣是非常消耗效能的，較好的方法是加入到原型中：

```jsx
Person.prototype.say = function() {
  return 'I am' + this.name;
};
```

只要可重複利用的成員，例如方法，都應該放入原型。
上述的`建立空物件`，並不是真的空，比較像是：`var this = Object.create(Person.prototype);`。

## 建構式的回傳值

在建構函式中，沒有使用 `return` 的敘述，預設就是回傳 `this` 所參考的物件，另外你也可以自由回傳任何物件，只要是物件就好，如果回傳的不是物件就會被忽略，回傳就會是 `this` 所參考的物件。

## 強制 new 模式

建構式只是用 `new` 呼叫，但本質還是函式，如果忘記加上 `new`，建構式中的 `this` 會指向全域物件，例如在瀏覽器中會指向 window ，這樣的行為如同替全域物件加上屬性，因此必須要使用 `new` 呼叫建構式。

## 命名慣例

建構式的名字首部大寫，其他一般函式則首字小寫。

## 使用 that

```jsx
function Wattle() {
  var that = {};
  that.tasts = 'yummy';
  return that;
}
```

等同於

```jsx
function Wattle(){
	return {
		that.tasts = 'yummy';
	};
}
```

使用 that 輸出結果與一般建構式結果無異，但如果使用 that 方法，會讓建構式失去原本繼承的 prototype 屬性，物件實體會和原型本身失去連結。

## 自我呼叫的建構式

為了解決前一個模式的問題，讓物件實體可以使用原型可以考慮以下方法：

```jsx
function Waffle() {
  if (!(this instanceof Waffle)) {
    return new Waffle();
  }
  this.tastes = 'yummy';
}
Waffle.prototype.wantAnother = true;
```

## 令人好奇的陣列實字

當你傳入單一數值給 `new Array()` 該數值不會變成陣列的第一個元素，而是變成陣列的長度，如果傳入一個符點數，就會造成錯誤。

## 檢查陣列

陣列的型別是物件，但如果要檢查一個值是不是陣列，可以用程式檢查 `length` 屬性是否存在，更健全的方法是使用 `isArray` 方法，但如果環境不支援此方法，可對陣列呼叫 `toString` 的 `call` 方法，應會回傳`[Object Array]`。

## JSON

JSON 和物件實字在語法上唯一不同是 JSON 屬性名稱須用引號包起來，對於物件實字，屬性名稱只有在不合法的狀況下才需要包，例如中間穿插空格。在 JSON 中不可以使用函式及正規表示式實字。

## 正規表示式實字

JavaScript 的正規表示式也是一種物件，可以透過兩種方式建立：

- 使用 new RegExp() 建構式
- 使用正規表示式實字

```jsx
var re = /\\/gm;
//實字
var re = new RegExp('\\\\', 'gm');
```

使用正規表示式實字符號需要跳脫字元，甚至經常需要兩個反斜線。

## 正規表示式實字語法

正規實字符號使用斜線（"/"）來包住檢查對應的正規表示格式，第二個斜線後面可以加入格式的修飾詞，修飾詞的格式是不加引號的字母：

- g：全域檢查
- m：檢查多行
- i：不分大小寫

使用實字和建構式之間的差異：

- 遇到接受正規表示物件的函數（String.prototype.replace()），使用實字可以讓程式碼更簡潔
- 正規表示格式無法事先得知，而是要在執行階段才能知道，可使用建構式。
- 實字在語法解析時就已產生，而且只產生一個物件。如果在迴圈中使用同樣的正規表示式，前面建立的物件就會回傳，而且保留已設定過的所有屬性。
- 如果不使用 new 呼叫 RegExp() ，行為如同有使用 new。

## 原始型別包裹

JavaScript 有五種原始型別：數值、布林、字串、物件、null、undefined ，除了最後兩種，其餘型別皆有原始型別包裹物件。包裹物件可使用建構式來建立。

包裹物件（new Number()...）擁有一些屬性和方法可以使用，但原始數值在呼叫方法時，會在背後暫時轉型為一個物件，因此可以表現得像物件一樣使用那些屬性和方法。

使用包裹物件唯一理由是，你想要擴充並保持狀態，因為原始物件不是物件，他們無法擴充以新增屬性，但擴充字串、布林、數字，這些狀況很少用到，狀況如下：

```jsx
var greeting = 'hello';
//原始字串
greeting.split(' ')[0]; //hello
//暫時轉型成物件，可使用方法
greeting.smile = true;
//企圖擴充原始型別不會產生錯誤
typeof greeting.smile; //undefined
//但其實沒有用
```

## 錯誤物件

JavaScript 有數個內建的錯誤物件，隨著 thorow 敘述一起使用：Error()、SyntaxError()、TypeError() 等等，這些錯誤物件具有下列屬性：

- name：建立錯誤物件的建構式函式名稱
- message：建立錯誤物件時傳遞給建構式的字串

throw 可以跟任何物件一起運作，不一定是錯誤物件，可搭配 `catch` 敘述去處理資訊，錯誤物件的建構式如果沒有用 new 呼叫，結果會跟使用建構式呼叫一樣。
