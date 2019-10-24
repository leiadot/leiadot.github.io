---
title: 【CSS】如何使用阿里巴巴圖標庫
urlname: how-to-use-iconfont
tags:
  - CSS
categories: Front-end
description: 阿里巴巴是中國境內最大的圖標庫，裡面有各式各樣的圖示可以使用，這邊簡單教授以 CSS 的方法使用。
photo:
  - '/img/cover/css.jpg'
date: 2018-07-23 10:43:55
modified: 2018-07-23 10:43:55
---

阿里巴巴是中國境內最大的圖標庫，裡面有各式各樣的圖示可以使用，這邊簡單教授以 CSS 的方法使用。

<!--more-->

# 當某天 fontawesome GG 時，我們還有 iconfont

Type: CSS

進入 [Iconfont](https://www.iconfont.cn/collections/index) 登入，選擇喜歡的 icon 放進購物車，匯集完之後，可以選擇加入項目，匯集到資料夾中。

![](/img/css/iconfont/step01.png)

進到進到項目中，可以看到下面的圖示。

![](/img/css/iconfont/step02.png)

點擊下載至本地會有一個 zip 檔案。

![](/img/css/iconfont/step03.png)

## 嵌入字體檔，並以 Unicode 方式引入

### 定義 font-face

    font-family: 'iconfont';
    src: url('iconfont.eot');
    src: url('iconfont.eot?#iefix') format('embedded-opentype'),
      url('iconfont.woff2') format('woff2'),
      url('iconfont.woff') format('woff'),
      url('iconfont.ttf') format('truetype'),
      url('iconfont.svg#iconfont') format('svg');
    }

### 使用定義的 iconfont

    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

### 使用 Unicode

    <span class="iconfont">&#x33;</span>

## 嵌入 CSS，並以 class 方式引入

### 引入 CSS

    <link rel="stylesheet" href="./iconfont.css">

### 使用

    <span class="iconfont icon-xxx"></span>

## 引入 JS ，使用 Symbol （SVG 的集合）

### 引入 JS

    <script src="./iconfont.js"></script>

### 使用通用的 CSS

    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }

### 使用 SVG

    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xxx"></use>
    </svg>

## 如何引進 Vue

第一種的形式是 unicode，複雜的編碼對於前端來說，我個人覺得沒有比較方便，

第三種是用 js 的方法引入 svg，因為解壓縮的資料夾中其實有 svg 檔，這個方法我覺得也不好，所以這邊教授用 class 的方式引入。

在 `public/index.html` 引入，vue-cli 3 中的 webpack 會解析 `<%= BASE_URL %>`

把 `iconfont.css` 的檔案也放在 `public` 資料夾底下。

    <link rel="stylesheet" href="<%= BASE_URL %>iconfont.css">
