---
title: 【 Vue 】Vue 常用套件環境設定
tags:
  - Vue
  - 日安初探 Vue
date: 2018-03-28 10:52:54
---

![](/img/vue/vue.jpg)

- vue-loader
- bootstrap / jQuery
- axios

版本：vue-cli 2.9.3

<!-- more -->

## Vue-router

### 安裝 Vue-router

```
$ npm install vue-router
```

在專案下使用 npm 安裝，如果你是使用 webpack 樣板，你在設定`pakage.json`就可以選擇要不要安裝。

### 註冊

```js
import router from './router'

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
```
在`main.js`裡面會發現他已經幫你 import 進去，接著看`app.vue`，會發現有個`<router-view/>`的標籤，這意思是路由顯示的畫面會在那個區塊做顯示，接著看`router/index.js`

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// init

// page import
import Hello from './pages/Hello.vue';
import Hello2 from './pages/Hello2.vue';

const router = new VueRouter({

  mode: 'history',
  base: __dirname,
  // router 列表
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    },
    {
      path: '/hello2',
      name: 'hello2',
      component: Hello2
    },
    // router 轉址
    { path: '/*', redirect: '/hello' }
  ]
});


```

如果使用`webpack-simple`模板，需要按照官方的方式 import，也不會有`router`資料夾，必須直接在裡面設置 router。

```js
import HelloWorld from '@/components/HelloWorld'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
```
這段的意思是說，是 router 根據用戶的 url 來判斷要顯示哪個元件，所有要依據路由轉換的元件都要在`router/index.js`上註冊。

```html
<router-link :to="page01url">page01</router-link>
<router-link :to="page02url">page02</router-link>
```

在選用觸發切換路由，絕大部分人都會直接反應用 a 連結下去切換，但官方並不建議這樣寫，官方建議用`<router-link>`。

## bootstrap

### 安裝 bootstrap

```
$ npm install bootstrap sass-loader postcss-loader node-sass --save
```
上面指令是官方建議的安裝方法，但如果要引用 bootstrap 的 sass 仍然會報錯，因為 webpack 無法解析，所以要安裝`sass-loader`、`post-loader`，以及讓`sass-loader`相依的`node-sass`，讓 bootstrap 可以正常解析。

```
$ npm install -D vue-style-loader css-loader
```
但是為了在預覽 vue 的時候可以即時顯示，所以我們必須還要再下載`vue-style-loader`，這和之前用的`style-loader`有 87 分像。

```js
{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
      'scss': [
        'vue-style-loader',
        'css-loader',
        'post-loader',
        'sass-loader',    
      ]
    }
  }
}
```

因為 webpack loader 的運作機制順序是由後往前、內往外，因此在`webpack.base.config.js`的配置如上，這讓 bootstrap 的 sass 有全局的設定。

```
$ npm install sass-resources-loader
```
此時發現，只要在子元件想要使用 bootstrap sass 的程式庫（mixin、extend......）及變數，並無法正確載入，為了不要在子元件裡面一直重複 import ，這時候需要加載`sass-resources-loader`。

```js
{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
      loaders: {
          'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader',
              {
                  loader: 'sass-resources-loader',
                  options: {
                      resources: path.resolve(__dirname, './src/assets/styles/global.scss'), 
                  },
              }
          ]
      }
  }
}
```

這個 loader 主要是讓 sass 在被編譯解析前，把我們要設為全域環境的 sass 檔案路徑放到`resources`中。

```scss
@import '~bootstrap/scss/bootstrap';
```
再到`./src/assets/styles/global.scss`的檔案裡面匯入 bootstrap 。

```js
import './assets/styles/global.scss';
```

最後別忘了要再`app.vue`的檔案中 import 才算完成。
此外在`global.scss`中，你也可以放置你想要設為全域的 sass ，例如 RWD 斷點、變數之類的，因為這個 sass 是全域，所以也要考慮專案的加載量。

## jQuery

```
$ npm install --save jquery popper.js
```

處理完 sass 的部分，接下來處理互動。為了能正常使用 bootstrap 元件的部分，因此要再多下載 jQuery 和 popper.js，popper.js 的副檔名一定要加，不然 popper 是另外一個套件。

```js
const webpack = require('webpack')
...
 plugins: [
    new webpack.ProvidePlugin({
        '$': "jquery",
        'jQuery': "jquery",
        'Popper': 'popper.js'
    })
  ],
```

在`webpack.base.config.js`的設定。

# axios

## 介紹
> Promise based HTTP client for the browser and node.js

基於 promise 用於 瀏覽器和 node.js 的HTTP 客戶端。

## 特色
- 在瀏覽器創建 XMLHttpRequest
- 從 node.js 發出 http 請求
- 支援 Promise API
- 攔截請求跟回應
- 轉換請求與回應資料
- 取消請求
- 自動轉換JSON資料
- 客戶端防止 CSRF/XSRF

```
$ npm install axios
```
一樣使用 npm 安裝。

```js
import Axios from 'Axios';
...
...
Vue.prototype.$axios = Axios;
// 為了讓其他元件也能使用 axios，需改成 vue 的原型屬性。
```
安裝完之後，把他 import 進`main.js`。


## post 範例執行方法

```js
created(){
  this.$axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
```
這個方法是在元件被創造完後，立即調用，利用 axios 執行 post 請求，要看更多方法請看[axios github](https://github.com/axios/axios)，生命週期的部分，詳細可以看[Vue生命週期](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)。


