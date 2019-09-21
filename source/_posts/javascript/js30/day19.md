---
title: 【JS30】Day19：Unreal Webcam Fun
tags:
  - JS30系列
date: 2018-03-22 13:42:37
urlname: javascript-30-day19
categories: CodingLife
photo:
  - '/img/js30day/small18.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：取用攝影機，預覽截圖存檔。</span>

```js
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
```

練習檔案已經先取用 DOM，開始練習前，要先啟用本地端 server。
必須加裝 node.js ，並在練習資料夾的 terminal 輸入以下指令。
`npm install`
`npm start`

## 一、取用攝影機

```js
function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    // 取得使用者攝影機裝置，並利用 promise 回傳
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
      // 如果回傳成功，將回傳的 localMediaStream 寫入 html video tag 並播放。
    })
    .catch(err => {
      console.log('no', err);
      // 如果回傳失敗，送出錯誤訊息
    });
}

getVideo();
```

```js
video.addEventListener('canplay', paintToCanvas);
```

二、將資料，寫進 canvas

```js
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  // 取用影像寬高

  canvas.width = width;
  canvas.height = height;
  // 使影像寬高等於 canvas 寬高

  return setInterval(() => {
    // 每16毫秒 取用一次影像
    ctx.drawImage(video, 0, 0, width, height);
    // 讓影像為繪圖來源，寬、高、XY軸位置與 video 相同。
    let pixels = ctx.getImageData(0, 0, width, height);
    // 取用 canvas 圖像數據資料
    pixels = rgbSplit(pixels);
    // 將資料傳進 rgbSplit，增加濾鏡效果，再重新寫入 pixels
    ctx.globalAlpha = 0.1;
    // 調節 canvas 透明度
    ctx.putImageData(pixels, 0, 0);
    // 將圖像數據指定到 canvas 上
  }, 16);
}
```

`console.log(pixels)`會發現，canvas 圖像數據資料都是數個陣列所組成，數據為數字，順序皆為 RGBA 輪迴。

```js
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0] + 100;
    pixels.data[i + 500] = pixels.data[i + 1] - 50;
    pixels.data[i - 550] = pixels.data[i + 2] * 0.5;
  }

  return pixels;
}
```

因此增加濾鏡效果，四個數值為一個輪迴，巡迴`data`陣列 RGB 的數值，並作修改。

三、拍照效果

```js
function takePhoto() {
  snap.currentTime = 0;
  // 音效轉回第 0 秒
  snap.play();
  // 播放

  const data = canvas.toDataURL('image/jpeg');
  // 將資料轉為 base64 的文字資料
  const link = document.createElement('a');
  // 建立一個 a 連結
  link.href = data;
  // 連結位置設置為 base64 位置
  link.setAttribute('download', 'pretty');
  // 設為連結提供下載
  link.innerHTML = `<img src="${data}" alt="pretty" />`;
  // 將圖片預覽
  strip.insertBefore(link, strip.firstChild);
  // 在圖片區域放入新的圖片，並使新圖片新增在第一個位置
}
```

## 使用技巧

- MediaDevices.getUserMedia()
- CanvasRenderingContext2D.drawImage()
- HTMLCanvasElement.toDataURL()
- Node.insert Before()
- CanvasRenderingContext2D.getImageData()
- putImageData()
