---
title: 【JS30】Day23：Speech Synthesis
tags:
  - JS30系列
date: 2018-03-29 13:20:38
urlname: javascript-30-day23
categories: Front-end
description: JS 30 系列，讓文字轉語音，並可以變換音調及速率。
photo:
  - '/img/js30day/small22.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：使文字轉語音，並變換音調及速率</span>

```js
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
```

作業一開始已經先取用好 DOM。

## 一、取用語音要播放的文字

```js
msg.text = document.querySelector('[name="text"]').value;
// 使輸入欄位成為要使用的值
```

## 二、取用語系

```js
function populateVoices() {
  voices = this.getVoices();
  // 取得播放聲音的語系資訊
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name}(${voice.lang})</option>`)
    // 取用語系資料塞進下拉選單
    .join('');
  // 使用 join 取消逗號
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
```

## 三、更換選單，更換播放語系

```js
function setVoice(startOver = true) {
  msg.voice = voices.find(voice => voice.name === this.value);
  // 設定輸入欄位的語音是選擇發音的語系

  toggle();
  // 播放
}

function toggle(startOver = true) {
  // 播放暫停切換
  speechSynthesis.cancel();
  // 停用原本的語音
  if (startOver) {
    speechSynthesis.speak(msg);
  }
  // 重新播放新的語系。
}

voicesDropdown.addEventListener('change', setVoice);
// 監聽 change 事件
```

## 四、調整速度與音準，以及設定其餘監聽

```js
function setOption() {
  msg[this.name] = this.value;
  // 傳入的變數與SpeechSynthesisUtterance本身的物件相同，可以直接取用
  toggle();
}
options.forEach(option => option.addEventListener('change', setOption));
// 監聽音準和速率的change事件
speakButton.addEventListener('click', toggle);
// 監聽播放鍵
stopButton.addEventListener('click', () => toggle(false));
// 監聽暫停鍵
```

## 五、取用部分語系

```js
...
function populateVoices() {
    voices = this.getVoices();
    // 取得播放聲音的語系資訊
    voicesDropdown.innerHTML = voices
        .filter(voice=>voice.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name}(${voice.lang})</option>`)
        // 取用語系資料塞進下拉選單
        .join('');
    // 使用 join 取消逗號
}
...
```

## 使用技巧

- SpeechSynthesisUtterance
- speechSynthesis
