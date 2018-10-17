---
title: 【 前端書蟲日誌 】Day02：YDKJS 第五章 第二次讀書會
tag:
  - 前端書蟲日誌
  - 2019鐵人賽
  - YDKJS讀書會
categories: CodingLife
photos:
  - /img/cover/books.jpg
date: 2018-10-17 19:25:42
---

## 大家的三個重點：

- Andy：
	- array 是被數字索引的（正如你所想的那樣），但微妙的是它們也是 Object ，可以在它們上面添加 string 鍵/屬性（但是這些屬性不會計算在 array 的 length 中）。
	-  string 實質上只是字元的 array 。雖然內部的實現可能是也可能不是 array ，但重要的是要理解 JavaScript 的 string 與字元的 array 確實不一樣。
	- NaN是一個非常特殊的值，它從來不會等於另一個NaN值。
- 日安：
	- 類陣列轉陣列使用 `slice`。
	- function 本身有 `length` 屬性，指的是參數數量（ 只有Object沒有 ）。
	- undefined 可以被賦值，但不要這樣做。
- Henry：
    - JavaScript 沒有指標、也不單純是 call by value or call by reference
    - string 是不可變的 (immutable)，但 array 是可變的 (mutable)
- turtle：
    - array index 可以放字串
    - undefined 可以賦值
    - copy value and copy reference
- kai：
    - 所有浮點數的數字的比較都是不精確的
    - call by value、call by reference、call by sharing
    - string 不要當成 array 使用（會有 unicode 編碼問題）。
- Tony：
    - Call by Sharing
    - number 都是 float 採用 IEEE 754
    - NaN、Infinity、-0 的各種判別

- Jason：
    - 了解JS是如何傳值/傳參考
    - 浮點數的四則運算
    - Array會出現 empty 的可能，要注意
- Chris： 
    - `argument` 是 ES6 不支援的 arrayLike
    - `var str2 = str.split("").reverse().join("")` 是醜做法
    - `number | 0` 可以變 32 bit
- Tomas
    - Array 中若是用 string 做 key 值，map 會無法顯示這個值會造成問題
    - Number.EPSILON 是 2^-52，可以檢查浮點數運算的誤差值，但不是一個好方法
    -  Call by value 和 Call by ref

- Jimmy：
  1. 以二進位浮點數字表示的 0.1 及 0.2 並不精確，最廣為接受的實務做法是使用一個很小的「約整誤差」值作為比較的容許值。
  2. 保留 ±0: 從哪個方向變成零
  3. Javascript 沒有指標的存在
  
- mango：
    1. 會出現 array-like 的情況
        > 1. Various DOM query operations return lists of DOM elements that are not true array.
        各種 DOM 查詢操作返回的 lists 不是真的 array，而是array-likes。

        > 2. when functions expose the arguments (array-like) object (as of ES6, deprecated) to access the arguments as a list.
        例如接 API 時要回傳我們 `function()` 使用了什麼參數，會傳去一個類陣列包住使用參數（書本叫引數，arguments）類陣列不像陣列可以繼承陣列所有方法使用，通常會用變成 array 操作
    
        類陣列不像陣列可以繼承陣列所有方法使用，通常會用變成 array 操作
   
    2. JavaScript 裡的 string 不是以 Character 字元存在 array 裡
   
    3. value-copy vs by reference-copy


## 共筆內容

### 陣列

#### splice、slice 的差別

Jason 的舉例：
```js
let a = [1,2,3];

Array.prototype.splice.call(a, 0, 1);
```

```js
let a = [1,2,3];

a.splice(0, 1);
```

這兩個的效果是一樣的，因為 `splice()` 這個 method 在 prototype 內，所以一個新的 array 物件，會繼承 prototype 內的 method ，因此可以直接拿來用。

#### 類陣列轉陣列的三個方法

- 借取 slice ：
```js
function foo (){
	var arr = Array.prototype.slice.call (arguments);
	arr.push("bam");
	console.log(arr);
}

foo("bar","baz"); //["bar","baz","bam"]
```

- 使用 ES6：
```js
var arr = Array.from(arguments);
```

- 展開運算子：
```js
var arr = [...arguments];
```



#### protype 繼承方法與靜態方法（public and static）

[MDN prototype 繼承](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Inheritance)

[MDN static function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)

#### 靜態方法跟方法

Array 可以用靜態方法 `Array.from` 呼叫，而僅有`Array`可以呼叫 prototype 的 method。

### 字串

- 字串和陣列都有 `length` 特性。
- 字串是 immutable ，Array 是 mutable
- 字串可借用陣列方法，但如果是會變動內容的方法就不適用。變通的方法是可以可以轉陣列操作再轉回字串，但具有複雜內容就不適用。
- github 有個 Esrever 套件，可以完美的做字串倒轉的事情。

### 數字

- JavaScript 中的整數其實就是沒有小數點十進位值的一個值。
- JavaScript 預設語法中都會以基數10的十進位形式輸出，其後尾隨隨小數部分的那些0會被移除。
- 使用的是 IEEE754 標準中的雙精度格式（64位元的二進位數字），採用逼近數字的方法運算。
- 非常大或是非常小的值會以指數形式輸出。
- 數字能夠取用內建於 Number.prototype 中的方法，例如：toFixed、toPrecision。toFixed 回傳字串。
- 可以直接用 number 字面值取用它，但必須注意點運算子。
-  number 也可以指數指定較大數字。
	- 十的三次方：1e3 ＝ 1000
	- 二十的三次方：2e3 ＝ 2000
-  數字也可以二進位或八進位以及十六進位前綴來有效表示。`parseInt` 轉的最大進制為 36 進制。
	- 二進位前綴：0b
	- 八進位前綴：0o
	- 十六進位前綴：0x
- 數字的預訂值
	* 最大浮點數值 1.798e+308，被預訂為 Number.MAX_VALUE
	* 極小值大約是 5e-324，被預訂為 Number.MIN_VALUE，不是負的，但非常接近0
	* 最大整數是 2^53-1，即 9007199254740991，被預訂為 Number.MAX_SAFE_INTEGER
	* 最小整數是 -9007199254740991，被預訂為 Number.MIN_SAFE_INTEGER

- 最大值及安全值可以以 `toString` 方法測長度，轉二進制位元，可以知道位元差距。


#### 浮點數運算解決方法

- 夾算法
	- 3.2999 < 3.2+0.1 < 3.311
- 大數運算
- 整數推算法(類似 shift 及 unshift 的做法)
```javascript=
let a = 0.2;
let b = 0.1;

function getPrecision(num) {
    const numStr = num.toString();

    return /\./.test(numStr)
        ? numStr.split('.')[1].length
        : 0;
}

function splitWithDot(x, y) {
    const precisionX = getPrecision(x);
    const precisionY = getPrecision(y);

    if (precisionX === 0 && precisionY === 0) return x + y;

    const powNum = Math.pow(10, Math.max(precisionX, precisionY));

    const powX = x * powNum;
    const powY = y * powNum;

    return (powX + powY) / powNum;
}
const answer = splitWithDot(a, b);
console.log(answer);
```

**toFixed 為銀行進位法，不算是四捨五入。**

### Undefined
- undefined 和 null 型別，都僅有自己本身唯一值的存在：undefined 和 null。
- null 是一個空值，或是曾經有過，但不再有的值。
- undefined 是一個缺少的值，或是尚未有值。
- null 是一個特殊的關鍵字，而非一個識別字，因此不能當作變數想要指定值給他，而 undefined 是一個識別字。

```javascript=
function foo(){
	undefined = 2;
	//非常不建議這樣做
}
foo();//undefined


function foo(){
	'use strict'
	undefined = 2;
	//非常不建議這樣做
}
foo();//Error
```

#### void operator
undefined 是一個內建的識別字，持有內建的 undefined 值，可以透過 void 運算子取得。

void 運算子會讓任何值變得空無，他不會修改現在的值，能確保的值這個運算式不會回傳任何值。
```javascript=
var a = 42;
console.log(void a, a)// undefined 42
```
當你要確保一個運算式沒有值，就可以使用 void：

```javascript=
function doSomething(){
	if(!APP.ready){
		//稍後再試一次
		return void setTimeout (doSomething, 100);
		//讓 setTimeout 永遠不會有回傳值
	}
	
	var result;
	//做其他事
	return result;
}

if(doSomething()){
	//	立即處理下件事
}
```

```javascript=

var a = false;
function doSomething() {
  console.log('// note: `APP.ready` is provided by our application')
  if (!a) {
    console.log('// try again later')
    return void setTimeout( doSomething, 100 );
	// setTimeout 的回傳值不會被攔截
  }

  var result = true;

  console.log('// do some other stuff');
  return result;
}

console.log('// were we able to do it right away?');
if (doSomething()) {
  console.log('// handle next tasks right away');
}
```

### NAN
- 直翻為「不是一個數字」，較精確的說法是無效的數字、不合格的數字、壞掉的數字。
- 特別之處在於它永遠不等於自己 `NaN !== NaN`。
- 測試它是否為 NaN 可以使用 `isNaN()`，不過此方法太過NaN了，使他的工作基本上變成「測試看看傳入的東西是不是一個number」
-  ES6 提供了另外一個替代工具 `Number.isNaN()`。

### Infinity
- 在 JavaScript 當中除以 0 為無限時，不會產生錯誤，而是產生明確定義，產生 Infinity 這個值，且在 JavaScript 當中還有分正及負的 Infinity。
- JavaScript 使用的是有限的數值表示法(IEEE754浮點數)，因此執行運算時有可能發生溢位。

### 零

- 在 JavaScript 中提供正的零和負的零，是為了當數值被計算為零的時候，仍然可以保留某些資訊，例如方向。
- 將負零字串化或是利用比較運算子我們都無法分辨 -0

#### 特殊相等性
在 ES6 有一個新工具可以測試兩個值是否絕對相等，他叫做 `Object.is(..)`：
```javascript=
var a = 2 / "foo";
var b = -3 * 0;

Object.is(a, NaN);//true
Object.is(b, -0);//true

Object.is(b, 0); //false

```

### 值 v.s. 參考

- JavaScript 當中是以值的型別來控制其值是藉由值的拷貝還是藉由值的參考來指定的。純量基型值都是藉由值的拷貝（null / undefined / string / number / boolean / symbol），object（包含 array 及 function）是傳參考。
- 要藉由值的拷貝傳入一個複合值，必須動手做一個它的拷貝，讓傳入的值不會仍然指向原複合值，例如使用 slice()
- 如果要傳入一個純量，但想要它可以被更新，就必須包裹在一個複合值裏面。
- 利用純量物件無法修改其持有的純量基型值，因為底層的純量基型值是不可變的。

#### 深拷貝及淺拷貝

- JSON method 可以轉多層巢狀物件，但不能轉 function。
- 展開運算子、`Object.assign`，皆為淺拷貝。
- `Array.from` 為淺拷貝，可以轉陣列，但二維陣列就會指向到舊的陣列。
```javascript=
/* Henry 的做法*/
const c = [1,2,[3,4, [5,6]], 'abc'];

function recursion (x) {
  if(typeof(x) === 'number') {
    return Number(x);
  } else if (typeof(x) === 'string') {
    return String(x);
  } else if (Array.isArray(x)) {
    let arr = [];
    x.forEach(current => {
      arr.push(recursion(current));
    });
    return arr;
  }
}

const d = recursion(c);
d[2][2][0] =989;  // 原本的 c 不會被修改到

const e = c;
e[2][2][0] =234; // 原本的 c 會被修改到

/* Kai 的做法*/
var a = [1, 2, 3, [4, 5]];
var b = Array.from(a);
b[0] = 4;
a // [1, 2, 3, [4, 5]]
b // [4, 2, 3, [4, 5]]
b[3][0] = 10;
a // [1, 2, 3, [10, 5]]
b // [1, 2, 3, [10, 5]]

```

- 深拷貝物件的遞迴函式：
```javascript=
function deepCopy(val){
 const obj = {...val};
 for(item in obj){
  if(typeof(obj[item]) === "object"){
   obj[item] = deepCope({...obj[item]})
  }else{
   obj[item] = val[item]; 
        }
 }
 return obj;
 
}
```
- 深拷貝陣列的遞迴函式：
```javascript=
/* Jason 的做法*/
const arr = [["23er", 2, 3], [4, [1, 2, 3], 6], [7, 8, 9]];

function copyArray(x) {
    if (typeof (x) !== "object") return x; //進來的只有object和array
    else if (Array.isArray(x)) {
        let newArr = [];
        for (let i = 0; i < x.length; i++) {
            newArr[i] = copyArray(x[i]);
        }
        return newArr;
    }
    else { 
        console.log('is object');
        //還沒想物件的deep copy
    }
}

let nArr = copyArray(arr);
nArr[1][1][0] = 2; 
console.log(arr);
console.log(nArr);

/* Tomas 的做法*/

const arr = [
  1,
  2,
  3,
  [4, 5, 6, 
    [7]
  ]
];

const checkHasMoreArray = (arr) => 
  Array.isArray(arr) && 
      arr.some(item => Array.isArray(item));

const deepCopy = ([head, ...arr]) => {
  const hasMoreArray = checkHasMoreArray(head);
  const result = hasMoreArray
    ? deepCopy(head)
    : [head];

  const otherResult = arr.length === 0
    ? []
    : deepCopy(arr);
  return [head, ...otherResult]
};

console.log(deepCopy(arr));
```
- [Immutable 套件](https://facebook.github.io/immutable-js)：所有的修改值都會被記錄在記憶體中，不會改動原本的資料。