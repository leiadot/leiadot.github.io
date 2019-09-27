---
title: 【讀書筆記】圖解 HTTP Chapter 06 HTTP 首部（中）
date: 2018-10-28 12:12:21
tags:
  - 圖解 HTTP
  - HTTP
categories: 前端讀書筆記
urlname: graphic-http-chapter06-2
description: 了解 HTTP 的通用 Header。
photos:
  - '/img/cover/http.png'
---

<!--more-->

## HTTP / 1.1 通用首部字串

就是雙方都會用到的字串。

### Cache-Control

```
Cache-Control: private, max-age=0, no-cache
```

操作緩存的工作，多個指令可以透過逗點分隔。

客戶端：請求緩存
伺服端：控制緩存資料

#### 緩存請求指令表

- no-cache：（無參數）強制跟來源伺服器再認證
- no-store：（無參數）不緩存請求或回應任何內容
- max-age = [ 秒]：（必須）回應的最大 age 值
- max-stale(= [ 秒])：（可省略）接收已過期的回應
- min-fresh：（必須）希望在限定時間內的回應能有效
- no-transform：（無參數）代理不可更改的媒介類型
- only-if-cached：（無參數）從緩存取得資料
- cache-extension：新指令標記

#### 緩存回應指令表

- public：（無參數）可向任意一方提供任何緩存
- private：（可省略）謹向特別用戶回傳回應資料
- no-cache：（可省略）緩存前必須確認有效性
- no-store：（無參數）不緩存請求或回應內容
- no-transform：（無參數）代理不可以更改媒體類型
- must-revalidate：（無參數）可緩存，但必須向來源伺服器再次確認
- proxy-revalidate：（無參數）要求中間的緩存伺服器對緩存的回應有效性進行再次確認
- max-age = [ 秒]：（必須）回傳最大的 age 值
- s-maxage = [ 秒]：（必須）公共緩存伺服器最大的 age 值
- cache-extension：新指令標記

#### public 指令

表示其他用戶可以利用緩存。

```
Cache-Control: public
```

#### private 指令

與 public 相反，只回應資料給特定用戶，其他人則不會回傳資料。

```
Cache-Control: private
```

#### no-cache 指令

```
Cache-Control: no-cache
```

為了防止從緩存資料裡面回傳過期的資料。

如果客戶端有包含 no-cache 指令，則表示客戶端不會接受緩存過的回應，因此必須把客戶端的請求轉發到來源伺服器。

如果伺服端有包含 no-cache 指令，則緩存伺服器不能對資料進行緩存，瀏覽器以後也不能再對緩存伺服器請求中提出資料是否有效的確認，也禁止對回應資料做緩存。

```
Cache-Control: no-cache=Location
```

由伺服端回傳的回應中，訊息中的 header 的 Cache-Control 如果在 no-cache 字串指定參數，客戶端在接收這個被指定的參數值所對應的回應訊息後，就不能進行緩存，換句話說就是沒有參數值的 header 字串可以進行緩存。

#### 控制可以進行緩存的物件的指令

#### no-store 指令

```
Cache-Control: no-store
```

當使用這個指令，暗示這段通訊（請求或回應）包含機密訊息。
有些人以為`no-cache`是不緩存，但其實是不緩存過期資源，而`no-store`才是真的不緩存。

因此這個指令規定不能在本地儲存請求或回應中的任何一部份。

#### 指定緩存期限和認證指令

#### s-maxage 指令

```
Cache-Control: s-maxage=604800(秒)
```

這個指令和等等要介紹的`max-age`指令一樣，差別在於`s-maxage`只適合給多個使用者使用的公共緩存伺服器，換句話說對於單一使用者重複回應的伺服器來說這個指令是沒用的。

另外使用這個指令會忽略`Expires`指令和`max-age`指令。

#### max-age 指令

```
Cache-Control: max-age=604800(秒)
```

當客戶端發出的請求有這個指令，如果判定緩存資料的緩存時間比指定的時間數更小，那麼客戶端就會接收緩存的資源，如果指定數值是 0，那緩存伺服器就會把請求轉給來源伺服器。

當伺服器回傳的回應有這個指令，緩存就不會確認資料是否還具有有效性，而這個指令的數值是代表這個資料能夠緩存的最長時間。

HTTP / 1.1 版本的緩存服務遇到同時存在`Expires`指令的情快，會優先處理`max-age`指令，而忽略`Expires`指令，但 HTTP / 1.0 則完全相反。

#### min-fresh 指令

```
Cache-Control: min-fresh=60(秒)
```

這個指定是指說當發出請求後，指定的時間過後的資料都沒辦法再進行回應。
以上述來說`min-fresh=60`是指過超過了 60 秒的資料都沒辦法當作回應回傳。

#### max-stale 指令

```
Cache-Control: max-stale=360(秒)
```

使用這個指令就算資料已經過期了，還是可以進行緩存。

如果指令中沒有參數，則表示不管資料過期多久，客戶端都會收到回應；如果有具體數字，那個即使過期，只要在這個指定的時間內，仍然會被客戶端所接收。

#### only-if-cached 指令

```
Cache-Control: only-if-cached
```

使用這個指令意思是發生請求後，緩存伺服器會不斷載入來源伺服器的回應，也不會重複確認資料的有效性，如果發生請求緩存伺服器，而緩存伺服器的本地沒有來源伺服器給的資料，就會發出 504。

#### must-revalidate 指令

使用這個指令，代理會向來源伺服器再驗證要回傳的回應緩存資料是否有效，如果代理無法透過來源伺服器再次拿到有效的資料，那麼代理就會回傳 504 給客戶端。

另外使用這個指令也會忽略`max-stale`的請求。

#### proxy-revalidate 指令

這個指令意思是，如果客戶端傳出帶有這個指令的請求，那麼緩存伺服器在回傳回應資料前，要先再驗證資料的有效性。

#### no-transform 指令

使用這個指令無論在請求或是回應，緩存都不能改變實體的媒體類型，這樣可以防止緩存或代理壓縮圖片等等。

#### **Cache-Contorl 擴展**

#### cache-extension token

```
Cache-Control: private, community="UCI"
```

### Connection

Connection header 字串有兩個功能：

- 控制不再轉發給代理的 header：在客戶端發送請求和伺服器回傳回應，使用 Connection 可以控制不要再轉發給代理 header（hop-by-hop）。
- 管理持久連接：HTTP / 1.1 的默認連接都是持久，所以客戶端會在持久連結上持續發送請求，當伺服端要斷開連結時，就會指名 Connection 為 close。

```
Connection: Keep-Alive
```

Http / 1.1 之前的版本默認連結都不是持久連結，所以需要指定 Connection 是 Keep-Alive。

### Date

建立 HTTP 訊息的時間和日期，1.1 的版本使用 RFC1123 規定的日期時間格式：

```
Date: Tue, 03 Jul 2012 04:40:59 GMT
```

### Pragma

Pragma 是為了向後兼容而存在，它只支援 HTTP/1.0 的緩存伺服器，因為當時 HTTP / 1.1 的 Cache-Control 還沒有支援。
雖然是通用 header ，但只用在客戶端發送的請求，客戶端會要求所有中介的伺服器不回傳緩存資料。

如果都使用 HTTP / 1.1 版本，那直接使用`Cache-Control: no-cache` 是最好，但仍有些無法版本沒有支援，所以發送的請求最好如下：

```
Cache-Control: no-cache
Pragma: no-cache
```

### Trailer

Trailer 的作用是讓發送端在分塊發送的訊息後面增加其他訊息。

### Transfer-Encoding

Transfer-Encoding 的作用是規定傳送的 HTTP 訊息是採用哪個編碼方式。

### Upgrade

這個字串是用來檢測 HTTP 協議與其他協議是否可以用更新的版本來通訊，參數可以用來指定不同的通訊版本。

```
Connection: Upgrade
Upgrade: TLS/1.0
```

Connection 要設定為 Upgrade，才能使用 Upgrade 字串。

### Via

Via 是為了要追蹤客戶端與伺服端之間的請求（回應）的 HTTP 訊息傳輸路徑而存在，另外還能避免回環的狀況。

當訊息經過代理或閘道，會加上 Via header，再進行轉發，這個和 traceroute 與 Received header 的工作模式很像。

通常使用 Via 會和 Trace 方法一起使用，例如代理伺服器收到 Trace 方法（Max-Forwards: 0）傳來的請求，代理就不能再轉發這個請求，如此代理會把自己的訊息加上 Via header 再回傳請求要求的回應。

### Warning

這個字串會告知使用者一些與緩存相關的問題警告，HTTP 1.1 制定了七種警告，警告具有擴展性，未來還有可能再新增。

- 110 - Response is stale：代理回傳的資料已經過期。
- 111 - Revalidate failed：代理再驗證後，資料有效性失效。
- 112 - Disconnection operation：代理與網路被蓄意切斷。
- 113 - Heuristic expiration：回應使用期間已經超過 24 小時。
- 199 - Miscellaneous warning：任何警告內容。
- 214 - Transformation applied：代理對內容編碼或媒體類型進行處理。
- 299 - Miscellaneous persistent warning：任意警告內容。
  > 資料來源：《圖解 HTTP》 上野宣 人民郵電出版社
  > 筆記純屬推廣及分享，如有侵權，請告知。
  > Please advise to remove immediately if any infringement caused.
