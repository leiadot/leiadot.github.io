---
title: 【讀書筆記】圖解 HTTP Chapter 04 返回結果的 HTTP 狀態碼
date: 2018-10-22 11:23:21
tags:
  - 圖解 HTTP
  - HTTP
categories: 前端讀書筆記
urlname: graphic-http-chapter04
description: 了解返回結果的 HTTP 狀態碼的各種數值及其意義。
photos:
  - '/img/cover/http.png'
---

<!--more-->

## 狀態碼告知伺服端返回的請求結果

狀態碼是當客戶端對伺服端發送請求後，伺服端敘述回傳請求結果的狀態，狀態碼為三位數字組成。

- 1XX 訊息狀態：正在處理請求
- 2XX 成功狀態：請求正常處理完成
- 3XX 重新導向狀態：需要進行其他行為來完成請求動作
- 4XX 客戶端錯誤狀態：伺服器無法處理請求
- 5XX 伺服端錯誤狀態：伺服器處理請求中錯誤

## 2XX 成功

### 200 OK

請求被正常處理。回傳的詳細訊息會根據方法不同而改變。

### 204 No Content

請求成功，但無資料回傳。在回應的訊息內沒有 Body 的部分。

### 206 Partial Content

表示客戶端做範圍請求，而伺服端成功回傳 GET 請求。回傳訊息包含 `Content-Range` 指定範圍 Body 部分。

## 3XX 重新導向

### 301 Moved Permanently

永久重新導向，表示請求的資料已經被分配到新的 URI ，應該重新儲存新的 URI。

### 302 Found

臨時重新導向，表示已經被分配到新的 URI，希望這次能使用新的 URI 訪問。如果不為 GET 或 HEAD 請求，瀏覽器禁止重新導向，必須和客戶端確認是否重發請求。

### 303 See Other

請求對應的資料存在另一個 URI，明確指明應該使用 GET 方法請求資料。

### 304 Not Modified

表示客戶端發送附有條件的請求，伺服端允許被訪問，但沒被滿足條件。

### 307 Temporary Redirect

臨時重新導向，表示已經被分配到新的 URI，和 302 的差異是當收到狀態碼後，客戶端應保持請求方法不變向新的地址發出請求。

## 4XX 客戶端錯誤

### 400 Bad Request

請求訊息有語法錯誤，需修正完後重新請求。

### 401 Unauthorized

發送的請求需要有 HTTP 認證，伺服器驗證已被拒絕。

> 當網站（通常是網站域名）禁止 IP 位址時，有些網站狀態碼顯示的 401，表示該特定位址被拒絕存取網站。
> —— wikipedia

### 403 Forbidden

伺服器拒絕請求訪問。

### 404 Not Found

無法找到請求資源。

## 5XX 伺服端錯誤

### 500 Internal Server Error

伺服器在執行請求發生錯誤。

### 503 Service Unavailable

伺服器超過負載或正在進行停機維護，無法處理請求。

> 資料來源：《圖解 HTTP》 上野宣 人民郵電出版社
> 筆記純屬推廣及分享，如有侵權，請告知。
> Please advise to remove immediately if any infringement caused.
