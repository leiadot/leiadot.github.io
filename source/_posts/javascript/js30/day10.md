---
title: 【JS30】Day10：Hold Shift and Check Checkboxes
tags:
- JavaScript
- JS30系列
date: 2018-02-24 13:05:49
categories: CodingLife 前端技術筆記
photo:
- '/img/js30day/small9.jpg'
---
![](/img/js30day/small.jpg)

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：單點滑鼠選取，加按 shift 區域選取。</span>

```js
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
        // 選擇多選框
        checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
        // 點擊多選框觸發函數
        let lastChecked;

        function handleCheck(e) {
            // 判斷是否同時按下shift和選擇多選框的參數
            let inBetween = false;

            if (e.shiftKey && this.checked) {
                // 遍歷所有 checkbox

                checkboxes.forEach(checkbox => {
                    console.log(checkbox);
                    if (checkbox === this || checkbox === lastChecked) {
                        inBetween = !inBetween;
                        console.log('Starting to check them inbetween!');
                    }
                    // 勾選區間內為true的checkbox
                    if (inBetween) {
                        checkbox.checked = true;
                    }
                });


            }

            lastChecked = this;
        }
```
