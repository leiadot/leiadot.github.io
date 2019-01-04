---
title: 【前端精神時光屋】Week01 - TodoList
tag:
  - Vue
categories: CodingLife
photos:
  - '/img/cover/theF2E/index.jpg'
date: 2018-08-08 12:20:31
modified: 2018-08-08 12:20:31
---

- Vue.js
- Vue Router
- elementUI
- axios
- i18n
- Sass
- iconfont
- localStorage

<!--more-->

[連結](http://codingwife.com/TheF2E/#/week-01)

【使用者故事】

- [x] 能夠紀錄每天的待辦事項。
- [ ] 可拖拉待辦事項，調整排序。
- [x] 可標示每個待辦優先重要級別，預設為無。
- [x] 每筆待辦可新增時間提醒 (yyyy/mm/dd hh:mm)。
- [x] 每筆待辦可再填寫評論與附加檔案。
- [x] 待辦狀態：全部顯示(預設)、待處理、已處理。
- [x] 待辦事項過多時，需考量內容是否需要折疊。

- [設計稿](https://bit.ly/2HfaR2M)

這次 sideProject 比較麻煩是在建置整個專案，因為精神時光屋我不想每週都開一個 repo ，所以在初始化的時候花了一點時間。

# 架構

## UI 框架

使用了 element-UI 當作整個 theF2E 專案唯一使用的 UI 框架，雖然在每個 component 的 sass 可以設定為 scope，但如果這樣就無法更改 elementUI 的 style，而且就算更改了，但可能會因為每週風格不同，elment 樣式就會打架。

這邊做法打算在進入點 `main.js` 引入了一隻 sass 改 elementUI 的 style ，但在更改 style 的外層包覆每週的 DOM 根節點，在其他週引入 elementUI 就不會被互相影響。

## Component 架構

```
src
├── container
|   ├── Index
|   └── week-01
├── components
|   ├── common
|   └── week-01
|         ├── Tabs.vue
|         └── Todo.vue
├── router
├── static
|     └── iconfont.css
└── assets
      └──scss
```

這次只有三個元件，沒有使用 vuex ，僅用 props 跟 emit 傳遞資料，Tabs 負責切換顯示的 Todo，Todo 就是處理資料的顯示、修改以及回傳刪除的 id， container 除了大畫面架構，根據 Tabs 回傳的字串顯示應出現的 Todos ，以及做刪除、排序等邏輯。

## 遇到的困難

在 loop todo 的過程中，出現刪除失常的狀況，在資料裡面刪除正確，可是顯示錯誤的 UI，原因是刪除是根據 todo 的 id 做刪除，但因為 todo 的 key 是使用 v-for 的 index ，這樣刪除後再重新渲染，序列當中的 key 依然存在，消失的是最後一個 key ，根據 virtualDOM 對照下來的結果，減少是最後一個 key，因此 vue 判定是最後一個 ui 消失，這就是為什麼資料刪除正確，可是 ui 錯誤的原因。
