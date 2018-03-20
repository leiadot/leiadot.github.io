---
title: 【 筆記 】 如何寫出好註解
date: 2018-01-26 07:07:23
tag: 
- 註解
- 攻城屍筆記
---

註解的目的是協助使用者了解程式碼作者的思想

<!-- more -->

## 了解不該註解的部份

註解必須有價值

如何區分？


```js
var cafeBean
//宣告 咖啡豆變數

return cafeBean
//回傳 咖啡豆
```

```js
function cafeFuc (){

    var cafe = 3;
    for(var i=0;i<cafe.length;i++){
        var cafeNum += cafe[i]
    }

}
```

這些註解並沒有提供額外的資訊，讓使用者更易閱讀程式碼，宣告與註解完全相同，應該刪除註解或改善內容。


### 不要註解不好的名稱，應修正名稱。

```js
var arr    = [1, 2, 3, 4],  
    deleteArr = [];
    

for(var i = 0; i < arr.length; i++) {  
    if(arr[i] > 2) {
        deleteArr.push(arr[i]);
        // 刪除arr1,2的結果
    }
}

console.log(deleteArr);
```
deleteArr看起來像刪除arr裡的數值，但arr的內容並不會被更動，此時應該更正命名如下。

```js
var arr    = [1, 2, 3, 4],  
    rebuildArr = [];
    

for(var i = 0; i < arr.length; i++) {  
    if(arr[i] > 2) {
        rebuildArr.push(arr[i]);
        // 刪除arr1,2 重組後的結果
    }
}

console.log(rebuildArr);
```

利用註解補救程式碼不佳的可讀性

## 紀錄自己的想法

記下寫程式時的重要想法

```js
//後端回傳的json相當雜亂，但因重組資料耗費的時間成本太高，先將就使用。
```

讓讀者知道來龍去脈，省去時間做沒有效果的最佳化

```js
//公車離站及末班車駛離的即時資料數值回傳皆為11，alert一律顯示'無公車進站'
```

少這段註解，避免讀者浪費時間測試或直接下手修正程式碼。

### 註解程式碼缺陷

以下是許多程式設計師採用的標記

| 標記 | 意義 |
| ---- |---- |
| TODO: | 作者還沒處理的部份 |
| FIXME: | 已知的問題 |
| HACK: | 承認解決方法不夠優雅 |
| xxx: | 危險！重要問題 |

每個團隊對於標計有各自的規範及使用時機，
例如TODO被保留受到注意的問題，
那麼大多數的小問題可以使用todo:(小寫)。

### 常數的註解

常數只是單純的數值，但加上註解仍有幫助。

```js
var cafeBeanMaxmum = 200;
//加上合理的上限——咖啡豆進貨上限
```

```js
var zoom = 12;
//zoom12為檢視googleMap的最佳比例
```
```js
makeAcafe(inputValue);
//執行製作一杯咖啡的時間，特別注意太糟的輸入值
```

### 全局註解

詳述檔案

```js
// 這隻sass主要為儲存變數、RWD斷點規劃

..

```

```js
switch (status) {
    case "go":
        // 去程顯示畫面
        $(".choose").hide();
        $(".showMap-go").show();
        $(".showMap-back").hide();

        //顯示google Map
        var map;
        initMap();

        break;
        
    case "back":
        // 回程顯示畫面
        $(".showMap-go").hide();
        $(".showMap-back").show();
        $(".choose").hide();

        var map;
        initMap();
        break;
        
    case "choose":
    default:
        // 選擇路線顯示畫面
        $(".choose").show();
        $(".showMap-go").show();
        $(".showMap-back").hide();
        break;
    }
```


* 維持註解的簡潔
* 避免模擬兩可的代名詞（它、這個、那個）
* 修整草率的語句
