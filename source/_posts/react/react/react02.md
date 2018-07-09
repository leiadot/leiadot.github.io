---
title: 【React】JSX
tags:
  - React
  - React初探系列
date: 2018-05-07 20:02:14
categories: CodingLife 前端技術筆記
photo:
  - '/img/react/react.png'
---

`jsx`被編譯後會呼叫`React.createElement`方法，該方法會回傳一個有`type`、`props`以及`children`的物件。
這說明 jsx 也是由三部分組合起來，標籤、屬性、內文（children），所以接下來也以這三個部分來說明。

此篇範例程式碼皆取自[官方文件](https://reactjs.org/docs/jsx-in-depth.html)

<!-- more -->

## 編譯前宣告

由於 jsx 會使用`React.createElement`方法，在上篇提到，`React.createElement`是 react 核心 API 之一，
因此在撰寫 jsx 前，必須先引入 react 模組。

```js
import React from 'react';
```

## render

一個元件必須執行一個`render`的方法，而`render`方法必須回傳一個`jsx`元素，在這邊注意的是，jsx語法中，只能有一個跟元素，
所以必須用`jsx`元素把內容全部包覆起來，如下（額，這不是官方的程式碼）。

```js
...
render () {
  return (
    <div>A</div>
    <div>B</div>
  )
}// 未包覆，無法執行
...
...
render () {
  return (
    <div>
      <div>A</div>
      <div>B</div>
    </div>
  )
}// 可包覆，可執行
...
```

## 標籤部分

### 閉合式標籤

```js
<div className="sidebar" />
```
如果沒有子代，也可以使用閉合式標籤。

### 判別元素

上篇提到元件、類別、函式型元件，都必須以英文大寫為標籤開頭，
否則小寫開頭標籤視為原生 DOM 標籤，若以小寫撰寫 jsx 則會報錯。

```js
import React from 'react';

// Wrong! This is a component and should have been capitalized:
function hello(props) {
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Wrong! React thinks <hello /> is an HTML tag because it's not capitalized:
  return <hello toWhat="World" />;
}
```

### 句點表示法

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

可以使用句點表示法來導入 React 元件中的元件，例如要使用`MyComponents`元件的`DatePicker`元件，
使用句點表示，一樣可以使用到屬性`color`。

### 執行時選擇類型

```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Wrong! JSX type can't be an expression.
  return <components[props.storyType] story={props.story} />;
}
```

不能使用表達式作為元素標籤，如果要使用表達式之前必須先賦值給大寫開頭的變數，如下。

```js
function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```


## 屬性部分

### 在屬性使用表達式
```js
<MyComponent foo={1 + 2 + 3 + 4} />
```
屬性中可以使用表達式，如上，
`MyComponent`的`props.foo`的值為表達式運算結果 10 。

### 字串文字

```js
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />
```

可以將字串文字作為屬性值傳遞，因此上述兩個方式是一樣的，
下面花括號也可以替換成變數，結果也是一樣的，如下。

```js
const hello = 'hello World'
<MyComponent message={hello} />
```

### 默認值

```js
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
```

一般狀態下，屬性不賦予值，預設值為`true`，但還是建議把它寫出來，
因為容易和 es6 的解構賦值混淆。

### 擴展屬性

```js
function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

假設你有一個 props 物件要傳遞，可使用`...`運算子來擴展傳遞。

## 子代部分

### 在文字中使用表達式

```js
<MyComponent>foo</MyComponent>
<MyComponent>{'foo'}</MyComponent>
```
子代文字內容，和屬性的字串文字一樣，可用花括號來塞入變數。

```js
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```

也可在花括號內做表達式運算來渲染。




