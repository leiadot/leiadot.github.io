---
title: 【讀書筆記】JavaScript Design Pattern Chapter04 函式（下）
tag:
  - 讀書筆記
  - JSDP
categories: CodingLife
urlname: javascript-design-pattern-function02
photos:
  - /img/cover/books.jpg
date: 2018-11-07 17:50:58
---

<!-- more -->

## 立即物件初始化

另一種類似立即函式且避免全域污染的方式，此模式建立一個物件，並帶有 `init` 方法，建立物件後立即執行 `init` 做初始化。

```jsx
({
	maxwidth: 500,
	maxheight: 30,
	gimmeMax:function (){
		return this.maxwidth + "x" + this.maxheight
	},
	init:function() {
		console.log(this.gimmeMax();)
	}
}).init();
```

用括號包起物件實字，關閉括號之後立即呼叫 `init` ，意思就是下方兩種寫法都成立。

```jsx
({...}).init();
({...}.init());
```

優點：

- 與立即函式相同，執行一次性初始化工作，也不會汙染全域物件
- 適合一次性工作

## 初始階段的分支

將功能分開測試，並使用初始化分支做唯一一次檢查。

## 函式屬性——記憶模式

任何函式都具有`length`屬性，用來表示預期接收的參數數量。

```jsx
function func(a, b){ ... }
console.log(func.length); //2
```

可以隨時將你的函式新增屬性，一種自訂屬性的案例是用它來快取函式的運算結果（回傳值），快取函式的結果也被稱為記憶模式。

假設限定函式只接受原始型別的參數，如果有更複雜的參數，可以將參數序列化，化為一個 JSON 字串，並用此字串作為 catch 物件的鍵值。

序列化後，物件的識別會消失，如果有兩個不同物件但剛好有相同屬性，這兩個物件會共用同一個快取項目。

## 設定值物件

設定值模式是提供乾淨 API 的一種方式，在建立函式庫或是給其他開發者使用的程式，此模式會特別有效。

在編寫函式時需要傳遞大量參數，有一種更好的方法，就是將所有參數替換成唯一一個，讓此參數變成一個物件來表示設定值。

```jsx
var conf = {
  username: 'batman',
  first: 'Bruce',
  last: 'Wayne',
};
addPerson(conf);
```

設定設定值的優點：

- 不需要記住參數和順序
- 可以更安全略過選用參數
- 更容易閱讀和維護
- 更容易新增和移除參數

缺點：

- 需要知道參數名稱
- 設定值物件的屬性名稱無法被最小化

## Curry

### 函式的應用

在純函式的程式語言中，函式並不是被呼叫而是被應用，因為 JavaScript 的函式其實是物件而且有自己的方法。

```jsx
// 定義函式

var sayHi = function(who) {
  return 'Hello' + (who ? ',' + who : '') + '!';
};

// 呼叫函式

sayHi(); // "Hello"
sayHi('world'); // 'Hello, world'

// 應用函式
sayHi.apply(null, ['hello']); //Hello, hello
```

呼叫函式和應用函式的結果都相同，`apply()` 需要兩個參數，第一個參數是物件，用來綁定函式內部的 this，第二個參數是參數陣列，會成為函式內可使用的類陣列 arguments 物件。如果第一個參數值是 null ，則 this 會指向全域物件，這正是當你呼叫一個非物件內方法的函式時會發生的事。

如果函式是某物件的方式，就不會像前面例子傳遞 null 參考，而物件會成為 apply 的第一個參數。

```jsx
var alien = {
	sayHi : function (who) {
		return "Hello" + (who ? "," + who : "") + "!";
	};
}

sayHi.apply(alien, ["hello"]);

```

**除了 apply 之外，有另一個 call 方法，可省下建立陣列的工作。**

### 部分應用

程式碼的執行過程：

```jsx
// 定義函式
function add(x, y){
	return x + y;
}
// 知道參數並呼叫
add(5, 4);

//程式執行：步驟一
function add(5, y){
	return 5 + y;
}
//程式執行：步驟二
function add(5, 4){
	return 5 + 4;
}

```

此階段步驟一可稱為部分應用，意思是用第一個參數替換函式中的未知數，但我們並沒有得到結果（解答），而是得到另一個函式。

現在讓我們假想一個函式叫做 `partialApply()`。（以下為非正規用法）

```jsx
function add(x, y) {
  return x + y;
}

//全應用
add(5, 4);

//部分應用
var newadd = add.partialApply(null, [5]);
newadd.apply(null, [4]); //9
```

部分運用給了另一個函式，該函式可以在之後用別的參數呼叫，等同於 `add(5, 4);` ，因為 `add(5)` 會回傳一個函式，於是可以用 `(4)` 呼叫，換句話說 `add(5, 4);` 只是 `add(5)(4)` 的語法糖。

這種單一輸入、單一輸出並讓函式可以理解，並處理部分應用的過程，稱為 curry 化。

#### Curry

curry 是一種轉換的過程——我們在轉換函式。
（拆解函式）

泛用的 curry 化函式：

```jsx
function curry(fn) {
  var slice = Array.prototype.slice,
    stored_args = slice.call(arguments, 1);
  // arguments : curry 的參數。因為傳進參數的第一個參數值是 function 必須刪除，
  // 但因為參數是類陣列，無法用陣列的方法，因此用 call 將 slice 指向 arguments，使arguments 為陣列，以使用陣列的方法，並刪除第一個參數。
  // 如同：arguments.slice(1);
  return function() {
    var new_args = slice.call(arguments),
      // 第二組傳入的參數，同上，將參數轉陣列
      args = stored_args.concat(new_args);
    //將第一組和第二組傳入的參數合併
    return fn.apply(null, args);
    //將合併的新參數傳入 fn
  };
}
```

承上，新解釋範例如下：

```jsx
function add(x, y) {
  return x + y;
}

var newadd = curry(add, 5);
newadd(4); //9

//另一種寫法
curry(add, 6)(7); //13
```

第二個範例：

```jsx
function add(a, b, c, d, e) {
  return a + b + c + d + e;
}

//可以轉換任何數量的參數
curry(add, 1, 2, 3)(5, 5);

//兩步驟的 curry 也可以。
var addOne = curry(add, 1);
addOne(10, 10, 10, 10); //41
```

## 使用 Curry 的時機

當呼叫某個函式，發現傳入的參數大多相同，這時可以用柯里化，可以運用部分應用的方式，傳入一些參數給函式，並動態產生新的函式，新函式幫你保留重複的那些參數，於是不用每次都傳遞，並用他們預先填入原始函式，預期接受完整的參數列。

```jsx
//不使用柯里化
add(1, 2, 3, 'abby');
add(1, 2, 3, 'leia');
add(1, 2, 3, 'jammy');
add(1, 2, 3, 'lisa');

//使用柯里化
var curryFn = curry(add, 1, 2, 3);
curryFn('abby');
curryFn('leia');
curryFn('jammy');
curryFn('lisa');
```

## 總結

- JavaScript 是第一級物件，他們可以和原始型別值）一樣作為參數傳遞，也可以擴充屬性和方法。
- 函式提供區域作用域，而大括號產生的區塊則沒有，區域變數的宣告會被提升到區域作用的頂端。

建立函式的語法：

- 具名函式表示式
- 函式表示式：和上一個相同，只是缺少名字，也稱為匿名函式
- 韓式宣告式：類似其他語言

好用的函式模式：

- API 模式：使函式介面更簡潔 - 回呼模式：將函式作為參數傳遞 - 設定值物件：幫助你讓函式的參數數量 - 回傳函式：函式的回傳值是另一個函式 - curry 化：用現有的函式加上部分參數列產生新的函式
- 初始化模式：結構化的方式來執行初始和設定，不會因暫時變數污染全域 - 立即函式：定義後立即執行 - 立即物件初始化：結構化初始工作被包進一個匿名函式中，此模式提供一個立即呼叫的方法。 - 初始階段的分支：初始階段執行唯一一次分支，而不是在應用程式的生命週期中執行許多次。
- 效能模式： - 記憶模式：使函式屬性暫存，運算過的值不必重複運算 - 自我定義函式：函式使用新的定義覆蓋自己，在第二次呼叫過後省下工作
