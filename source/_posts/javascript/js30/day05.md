---
title: 【JS30】Day05：Flex Panel Gallery
date: 2018-02-01
tags:
- JavaScript
- JS30系列
categories: CodingLife 前端技術筆記
photo:
- '/img/js30day/small4.jpg'
---

> [javascript 30day](https://javascript30.com/)

<!-- more -->

### <span style="color:#ff5900">目標：利用flex做面板特效</span>

## 一、將主畫面排版

首先將主畫面排版完成，在各畫面（ panel ）的父層（ panels ）下`display:flex`，
並在各畫面下`flex:1`，意思為平均分配多餘的空間。

## 二、處理字體效果

再來處理畫面中字體的特效，將畫面中的子元素下垂直水平置中，且為垂直排序。

## 使用技巧

*   transitionend Event
*   flexbox
