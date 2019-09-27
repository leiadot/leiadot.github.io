---
title: 【讀書筆記】圖解 HTTP Chapter 06 HTTP 首部（上）
date: 2018-10-28 12:12:21
tags:
  - 圖解 HTTP
  - HTTP
categories: 前端讀書筆記
urlname: graphic-http-chapter06-1
description: 了解 HTTP 的 Header 的總覽。
photos:
  - '/img/cover/http.png'
---

<!--more-->

## HTTP 訊息的 header

HTTP 協議的請求和回應一定含有 http header，客戶端和伺服端的 header 內容，針對處理請求和回應有所不同。請求 header 大部分都不需要親自查看。

### 請求 header

- 請求列
- 請求 header
- 通用 header
- 實體 header

### 回應 header

- 狀態列
- 回應 header
- 通用 header
- 實體 header

## HTTP 首部字段

### 結構

由字串和值來形成，例如：

```
Content-type: text/html
```

也有可能一個字串配多個值，例如：

```
Keep-Alive: timeout=15, max=100
```

### 字串類型

- 通用 header：請求訊息和回應訊息都會用的 header
- 請求 header：從客戶端對伺服端發出請求訊息所使用的，包含補充請求的附加內容、客戶端訊息等等
- 回應 header：從伺服器端回傳給客戶端所需要的，包含回應附加內容，也會要求客戶端附加額外的訊息內容
- 實體 header：針對請求和回應訊息的實體使用，包含要補充的資料內容、更新時間等等

### HTTP/1.1 header 字串一覽

HTTP/1.1 規範了 47 種字串。

#### 通用 header

- Cache-Control：控制緩存行為
- Connetion：逐跳 header、連接的管理
- Date：創建日期
- Pragma：訊息指令
- Trailer：訊息尾端的 header 一覽
- Transfer-Encoding：指定訊息主體的傳輸編碼方式
- Upgrade：升級為其他協議
- Via：代理伺服器相關訊息
- Warning：錯誤通知

#### 請求 header

- Accept：用戶代理可處理的媒體類型
- Accept-Charset：優先的字串集
- Accept-Encoding：優先的內容編碼
- Accept-Language：優先的自然語言
- Authorization：網頁認證訊息
- Expect：期待伺服器的特定行為
- Form：用戶的電子信箱地址
- Host：請求資料的伺服器位置
- If-Match：比較實體標記（ETag）
- If-Modified-Since：比較資料更新時間
- If-None-Match：比較實體標記（與 If-Match 相反）
- If-Range：資料未更新時發送的實體 Byte 的範圍請求
- If-Unmodified-Since：比較資料更新時間（與 If-Modified-Since 相反）
- Max-Forwards：最大傳輸逐格跳
- Proxy-Authorization：代理伺服器要求客戶端的認證訊息
- Range：實體的字串範圍請求
- Referer：對請求的 URI 的原始獲得方
- TE：傳輸編碼的優先級
- User-Agent：HTTP 客戶端程式訊息

#### 回應 header

- Accept-Range：是否接受字串範圍請求
- Age：推算資料建立時間
- Etag：資料匹配訊息
- Location：讓客戶端重新導向的 URI
- Proxy-Authenticate：代理伺服器對客戶端的認證訊息
- Retry-After：對再次發請求的時機要求
- Server：HTTP 伺服器的安裝訊息
- Vary：代理伺服器緩存的認證訊息
- WWW-Authenticate：伺服器對客戶端的認證訊息

#### 實體 header

- Allow：資料可支援的 HTTP 方式
- Content-Encoding：實體適用的編碼方式
- Content-Language：實體的自然語言
- Content-Length：實體的大小（字元）
- Content-Location：代替對應資料的 URI
- Content-MD5：實體的訊息摘要
- Content-Range：實體的位置範圍
- Content-Type：實體的媒體類型
- Expires：實體過期日期時間
- Last-Modified：資料最後修改日期時間

#### 非 HTTP/1.1 的首部字串

HTTP 所使用的字串，不限於 RFC2616 定義的 47 種，還有 Cookie、Set-Cookie 和 Content-Desposition 等等。

#### End-to-end header 和 Hop-by-hop header

HTTP header 定義成緩存代理和非緩存代理兩種類型：

- End-to-end header：分在此類的 header 會轉發給請求 / 回應對應的最後接收目標，且必須保存由緩存所產生的回應中，另外規定他必須要被轉發。
- Hop-by-hop header：分在此類的 header 只會對單次的轉發有效，會因為緩存或代理的關係而不再需要被轉發，HTTP/1.1 和之後的版本，如果要用此類型，需要提供 Connection header 字串。

以下除了這八個 header 字串之外，其他都算 End-to-end header 字串：

- Connection
- Keep-Alive
- Proxy-Authenticate
- Trailer
- TE
- Transfer-Encoding
- Upgrade

> 資料來源：《圖解 HTTP》 上野宣 人民郵電出版社
> 筆記純屬推廣及分享，如有侵權，請告知。
> Please advise to remove immediately if any infringement caused.
