---
title: 【JS】Debounce and Throttle
tag:
  - JavaScript
categories: CodingLife
photos:
- '/img/cover/javascript.jpg'
date: 2018-09-06 09:29:00
modified: 2018-09-06 09:29:00
---


<!--more-->

```js
* @param delay {Number}  延遲時間，單位毫秒
*
* @return {Function}  return 一個去彈跳的函數
*/
function debounce(fn, delay) {

  var timer // 接收一個 setTimeout 的 return 值
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function (arguments) {

    var context = this // window
    var args = arguments // event
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer) // 清空 setTimeout
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args) //指向初始環境（如果為 window 呼叫，把 function 的指向再轉回 window）
    }, delay)
  }
}
```

```js
/**
*
* @param fn {Function}   實際執行的函式
* @param delay {Number}  執行間隔
*
* @return {Function}     return 的節流函數
*/

function throttle(fn, threshhold) {

  // 记录上次执行的时间
  var last

  // 定时器
  var timer

  // 默认间隔为 250ms
  threshhold || (threshhold = 250)

  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    var now = +new Date()

    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer)

      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)

    // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}
```