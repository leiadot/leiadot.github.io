---
title: 【JS30】Day11：Custom Video Player
tags:
  - JS30系列
date: 2018-02-28 10:53:02
urlname: javascript-30-day11
description: JS 30 系列，此篇利用 HTML 5 控制影片行為。
categories: 前端工程
photo:
  - '/img/js30day/small10.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：使用 html5 video tag 控制影片</span>

### 一、先抓取 html5 video tag DOM 元素

```js
// 取得元素
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
```

### 二、建立 function

```js
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  // 三元運算子 true:play ; false:pause
  video[method]();
  //抓出video的 play / pause 屬性執行
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  // parseFloat 解析字串並返回數字
}

function handleRangeUpdate() {
  video[this.name] = this.value; // volume/playbackRate
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
```

### 三、監聽並執行

```js
video.addEventListener('click', togglePlay); //點擊影片控制開關
toggle.addEventListener('click', togglePlay); //播放鍵控制開關
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton); //控制播放鍵開關狀態
video.addEventListener('timeupdate', handleProgress); //播放直接更新進度條

skipButtons.forEach(button => button.addEventListener('click', skip)); // forEach是因為有前後跳轉
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); //控制調整音量跟播放速度

let mousedown = false;
//因為拖拉進度條，影片感覺像無法跟上，因此再監聽mouseup和mousedown，讓影片進度條更即時

progress.addEventListener('click', scrub); //點擊改變進度條
progress.addEventListener('mousemove', () => mousedown && scrub(e));
//拖拉改變進度條，如果mousedown是true，就往後執行scrub(e)，如果false就中斷。

progress.addEventListener('mousedown', () => (mousedown = true)); //拖拉改變進度條
progress.addEventListener('mouseup', () => (mousedown = false)); //拖拉改變進度條
```
