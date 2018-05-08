---
title: 【 React 】環境安裝與解析
tags:
  - React
  - React 初探系列
date: 2018-05-07 09:28:24
---
![](/img/react/react.png)

適用環境：Mac OS

- node @8.10.0
- npm @5.6.0
- create-react-app @1.5.2

<!-- more -->

react 必須依靠 node.js 安裝，請先預設本機端已經裝好node.js 及 npm。

## 全域安裝 React

```
$ npm install -g create-react-app
```

[create-react-app](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html) 為facebook在兩年前發布的樣版文件工具，可以簡單建立快速開發，使用上述指令全局安裝。

### startkit

如果需要快速上手可以直接 clone reactmaker 的 [startkit](https://github.com/ReactMaker/simple_react_start_kit)，
像是一些相關套件，reactmaker 都已經在 startkit 裡面設定好了，
但是如果你想要自己找的話，請參照下面新增專案的做法。

## 新增專案

```
$ create-react-app my-project
$ cd my-app
$ npm start
```

新增專案，進入資料夾啟動`npm start`，便在`localhost:3000`運行 react。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root'));

registerServiceWorker();

```

在`src/index.js`的這個檔案裡面的程式碼如上，因為`index.js`是整隻專案的進入點，
等於是整隻專案的全域環境，相關的套件都由此引入，因此在這邊不建議直接在`index.js`上面 coding。

- React：引入 react 的核心。
- ReactDOM：將 react 元件渲染到 DOM 上。
- 引入CSS
- 引入 App 元件
- registerServiceWorker：主要在開發環境上幫用戶創建一個`server worker`，以便緩存到本機端。
- ReactDOM.render：執行渲染方法

```js
ReactDOM.render( element, container,[callback] )
```

在[官方文件](https://reactjs.org/docs/react-dom.html#render)有介紹到，
渲染一個 react 的元件到 container 位置上的某個 DOM 元素，並`return`一個`callback Fn`，如果沒有，就回傳`null`。

接著再看`src/App.js`

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

```

- React, { Component }：在 react 裡面引入核心及元件，如果要寫元件必須載入此兩項。
- logo：引入 svg 圖片
- App.css：引入 css

接下來看到 class ，這是 es6 原型繼承的語法糖，`App`繼承了`Component`，
裡面 return 的是 jsx 語法，jsx 是 react 的語法糖，
他被`babel`編譯後會呼叫`React.createElement`方法，`export default`則是 es6 的語法，
這邊大家可能會一頭霧水，讓我娓娓道來。

## React.createElement

在提到 JSX 前，讓我們先明白`React.createElement`。

在[官方文件](https://reactjs.org/docs/codebase-overview.html#react-core)有提到
> **React 核心僅包含定義元件所需要的 API**
> 例如：
> React.createElement()
> React.Component
> React.Children

因此我們可以知道`React.createElement();`的方法是 react 的[核心 API](https://reactjs.org/docs/react-api.html#createelement)，作用創建渲染 DOM 所需要的物件。

```js
React.createElement( type,[props],[...children])
```
參數`type`可以為一個 DOM 元素，也可以是一個元件，`props`是屬性，而`children`就是元素內容。

```js
React.createElement( button,{class:'login'},'Login');
```

呼叫`React.createElement`方法後，會`return`一個物件如下。

```js
{
    type: 'button',
    props: {
        children: 'Login',
        class: 'login'
    }
}
```

再藉由`ReactDOM.render`渲染如下。

```html
<button class='login'>Login</button>
```

**注意：官方並不建議我們直接呼叫`React.createElement()`來撰寫程式，建議使用 jsx**

### JSX 渲染 DOM 順序

 JSX
  ｜
  ｜　經由`babel`編譯、`React.createElement()`返回為一個`json`物件。
  ｜
json 物件
  ｜
  ｜　經`ReactDOM.render`渲染
  ｜
DOM 元素


## JSX

```js
const element = <img src={user.avatarUrl}>;
```

**類型判別**

jsx 就是 javascript 的擴展語法，本身是一種 javascript 表達式，只是長得很像 html。

1. 大寫開頭的 JSX 標籤，則為一個 react 元件。
2. 小寫開頭標籤則會被 JSX 視為原生 DOM 元素。

**因此元件、類別、函式型元件，都必須以英文大寫為開頭。**

更詳細的內容，再之後的文章會再提到。