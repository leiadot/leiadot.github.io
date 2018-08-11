---
title: 【JS30】Day20：Native Speech Recognition
tags:
  - JavaScript
  - JS30系列
date: 2018-03-23 09:30:03
categories: CodingLife
photo:
- '/img/js30day/small19.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：在頁面上啟用語音辨識並輸入文字。</span>

```js
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
```

作業一開始已經先將全域語音辨識指定好，這次練習也要啟用本地端 server 。


## 一、建立語音辨識物件
```js
const recognition = new SpeechRecognition();
// 建立一個變數為語音辨識
recognition.interimResults = true;
// 允許語音辨識回傳識別後的資料
```

## 二、新增輸入區域文字段落

```js
let p = document.createElement('p');
// 建立段落
const words = document.querySelector('.words');
// 選取輸入區域
words.appendChild(p);
// 使段落新增到輸入區域中
```

三、整合語音資訊到輸入區域

```js

recognition.addEventListener('result', e => {
    // 監聽識別後的結果回傳資料
    const transcript = Array.from(e.results)
    // 因為得到的是 nodelist ，所以先轉為陣列
        .map(result => result[0])
        // 透過陣列取得資料中的第一筆
        .map(result => result.transcript)
        // 再取出第一筆中的 transcript 資料
        .join('');
        // 使用 join 取消連結符號


    p.textContent = transcript;
    // 將回傳的文字內容放入段落中

    if (e.results[0].isFinal) {
      // 假設回傳內容結束 則放入一個新段落到輸入區域中
        p = document.createElement('p');
        words.appendChild(p);
    }
});

recognition.addEventListener('end', recognition.start);
// 如果語音辨識結束，則重新打開語音辨識。
recognition.start();
// 開始語音辨識
```

## 使用技巧
- SpeechRecognition.interimResults