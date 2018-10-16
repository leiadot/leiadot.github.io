---
title: 【Interview】HTML 基礎匯集知識題
tag:
  - null
  - null
categories: Interview
photos:
  - /img/
date: 2018-08-23 14:38:55
modified: 2018-08-23 14:38:55
---

演算法 https://github.com/hustcc/JS-Sorting-Algorithm
vue https://www.jianshu.com/p/e54a9a34a773
react https://zhuanlan.zhihu.com/p/24856035
<!--more-->
[front-end-interview-handbook (HTML) ](https://github.com/yangshun/front-end-interview-handbook)
[BAT及各大互联网公司2014前端笔试面试题--Html,Css篇](http://www.cnblogs.com/coco1s/p/4034937.html)
[前端面试经典题目汇总](https://segmentfault.com/a/1190000007488471)

- `DOCTYPE` 有什麼用？
- 如何提供包含多種語言內容的頁面？
- 在設計開發多語言網站時，需要留心哪些事情？
- 什麼是`data -`屬性？
- 將HTML5看作成開放的網絡平台，什麼是HTML5的基本構造（building block）？
- 請描述`cookie`，`sessionStorage`和`localStorage`的區別。
- 請描述`<script>`，`<script async>`和`<script defer>`的區別
- 為什麼最好把CSS的`<link>`標籤放在`<head> </head>`之間？為什麼最好把JS的`<script>`標籤恰好放在`</body>`之前，有例外情況嗎？
- 什麼是漸進式渲染（progressive rendering）？
- 為什麼在`<img>`標籤中使用`srcset`屬性？請描述瀏覽器遇到該屬性後的處理過程。
- 你有過使用不同模版語言的經歷嗎？
- 你做的頁面在哪些流覽器測試過？這些瀏覽器的內核分別是什麼？
- `Quirks` 模式是什麼？它和 `Standards` 模式有什麼區別
- div + css的佈局較 table 佈局有什麼優點？
- img的alt與title有何異同？b：strong 與 em 的異同？
- 你能描述一下漸進增強和優雅降級之間的不同嗎？
- 為什麼利用多個域名來存儲網站資源會更有效？
- 簡述一下 `src` 與 `href` 的區別。
- 知道的網頁製作會用到的圖片格式有哪些？
- 知道什麼是微格式嗎？談談理解。在前端構建中應該考慮微格式嗎？
- 在css/js代碼上線之後開發人員經常會優化性能，從用戶刷新網頁開始，一次js請求一般情況下有哪些地方會有緩存處理？
- 一個頁面上有大量的圖片（大型電商網站），加載很慢，你有哪些方法優化這些圖片的加載，給用戶更好的體驗。
- 你如何理解HTML結構的語義化？　　
- 談談以前端角度出發做好SEO需要考慮什麼？
- XHTML和HTML有什麼區別
- 如何實現瀏覽器內多個標籤頁之間的通信?

# `DOCTYPE` 有什麼用？
  document type 的縮寫，在文件最前面宣告，區分標準模式和怪異模式（quirks mode），告知瀏覽器頁面渲染的標準。

  * Quirks mode ：一些網頁瀏覽器為了維持對舊的網頁設計的向下相容而使用的一種技術。

# 如何提供包含多種語言內容的頁面？
  在 client 端對 server 端發送 http 請求時，通常會發送有關語言選項的訊息，例如 `Accept-Language` header ，如果替換語言存在，server 可以利用訊息回傳相符合的 html 文件，回傳的 html 文件還需要在 `html` 標籤宣告 `lang` 屬性，例如：`<html lang="en">...</html>`。

  在後端，html 包含 `i18n` 佔位符和需要替換的內容，這些按照不同語言，以`yml`或`json`檔儲存，server 會動態產生指定語言的 `html` 頁面，過程需要借助後端框架。

# 在設計開發多語言網站時，需要留心哪些事情？
  1. 在 HTML 中使用 lang 屬性。
  2. 顏色的使用
  3. 日期和貨幣格式
  4. 文字長度可能會造成破版，因此會需要限制詞語或句子的長度。

# 什麼是`data -`屬性？

# 將HTML5看作成開放的網站，什麼是HTML5的基本構造（building block）？
  1. 語意化的標籤，能更精確的描述內容
  2. 提供新的方式與 server 連結。
  3. 離線緩存，讓網頁在本地端儲存資料並能有效的離線運作
  4. 多媒體的使用
  5. 2D/3D 的圖形與特效

# 請描述`cookie`，`sessionStorage`和`localStorage`的區別。
  
# 請描述`<script>`，`<script async>`和`<script defer>`的區別
# 為什麼最好把CSS的`<link>`標籤放在`<head> </head>`之間？為什麼最好把JS的`<script>`標籤恰好放在`</body>`之前，有例外情況嗎？
# 什麼是漸進式渲染（progressive rendering）？
# 為什麼在`<img>`標籤中使用`srcset`屬性？請描述瀏覽器遇到該屬性後的處理過程。
# 你有過使用不同模版語言的經歷嗎？
# 你做的頁面在哪些流覽器測試過？這些瀏覽器的內核分別是什麼？
# `Quirks` 模式是什麼？它和 `Standards` 模式有什麼區別
# div + css的佈局較 table 佈局有什麼優點？
# img的alt與title有何異同？b：strong 與 em 的異同？
# 你能描述一下漸進增強和優雅降級之間的不同嗎？
# 為什麼利用多個域名來存儲網站資源會更有效？
# 簡述一下 `src` 與 `href` 的區別。
# 知道的網頁製作會用到的圖片格式有哪些？
# 知道什麼是微格式嗎？談談理解。在前端構建中應該考慮微格式嗎？
# 在css/js代碼上線之後開發人員經常會優化性能，從用戶刷新網頁開始，一次js請求一般情況下有哪些地方會有緩存處理？
# 一個頁面上有大量的圖片（大型電商網站），加載很慢，你有哪些方法優化這些圖片的加載，給用戶更好的體驗。
# 你如何理解HTML結構的語義化？　　
# 談談以前端角度出發做好SEO需要考慮什麼？
# XHTML和HTML有什麼區別
# 如何實現瀏覽器內多個標籤頁之間的通信?