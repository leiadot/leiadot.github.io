---
title: 【JS30】Day06：Ajax Type Ahead
date: 2018-02-02
tags:
- JavaScript
- JS30系列
---

![](/img/js30day/small5.jpg)

> [javascript 30day](https://javascript30.com/)

<a id="more"></a>

### <span style="color:#ff5900">目標：完成搜尋功能，並在搜尋關鍵字加上顏色辨識。</span>

## 一、首先將目標 json 指定為變數，使用`fetch`方法取得資料，塞進空陣列。

```js
fetch('目標url',  HeadersObject)
.then(function(response) {
    //處理 response
}).catch(function(err) {
    // Error :(
})
```

## 二、建立一個`RegExp`，使用`match`方法進行比對。

```js
function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

// 利用正規表示法，在人口數量增加逗點

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    //輸入值
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        // 呼叫 RegExp 物件的建構函式
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}`);
        return `
<li>
<span class="name">${cityName}, ${stateName} 
<span class="population">${numberWithCommas(place.population)}
</li>
`;
    }).join('');
    suggestions.innerHTML = html;
}
```

## 三、監聽`change`及`keyup`事件，讓鍵盤在輸入時觸發比對。

```js
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

```

## 使用技巧

*   fetch / then / catch / blob
*   spread 展開運算子 （ es6 ）
*   regExp （ 正規表達式 ）
*   match
*   replace

</div>