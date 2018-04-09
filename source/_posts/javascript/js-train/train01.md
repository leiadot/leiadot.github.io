---
title: 【 JS 訓練 】三角形與質數判斷
tags:
  - JavaScript
  - JS 狂人訓練系列
date: 2018-04-03 13:51:57
---

# 寫出一個函式，輸入三邊長參數，判斷該函式是否為三角形

```js
function isTriangle(a, b, c) {
    const a1 = Math.abs(a);
    const b1 = Math.abs(b);
    const c1 = Math.abs(c);

    if ((a1 + b1 > c1) && (a1 - b1 < c1) &&  (a1 + c1 > b1) && (a1 - c1 < b1) && (c1 + b1 > a1) && (c1 - b1 < a1)) {
        return true
    } else{
        return false
    }
}
```

# 寫出一個函式，輸入數字，判斷該數是否為質數

```js
function isPrime(num){
    if(num<0 || num ==0 || num==1){
    return false;
    }else{
    
    for (var i = 2; i < num; i++) {
        if (num%i==0){
            return false;
        }
    };
    }
    
    return true;
}
```