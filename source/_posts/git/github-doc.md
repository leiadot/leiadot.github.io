---
title: 【Github】不開 branch 使用 github page
urlname: github-doc
tags:
  - github
categories: 軟體工程
photos:
  - '/img/cover/github.png'
description: 簡單記錄使用 Vue，不用開 Github 的 branch，也可使用 Github page 的方法。
date: 2018-07-23 09:43:36
modified: 2018-07-23 09:43:36
---

突然發現一個可以不用開 branch ，但也能使用 github page 的方法，
因為最近都在研究 Vue ，所以以 Vue 的專案來做講解。

<!--more-->

假設我們現在已經把專案完成了，現在要用 webpack 來產出檔案，在那之前我們先改一下 webpack 的設定。

如果你的專案是使用`vue cli 2.9`的版本，那你在`config/index.js`下更改就可以了，其他專案就在 webpack build 的設定下更改就好。

```js
module.exports = {
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../docs/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../docs'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
  },
};
```

把`dist`更改為`docs`，把`assetsPublicPath`的設定更改為`./`。

如此一來產出的資料夾就為`docs`，`assetsPublicPath`正常來說應該更改成`/`就可以，可是在 webpack 產出的`index.html`會有錯誤，`index.html`引用的路徑會變為`/static/..`，`index.html`會無法正確讀取到檔案，再來就是在 repo settings 的 github pages 更改為`master branch / docs folder` 就可以了。
