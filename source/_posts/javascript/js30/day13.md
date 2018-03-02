---
title: 【 JS30 】Slide In on Scroll
category: JavaScript30
tags:
  - JavaScript
  - JS30
date: 2018-03-02 10:07:32
---
![](/img/js30day/small12.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：滾動捲軸，使圖片滑動顯示。</span>

## 一、設定transition設定彈跳動畫效果

作者已經在 css 上設定好`transition`。

## 二、監聽及觸發

```js
const sliderImages = document.querySelectorAll('.slide-in');

window.addEventListener('scroll', debounce(checkSlide));
```

因為滑動必須用`windows`選定`scroll`事件，但因效能上的需求，所以作者多寫一個`debounce`的`function`，讓觸發事件間隔 20 秒。

## 三、了解視窗高度

```js
function checkSlide(e) {
  sliderImages.forEach(sliderImage => {
      const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);
      //圖片1/2的定位點 = 捲軸垂直位移量 + 視窗高度 - 圖片1/2的高度

      const imageBottom = sliderImage.offsetTop + sliderImage.height;
      //圖片底部 = 圖片離視窗頂部的距離 + 圖片高度
      const isHalfShown = slideInAt > sliderImage.offsetTop;
      //判斷視窗是否超過圖片的一半，超過顯示
      const isNotScrolledPast = window.scrollY < imageBottom;
      //判斷滾動範圍是否超過圖片底部，超過則不顯示

      if (isHalfShown && isNotScrolledPast) {
          sliderImage.classList.add('active');
      } else {
          sliderImage.classList.remove('active');
      }
      //判斷是否顯示圖片
  });
}
```

|`window.scrollY`|`window.innerHeight`|`sliderImage.offsetTop`|`slideInAt`|
|---|---|---|---|---|
|捲軸垂直的位移量（不含視窗）|視窗高度|圖片離視窗頂部的高度|圖片1/2的定位點|



## 使用技巧
- window.scrollY：瀏覽器 Y 軸滾動的位移量。
- window.innerHeight：瀏覽器的可視高度。
- offsetTop：傳回當前元素對於`offsetParent`元素頂部距離的位置。