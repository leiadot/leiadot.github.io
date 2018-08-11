---
title: 【JS30】Day29：Countdown Timer
tags:
  - JavaScript
  - JS30系列
date: 2018-04-17 10:44:11
categories: CodingLife
photo:
- '/img/js30day/small28.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：點擊及輸入數值倒數計時</span>

## 一、命名變數

```js
let countdown;
// 計數器
const timerDisplay = document.querySelector('.display__time-left');
// 頁面元素：顯示倒數
const endTime = document.querySelector('.display__end-time');
// 頁面元素：顯示計數後的時間
const buttons = document.querySelectorAll('[data-time]');
// 計數時間按鈕
```
## 二、設定計數器

```js
function timer(seconds) {

  clearInterval(countdown);
  // 重啟計數器，清除原本計數的設定
  const now = Date.now();
  const then = now + seconds * 1000;
  // 取得時間
  displayTimeLeft(seconds);
  displayEndTime(then);
  // 秀出開始倒數計時的時間與結束倒數後的時間

  countdown = setInterval(() => {
    // 每秒更新一次計數器
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // 要倒數的總時
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // 時間小於零，結束 setInterval
    displayTimeLeft(secondsLeft);
    // 更新秀出時間
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  // 轉換分鐘數
  const remainderSeconds = seconds % 60;
  // 用 % 取得扣除分鐘數的秒數
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  // 顯示秒數，若秒數小於10，在個位數前面補零
  document.title = display;
  timerDisplay.textContent = display;
  // 顯示對應時間
}

function displayEndTime(timestamp) {
  // 顯示結束時間
  const end = new Date(timestamp);
  // 取得結束的時間
  const hour = end.getHours();
  // 轉換成小時
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  // 將24小時制轉換成12小時制
  const minutes = end.getMinutes();
  // 取得分鐘
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
  // 顯示結束的時間

}
```
## 三、設定固定倒數時間的按鈕及設定輸入倒數時間

```js
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  // 取得 data-time 的數值
  timer(seconds);
  // 傳入計數器
}

buttons.forEach(button => button.addEventListener('click', startTimer));
// 遍歷按鈕並加上監聽事件

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // 取消 submit 跳頁的預設
  const mins = this.minutes.value;
  // 取得 input 的分鐘數值
  timer(mins * 60);
  // 轉換成秒數傳回計數器
  this.reset();
  // 傳回後清空 input
});

```