---
title: 【 JS30 】Day08：Fun with HTML5 Canvas
tags:
- JavaScript
- JS30 系列
date: 2018-02-18 11:39:39
---
![](/img/js30day/small8.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：使用滑鼠做拖拉繪圖，顏色及筆劃粗細能在繪畫時能產生不同變化。</span>

```js
const canvas = document.querySelector('#draw');
// 指定canvas畫布
const ctx = canvas.getContext('2d');
// 渲染環境為2D繪圖
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// 指定畫布寬高
ctx.strokeStyle = '#BADA55';
//指定筆刷顏色
ctx.lineJoin = 'round';
// 筆劃轉角形狀
ctx.lineCap = 'round';
// 筆劃形狀
ctx.lineWidth = 100;
// 筆劃寬度
// ctx.globalCompositeOperation = 'multiply';
  // 圖形相疊時的模式
```

上述參數設定皆為 Canvas 的基本環境設定，
比較特別是 `globalCompositeOperation` ，圖形相疊模式有點像 photoshop 的混合模式。

```js
let isDrawing = false;
// 判斷是否為繪圖狀態的參數
let lastX = 0;
let lastY = 0;
// 設定要繪畫的位置參數。
let hue = 0;
// 色相值
let direction = true;
// 判斷繪圖粗細增減

function draw(e) {
  if (!isDrawing) return; // 如果繪畫參數為false，則不執行函數
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // 繪畫時的筆刷顏色為色相變數
  ctx.beginPath();
  // 啟動 canvas 繪畫路徑
  ctx.moveTo(lastX, lastY);
  // canvas路徑位置移動到 X、Y 變數。
  ctx.lineTo(e.offsetX, e.offsetY);
  // 連結點與點之間的座標
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  //利用解構賦值，使繪畫位置為目前滑鼠位置
  hue++;
  //色相漸增
  if (hue >= 360) {
    hue = 0;
  }
  //但因色相只有360度，只要大於等於360度，色相就再從零開始
  
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  //當筆劃寬度大於等於100或小於等於1，則轉換判斷變數

  if(direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
  // 轉換判斷變數

}
  
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

// 當滑鼠按下時，讓滑鼠當下的位置就是繪畫位置，並讓isDrawing為true為繪畫狀態。

canvas.addEventListener('mousemove', draw);
// 滑鼠移動時，仍然執行繪畫函數
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
// 放開滑鼠時和滑鼠移出時，使繪畫參數為false，不執行繪畫函數。
```

## 使用技巧
- Canvas