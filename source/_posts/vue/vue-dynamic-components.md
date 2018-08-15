---
title: 【Vue】如何優雅產生動態元件
tag:
  - Vue
  - null
categories: CodingLife
photos:
  - '/img/cover/vue.png'
date: 2018-08-15 10:39:05
modified: 2018-08-15 10:39:05
---

<!--more-->

> 參考文章
> [[译]如何优雅地用 Vue 创建数据驱动的用户界面](https://juejin.im/post/5b14a9b46fb9a01e780a4323)
> [vue-dynamic-components(codesandbox)](https://codesandbox.io/s/61y919wrk3?from-embed)

最近重構一下上個月趕的專案，還有很多地方可以加強優化，現在遇到第一個困難是如何減少 template 的重複性，簡單啊，用一下 v-for 就好了，但是遇到不同表單有各種形式的表現方式（selector、checkbox⋯⋯），我們勢必要使用不同種型態的子元件，但因為型態不同，資料結構就不同，那在這樣的狀況下，我們要如何去使用 v-for 呢？

強者我朋友花王就貼給我一篇文章，不看還好，看了一下一鳴驚人，完全沒看過這種寫法，接下來根據上面 codesandbox 的連結來討論動態表單元件的運行過程，以 Demo4 為例。


我們先看一下 `DemoFour.vue` ， 他在父元件裡面訂了一個 `schema` 的陣列。

```js
schema: [
  ...
  {
    fieldType: "TextInput",
    placeholder: "First Name",
    label: "First Name",
    name: "firstName"
  },
  ...
]
```

```html
<component v-for="(field, index) in schema"
            :key="index"
            :is="field.fieldType"
            v-model="formData[field.name]"
            v-bind="field">

</component>
```

# 判斷輸入類型

![](/img/vue/vue-dynamic-components/dynamic-01.png)


裡面有不同的物件型態，必要的物件屬性為 `fieldType`、`label`及`name`。
fieldType 就是不同 input 的型態判別，例如 selector、 checkbox⋯⋯

我們使用 `v-for` 來跑 `schema` 的物件 現在遇到的第一個問題，明明沒有在 component 定義，那這個 component tag 是從哪出來的，根據 [Vue 動態元件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)的官方說明，我們可以知道那是搭配 `is` 屬性所使用，`is` 根據 `schema` 的 `fieldType` 來判斷要產生哪個形態的子元件。

## 解構賦值繫結至子元件

![](/img/vue/vue-dynamic-components/dynamic-02.png)

這邊的 `v-bind` 使用了解構賦值，被 `v-bind` 的 component 會以 `props` 的方式傳值傳進子元件，接下來我們來看看子元件。

## 接收 props 及 v-model 的 value

![](/img/vue/vue-dynamic-components/dynamic-03.png)

```js
export default {
  name: 'TextInput',
  props: ['placeholder', 'label', 'name', 'value']
}
```

我們傳進了`placeholder`、`label`、`name`、`value`，疑？value？我們什麼時候傳進了 value ？ 因為我們的父元件有 `v-model`，`v-model` 不外乎就是 `v-on:input` 和 `v-bind:value`，所以也是 `v-bind` 解構賦值到子元件，如果綁到空的屬性，`value` 就會是 undefined，接下來我們看一下 template 。

```html
<template>
  <div>
    ...
    <input type="text"
           :name="name"
           :value="value"
           @input="$emit('input',$event.target.value)"
           :placeholder="placeholder
           ">

  </div>
</template>
```

## 使用者行為修改值

![](/img/vue/vue-dynamic-components/dynamic-04.png)
把 props 傳進來的資料依序綁在 input 上，而我們在父元件 `v-model` 的資料可以讓 value 變成 input 的預設的輸入文字，當使用者修改文字時，被 `v-bind:value` 會被修改，且同時 `v-on:input` 和 `emit` 通知父元件使用者已經修改資料，但是在父元件裡面我們並沒有接收到任何從 `emit` 自定義的變數來的事件，那他是如何接收？

## newValue 覆蓋舊 value

![](/img/vue/vue-dynamic-components/dynamic-05.png)

其實就是 `v-model` ，因為 `v-model` 其實就是 `v-bind:value`，自然而然 `$event.target.value` 覆蓋了原本`v-model`的舊值，而 `v-model` 又跟 `formData`綁定。

**另外需要注意，formData 的 屬性值要和 schema 物件的 name 相同，否則沒辦法綁定在一起。**

