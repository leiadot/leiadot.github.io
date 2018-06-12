---
title: 【每日挑戰】::before 和 :after 中雙冒號和單冒號有什麽區別？
tag:
  - 好想挑戰賽
  - CSS
  - 前端考題
photos:
  - ''
date: 2018-06-12 20:58:24
modified: 2018-06-12 20:58:24
---


> Ａ：因為要判別偽類別（單冒號）與偽元素（雙冒號）之間的差異

---

> A pseudo-element is made of two colons (::) followed by the name of the pseudo-element.
> 
>This :: notation is introduced by the current document in order to establish a discrimination between pseudo-classes and pseudo-elements. For compatibility with existing style sheets, user agents must also accept the previous one-colon notation for pseudo-elements introduced in CSS levels 1 and 2 (namely, :first-line, :first-letter, :before and :after). This compatibility is not allowed for the new pseudo-elements introduced in this specification.

[source form W3C](https://www.w3.org/TR/selectors-3/#pseudo-elements)

## 偽類別與偽元素


| 程式碼 | 定義 |
| -------- | -------- | 
| `:hover`|當滑鼠滑過的元素，偽類別| 
|`:link`|已訪問過的元素，偽類別|
|`:active`|正在點擊的元素，偽類別|
|`:nth-child(3)`|第三個的元素，偽類別|
|`:first-child`|第一個元素，偽類別|
|`:last-child`|最後一個元素，偽類別|
|`:after`|元素後面插入內容，偽元素|
|`:before`|元素前面插入內容，偽元素|
|`first-line`|第一行，偽元素||

**偽類別 Pseudo class：選擇已經存在的元素。**
**偽元素 Pseudo element：選擇 DOM 中不存在的元素。**

```htmlembedded=
<div>
hi
I'm coding wife.
</div>
```

```css
div::first-line{
    color:pink;
}
```

如上面範例，`hi`就會變成粉紅色，因為`first-line`在 DOM 中並沒有存在任何標籤，所以他是屬於偽元素。


[偽元素與偽類別總覽](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Pseudo-classes_and_pseudo-elements)
