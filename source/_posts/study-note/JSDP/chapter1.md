---
title: 【讀書筆記】JavaScript Design Pattern Chapter01 介紹
tag:
  - 讀書筆記
  - JSDP
categories: CodingLife
urlname: javascript-design-pattern-introduce
photos:
  - '/img/cover/books.jpg'
date: 2018-11-07 17:35:13
modified: 2018-11-07 17:35:13
---

<!--more-->

Javascript 是一個不尋常的語言，他沒有 class，而函式是他的第一級物件（firstclass）。

# 模式

定義：反覆出現的事件或物件，它可以用來產生事物，可能是模板或樣板。

本書討論以下幾種模式：

- 設計模式：設計模式的研究起初以強型別語言為主，但以 js 來說可能有更簡單的選擇。
- 編碼模式：JavaScript 特有的模式，為本書的精華重點。
- 反模式：反模式和程式錯誤不同，他只是常見的糟糕實踐方法，讓你乍似解決問題，但最後得不償失。

# JavaScript 的重要觀念

## 物件導向

任何在 JavaScript 中看到的都非常可能是物件，只有五種原始型別不是：數值、字串、布林、null 和 undefined，而前三者都有其對應原始型別包裹。

定義變數時，該變數自動變成內部物件的一個屬性，內部物件又稱為 Activation Object（保存函式作用域內的區域變數和物件，還有函式參數)。

物件：一堆具名屬性的集合，屬性可以是函式，稱為方法。物件創造後可以隨時修改。
有兩種最主要的物件：

- Native（原生物件）：ECMA 標準中描述，可以被歸類為內建物件或使用者定義物件（var o = {}）。
- Host（宿主物件）：定義在 host 環境中，例如：網頁瀏覽器（window、DOM）。如果不確定可在非瀏覽器環境下執行，如果執行成功，應該就只用到原生物件。

## 沒有 Class

JavaScript 沒有 Class ，JavaScript 只處理物件。四人幫書中提到：「多用物件複合，少用類別繼承。」

意思就是你可以用現有的材料創造新的物件，會比建立出冗長的父子類別繼承鍊或類別系統來得更好。

## 原型

原型（prototype）是一個物件，建立的每個函式都會指向一個新的空白物件。此物件和使用物件實字或 Object() 建構式創造出的新物件幾乎一樣，除了它的 constructor 屬性會指向剛建立的函式而不是內建的 Object() 。可以為空白物件新增成員，而之後繼承此物件的新物件可以把這些屬性當作自己的來使用。

原型是一種屬性，且每個函式都有`prototype`。

## 執行環境

JavaScript 的原生環境就是瀏覽器，接下來列出的模式大多直接與 JavaScript 核心相關，所以可以忽略環境的差別。
